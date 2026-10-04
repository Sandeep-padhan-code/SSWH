import React from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ShieldCheck, CheckCircle2, Flame } from 'lucide-react'

export const DrinkingWaterPage: React.FC = () => {
  const dispenseLogs = [
    { time: '14:32:10', station: 'Station Alpha-Ground', volume: '1.2 L', temp: '98.6 °C', status: 'Interlock Cleared' },
    { time: '13:15:44', station: 'Station Beta-Floor 1', volume: '0.8 L', temp: '98.5 °C', status: 'Interlock Cleared' },
    { time: '11:40:02', station: 'Station Alpha-Ground', volume: '2.0 L', temp: '98.8 °C', status: 'Interlock Cleared' },
    { time: '10:05:19', station: 'Station Beta-Floor 1', volume: '0.5 L', temp: '98.4 °C', status: 'Interlock Cleared' },
    { time: '08:22:31', station: 'Station Alpha-Ground', volume: '1.5 L', temp: '98.7 °C', status: 'Interlock Cleared' },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Drinking Water & Thermal Pasteurization Module"
        description="Dedicated potable drinking water buffer, continuous 1-minute boiling sterilization interlock, and replenishment telemetry."
        badgeText="POTABLE COMPLIANCE"
      />

      {/* Safety Interlock Header Banner */}
      <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Biological Pasteurization Interlock: ENGAGED & CLEARED</strong>. Thermal chamber sustained &gt; 95.0°C for 60 consecutive seconds. Dispense valve is energized and open.
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
          WHO Standard Compliant
        </span>
      </div>

      {/* Operational Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[11px] font-mono uppercase font-bold text-slate-500">Available Potable Reserve</div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">4.2</span>
            <span className="text-xs font-mono text-slate-500">/ 5.0 L (84%)</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-700 mt-1">
            Normal Storage Headspace • Above Critical Reserve
          </div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[11px] font-mono uppercase font-bold text-slate-500 flex items-center justify-between">
            <span>Thermal Core Temperature</span>
            <Flame className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">98.5</span>
            <span className="text-xs font-mono text-slate-500">°C</span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 mt-1">
            Probe: DS18B20 RTD (Setpoint: 98.0°C)
          </div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[11px] font-mono uppercase font-bold text-slate-500">Autonomous Refill Pump</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1">Standby (T2 Ready)</div>
          <div className="text-[11px] font-mono text-slate-600 mt-1">
            Auto-refill triggers when reserve &lt; 1.5 L (30%)
          </div>
        </Card>
      </div>

      {/* Technical Interlock Logic & Dispense History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Interlock Parameters */}
        <Card className="bg-white border border-slate-200 rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Thermal Interlock & Actuation Parameters</CardTitle>
            <span className="text-[10px] font-mono text-slate-500">Hardware Safety Schema</span>
          </CardHeader>
          <CardContent className="space-y-3 pt-3 text-xs font-mono">
            <div className="space-y-2 border border-slate-200 rounded p-3 bg-slate-50">
              <div className="flex justify-between">
                <span className="text-slate-500">Dispense Solenoid Relay:</span>
                <span className="font-bold text-emerald-700">ENERGIZED / OPEN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Boiling Element (12V 300W):</span>
                <span className="font-bold text-slate-900">HOLDING (98.5°C)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mandated Duration Hold:</span>
                <span className="text-slate-900">60 Seconds @ &gt; 95.0°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Refill Staging Threshold:</span>
                <span className="text-slate-900">&lt; 1.5 L (Low warning)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Emergency Low Cutoff:</span>
                <span className="text-rose-700 font-semibold">&lt; 0.5 L (Heater trips OFF)</span>
              </div>
            </div>

            <div className="p-2.5 rounded border border-slate-200 bg-white font-sans text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-900">Biological Safety Assurance:</div>
              <p className="text-[11px] leading-normal">
                If temperature probe DS18B20 registers any reading below 95°C during the sterilization hold cycle, the dispense valve immediately trips shut and the 60-second timer resets.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dispense Event Audit Log */}
        <Card className="bg-white border border-slate-200 rounded overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Potable Dispenser Activity Log</CardTitle>
            <span className="text-[10px] font-mono text-slate-500">Today's Consumption Events</span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Dispenser Station</th>
                  <th className="p-3 text-right">Volume</th>
                  <th className="p-3 text-right">Core Temp</th>
                  <th className="p-3">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dispenseLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{log.time}</td>
                    <td className="p-3 font-sans text-slate-800">{log.station}</td>
                    <td className="p-3 text-right font-bold text-slate-900 tabular-nums">{log.volume}</td>
                    <td className="p-3 text-right text-slate-800 tabular-nums">{log.temp}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Cleared
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
