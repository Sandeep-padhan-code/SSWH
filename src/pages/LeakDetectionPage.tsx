import React, { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Wrench } from 'lucide-react'

export const LeakDetectionPage: React.FC = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 'LEAK-2026-004',
      title: 'Secondary Supply Line Riser B-2 Flow Variance',
      type: 'Minimum Night Flow (MNF) Anomaly',
      location: 'Building Alpha-1, Floor 2 Riser B-2',
      severity: 'WARNING' as const,
      status: 'Active Investigation',
      abnormalFlow: '+4.2 L/min delta during zero-demand window (02:00–04:00)',
      detectedAt: 'Today, 10:24 AM',
      confidence: '84% (LSTM Residual Forecaster)',
      workOrder: 'WO-8841 Dispatched',
    },
    {
      id: 'LEAK-2026-003',
      title: 'T3 Wastewater Inflow Pressure Gradient Drop',
      type: 'Hydrodynamic Pressure Loss',
      location: 'Drain Header Joint 4',
      severity: 'NORMAL' as const,
      status: 'Resolved (Gasket Replaced)',
      abnormalFlow: '0.0 L/min (Nominal 2.4 bar restored)',
      detectedAt: 'Yesterday, 14:15 PM',
      confidence: '92% Confidence',
      workOrder: 'WO-8832 Completed',
    },
    {
      id: 'LEAK-2026-002',
      title: 'SCADA Chassis Skid Floor Moisture Contact',
      type: 'Resistive Leak Sensor Pad',
      location: 'Basement Central Skid Chassis Sump',
      severity: 'NORMAL' as const,
      status: 'Resolved (Condensation cleared)',
      abnormalFlow: 'Surface Dry (100% Resistance)',
      detectedAt: 'Sep 28, 09:30 AM',
      confidence: 'Hardware Direct Contact',
      workOrder: 'Inspected by Tech',
    },
  ])

  const handleAcknowledge = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, status: 'Acknowledged / Field Inspection Assigned' } : inc
      )
    )
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Hydrodynamic Leak Detection & Anomaly Diagnostics"
        description="Minimum Night Flow (MNF) variance tracking, hydrodynamic pressure gradient loss detection, and physical moisture sensor probes."
        badgeText="ANOMALY ENGINE ACTIVE"
      />

      {/* Diagnostics Methodology Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <Card className="bg-white border border-slate-200 rounded p-3">
          <div className="text-[10px] text-slate-500 uppercase font-bold">1. Minimum Night Flow (MNF)</div>
          <div className="text-base font-bold text-slate-900 mt-1">02:00 – 04:00 Window</div>
          <div className="text-[11px] text-amber-700 mt-0.5">1 Active Variance Delta (+4.2 L/m)</div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded p-3">
          <div className="text-[10px] text-slate-500 uppercase font-bold">2. Differential Pressure Head</div>
          <div className="text-base font-bold text-slate-900 mt-1">2.4 bar Nominal</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Pressure wave gradients stable</div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded p-3">
          <div className="text-[10px] text-slate-500 uppercase font-bold">3. Physical Moisture Pads</div>
          <div className="text-base font-bold text-slate-900 mt-1">4 Sump Pads Dry</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Resistive sensor contact normal</div>
        </Card>
      </div>

      {/* Incidents Queue Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Hydrodynamic Anomaly & Leak Incident Triage</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Continuous Statistical Verification</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Incident ID</th>
                <th className="p-3">Title & Classification</th>
                <th className="p-3">Location</th>
                <th className="p-3">Telemetry Deviation</th>
                <th className="p-3">Detected</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{incident.id}</td>
                  <td className="p-3">
                    <div className="font-sans font-bold text-slate-900">{incident.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{incident.type}</div>
                  </td>
                  <td className="p-3 font-sans text-slate-700">{incident.location}</td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 tabular-nums">{incident.abnormalFlow}</span>
                    <span className="text-[10px] text-slate-400 block font-normal">{incident.confidence}</span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">{incident.detectedAt}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={incident.severity} size="sm" />
                      <span className="text-[10px] text-slate-600 font-sans block">{incident.status}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    {incident.severity === 'WARNING' && !incident.status.includes('Acknowledged') ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAcknowledge(incident.id)}
                        className="text-xs"
                      >
                        <Wrench className="h-3 w-3 mr-1" /> Triage
                      </Button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {incident.workOrder}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
