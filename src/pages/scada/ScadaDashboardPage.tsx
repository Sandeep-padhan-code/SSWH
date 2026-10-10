import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Droplets,
  Gauge,
  Power,
  Shield,
  RefreshCw,
} from 'lucide-react'
import { WaterFlowDiagram } from '@/components/visualizers/WaterFlowDiagram'
import { DataFreshnessTag } from '@/components/common/DataFreshnessTag'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { AuditLogViewer } from '@/components/common/AuditLogViewer'
import { EquipmentControlCard } from '@/components/cards/EquipmentControlCard'
import { telemetryService, TelemetryState } from '@/services/telemetryService'
import { auditService } from '@/services/auditService'
import { useAuth } from '@/auth/AuthContext'
import { mockAlerts } from '@/data/mock/alerts'

export const ScadaDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [telemetry, setTelemetry] = useState<TelemetryState>(telemetryService.getSnapshot())
  const [auditLogs, setAuditLogs] = useState(auditService.getAuditLogs())
  const [activeModal, setActiveModal] = useState<{
    type: 'PUMP' | 'VALVE'
    id: 'pump1' | 'pump2' | 'valve1' | 'valve2'
    targetName: string
    nextAction: string
    isDangerous: boolean
  } | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const unsubscribe = telemetryService.subscribe((latest) => {
      setTelemetry(latest)
    })
    return () => unsubscribe()
  }, [])

  const handleOpenConfirm = (
    type: 'PUMP' | 'VALVE',
    id: 'pump1' | 'pump2' | 'valve1' | 'valve2',
    targetName: string,
    currentStatus: string
  ) => {
    let nextAction = ''
    if (type === 'PUMP') {
      nextAction = currentStatus === 'RUNNING' ? 'STOP_PUMP' : 'START_PUMP'
    } else {
      nextAction = currentStatus === 'OPEN' ? 'CLOSE_VALVE' : 'OPEN_VALVE'
    }

    setActiveModal({
      type,
      id,
      targetName,
      nextAction,
      isDangerous: nextAction.startsWith('STOP') || nextAction.startsWith('CLOSE'),
    })
  }

  const handleExecuteAction = async () => {
    if (!activeModal || !user) return
    setIsExecuting(true)
    setFeedbackMsg(null)

    const requiredPermission = activeModal.type === 'PUMP' ? 'CONTROL_PUMP' : 'CONTROL_VALVE'

    const res = await auditService.executeControlAction({
      userName: user.name,
      role: user.role,
      requiredPermission,
      action: activeModal.nextAction,
      device: activeModal.targetName,
      details: `Operator initiated remote command ${activeModal.nextAction} via SCADA Dashboard`,
      actionFn: () => {
        if (activeModal.type === 'PUMP') {
          const targetPump = activeModal.id as 'pump1' | 'pump2'
          const currentStatus = telemetry.pumps[targetPump].status
          const nextStatus = currentStatus === 'RUNNING' ? 'STOPPED' : 'RUNNING'
          telemetryService.togglePump(targetPump, nextStatus)
        } else {
          const targetValve = activeModal.id as 'valve1' | 'valve2'
          const currentState = telemetry.valves[targetValve].state
          const nextState = currentState === 'OPEN' ? 'CLOSED' : 'OPEN'
          telemetryService.toggleValve(targetValve, nextState)
        }
      },
    })

    setIsExecuting(false)
    setActiveModal(null)
    setAuditLogs(auditService.getAuditLogs())

    if (res.success) {
      setFeedbackMsg({
        type: 'success',
        text: `Command executed successfully! Audit log recorded.`,
      })
    } else {
      setFeedbackMsg({
        type: 'error',
        text: res.error || 'Control action denied by security authorization guard.',
      })
    }

    setTimeout(() => setFeedbackMsg(null), 5000)
  }

  const activeAlarmsCount = mockAlerts.filter((a) => !a.isResolved).length

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <section className="flex flex-col gap-3 border-b border-[#DDE6E2] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#5494DA]/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[#5494DA] border border-[#5494DA]/20">
              SCADA Operator Control
            </span>
            <span className="text-xs text-[#587068]">Real-Time Telemetry Command</span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#10231F]">
            SCADA Operations Command Center
          </h1>
          <p className="mt-1 text-sm text-[#63736E]">
            Direct monitoring & remote equipment control for facility pumps, valves, and water storage.
          </p>
        </div>

        <DataFreshnessTag lastUpdated={telemetry.lastUpdated} status="ONLINE" />
      </section>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-[#5494DA]/10 border-[#5494DA]/20 text-[#5494DA]'
              : 'bg-[#FFF8F8] border-[#F0D3D3] text-[#C83D3D]'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="font-bold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Key Real-Time Metrics Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#5494DA]/10 p-2 text-[#5494DA]">
              <Droplets className="h-5 w-5" />
            </div>
            <DataFreshnessTag lastUpdated={telemetry.lastUpdated} showStatusDot={false} />
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Live Flow Rate
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">
            {telemetry.flowRate} <span className="text-xs font-sans text-[#63736E]">L/min</span>
          </p>
          <p className="mt-2 text-xs text-[#18A878]">● Main Inflow Line Active</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#73B9EE]/10 p-2 text-[#5494DA]">
              <Gauge className="h-5 w-5" />
            </div>
            <DataFreshnessTag lastUpdated={telemetry.lastUpdated} showStatusDot={false} />
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            System Line Pressure
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">
            {telemetry.pressure} <span className="text-xs font-sans text-[#63736E]">Bar</span>
          </p>
          <p className="mt-2 text-xs text-[#5494DA]">Nominal range: 3.5 - 4.8 Bar</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#18A878]/10 p-2 text-[#18A878]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono text-[#18A878] font-bold">100% HEALTH</span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            SCADA Gateway
          </p>
          <p className="mt-1 text-2xl font-bold text-[#10231F]">Operational</p>
          <p className="mt-2 text-xs text-[#63736E]">All 14 Node Sensors Online</p>
        </div>

        <Link
          to="/alerts"
          className="rounded-xl border border-[#F0D3D3] bg-white p-5 shadow-xs hover:border-[#C83D3D] transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#FFF2F2] p-2 text-[#C83D3D]">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#63736E]" />
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Active SCADA Alarms
          </p>
          <p className="mt-1 text-2xl font-bold text-[#10231F]">
            {activeAlarmsCount} <span className="text-xs font-normal text-[#C83D3D]">Unresolved</span>
          </p>
          <p className="mt-2 text-xs text-[#C83D3D]">1 Critical Leak • 1 Level Warning</p>
        </Link>
      </section>

      {/* Interactive Telemetry Visualizer */}
      <section className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5494DA]">
              Live Process Mimic
            </p>
            <h3 className="text-lg font-semibold text-[#10231F]">Water Treatment & Distribution Diagram</h3>
          </div>
          <DataFreshnessTag lastUpdated={telemetry.lastUpdated} />
        </div>
        <WaterFlowDiagram />
      </section>

      {/* Remote Equipment Controls Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5494DA]">
              Operational Remote Actions
            </p>
            <h2 className="text-xl font-semibold text-[#10231F]">Pumps & Valves SCADA Control</h2>
          </div>
          <span className="text-xs font-mono text-[#587068] bg-[#5494DA]/10 px-2.5 py-1 rounded border border-[#5494DA]/20">
            Permission: CONTROL_PUMP & CONTROL_VALVE
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <EquipmentControlCard
            id="pump1"
            name={telemetry.pumps.pump1.name}
            type="PUMP"
            status={telemetry.pumps.pump1.status}
            flowRate={telemetry.pumps.pump1.flowLpm}
            powerKw={telemetry.pumps.pump1.powerKw}
            requiredPermission="CONTROL_PUMP"
            onToggle={() =>
              handleOpenConfirm('PUMP', 'pump1', telemetry.pumps.pump1.name, telemetry.pumps.pump1.status)
            }
          />
          <EquipmentControlCard
            id="pump2"
            name={telemetry.pumps.pump2.name}
            type="PUMP"
            status={telemetry.pumps.pump2.status}
            flowRate={telemetry.pumps.pump2.flowLpm}
            powerKw={telemetry.pumps.pump2.powerKw}
            requiredPermission="CONTROL_PUMP"
            onToggle={() =>
              handleOpenConfirm('PUMP', 'pump2', telemetry.pumps.pump2.name, telemetry.pumps.pump2.status)
            }
          />
          <EquipmentControlCard
            id="valve1"
            name={telemetry.valves.valve1.name}
            type="VALVE"
            status={telemetry.valves.valve1.state}
            positionPercent={telemetry.valves.valve1.positionPercent}
            requiredPermission="CONTROL_VALVE"
            onToggle={() =>
              handleOpenConfirm('VALVE', 'valve1', telemetry.valves.valve1.name, telemetry.valves.valve1.state)
            }
          />
          <EquipmentControlCard
            id="valve2"
            name={telemetry.valves.valve2.name}
            type="VALVE"
            status={telemetry.valves.valve2.state}
            positionPercent={telemetry.valves.valve2.positionPercent}
            requiredPermission="CONTROL_VALVE"
            onToggle={() =>
              handleOpenConfirm('VALVE', 'valve2', telemetry.valves.valve2.name, telemetry.valves.valve2.state)
            }
          />
        </div>
      </section>

      {/* Operational Audit Log Feed */}
      <AuditLogViewer logs={auditLogs} maxEntries={5} />

      {/* Confirmation Modal */}
      {activeModal && (
        <ConfirmModal
          isOpen={true}
          title={`Confirm ${activeModal.nextAction}`}
          message={`Are you sure you want to execute ${activeModal.nextAction} on ${activeModal.targetName}?`}
          actionLabel={activeModal.nextAction}
          deviceLabel={activeModal.targetName}
          isDangerous={activeModal.isDangerous}
          isLoading={isExecuting}
          onConfirm={handleExecuteAction}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </div>
  )
}
