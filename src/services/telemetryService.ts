export interface TelemetryState {
  flowRate: number // L/min
  pressure: number // Bar
  pumps: {
    pump1: { id: string; name: string; status: 'RUNNING' | 'STOPPED'; flowLpm: number; powerKw: number }
    pump2: { id: string; name: string; status: 'RUNNING' | 'STOPPED'; flowLpm: number; powerKw: number }
  }
  valves: {
    valve1: { id: string; name: string; state: 'OPEN' | 'CLOSED'; positionPercent: number }
    valve2: { id: string; name: string; state: 'OPEN' | 'CLOSED'; positionPercent: number }
  }
  tankLevels: {
    rawWater: number // %
    cleanWater: number // %
    drinkingWater: number // %
    reuseWater: number // %
  }
  lastUpdated: Date
}

let currentState: TelemetryState = {
  flowRate: 124.5,
  pressure: 4.2,
  pumps: {
    pump1: { id: 'PUMP-01', name: 'Raw Water Intake Pump', status: 'RUNNING', flowLpm: 84.5, powerKw: 5.2 },
    pump2: { id: 'PUMP-02', name: 'Secondary Boost Pump', status: 'STOPPED', flowLpm: 0, powerKw: 0 },
  },
  valves: {
    valve1: { id: 'VALVE-01', name: 'Main Intake Inlet Valve', state: 'OPEN', positionPercent: 100 },
    valve2: { id: 'VALVE-02', name: 'Emergency Isolation Bypass', state: 'CLOSED', positionPercent: 0 },
  },
  tankLevels: {
    rawWater: 80,
    cleanWater: 62,
    drinkingWater: 84,
    reuseWater: 58,
  },
  lastUpdated: new Date(),
}

type TelemetryListener = (state: TelemetryState) => void
const listeners = new Set<TelemetryListener>()

// Simulates live telemetry fluctuations
setInterval(() => {
  if (currentState.pumps.pump1.status === 'RUNNING') {
    const jitter = (Math.random() - 0.5) * 2
    currentState.flowRate = Math.max(100, Math.min(150, parseFloat((currentState.flowRate + jitter).toFixed(1))))
    currentState.pressure = Math.max(3.8, Math.min(4.6, parseFloat((currentState.pressure + jitter * 0.05).toFixed(2))))
  } else {
    currentState.flowRate = Math.max(0, parseFloat((currentState.flowRate * 0.9).toFixed(1)))
    currentState.pressure = Math.max(1.0, parseFloat((currentState.pressure * 0.95).toFixed(2)))
  }
  currentState.lastUpdated = new Date()
  listeners.forEach((fn) => fn({ ...currentState }))
}, 3000)

export const telemetryService = {
  getSnapshot(): TelemetryState {
    return { ...currentState }
  },

  subscribe(listener: TelemetryListener) {
    listeners.add(listener)
    listener({ ...currentState })
    return () => {
      listeners.delete(listener)
    }
  },

  togglePump(pumpId: 'pump1' | 'pump2', nextStatus: 'RUNNING' | 'STOPPED') {
    currentState.pumps[pumpId].status = nextStatus
    currentState.pumps[pumpId].flowLpm = nextStatus === 'RUNNING' ? 84.5 : 0
    currentState.pumps[pumpId].powerKw = nextStatus === 'RUNNING' ? 5.2 : 0
    currentState.lastUpdated = new Date()
    listeners.forEach((fn) => fn({ ...currentState }))
    return { ...currentState }
  },

  toggleValve(valveId: 'valve1' | 'valve2', nextState: 'OPEN' | 'CLOSED') {
    currentState.valves[valveId].state = nextState
    currentState.valves[valveId].positionPercent = nextState === 'OPEN' ? 100 : 0
    currentState.lastUpdated = new Date()
    listeners.forEach((fn) => fn({ ...currentState }))
    return { ...currentState }
  },
}
