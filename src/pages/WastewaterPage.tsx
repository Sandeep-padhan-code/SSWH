import React, { useState, useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChartCard } from '@/components/ui/ChartCard'
import { waterService } from '@/services/waterService'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { CheckCircle2 } from 'lucide-react'

export const WastewaterPage: React.FC = () => {
  const [reuseData, setReuseData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadReuse() {
      setIsLoading(true)
      const data = await waterService.getReuseComparison()
      setReuseData(data)
      setIsLoading(false)
    }
    loadReuse()
  }, [])

  const processStages = [
    { code: 'STG-01', unit: 'T3 Greywater Sump', process: 'Gravity collection from sinks, showers, laundry headers', flow: '2.1 L / 5.0 L (42%)', status: 'Buffering' },
    { code: 'STG-02', unit: 'Pump 3 (Transfer)', process: '12V DC diaphragm transfer to secondary manifold', flow: '14.5 L/min @ 1.8 bar', status: 'Operational' },
    { code: 'STG-03', unit: 'Filter 1 (Sediment)', process: 'Graded sand & 20-micron mechanical particulate removal', flow: 'ΔP: 0.12 bar (Clean)', status: 'Active' },
    { code: 'STG-04', unit: 'Filter 2 (Carbon)', process: 'Activated carbon bio-adsorption of surfactants & odor', flow: 'Turbidity: 2.8 NTU', status: 'Active' },
    { code: 'STG-05', unit: 'T4 Treated Storage', process: 'Non-potable secondary storage with air-gap backflow isolation', flow: '3.75 L / 5.0 L (75%)', status: 'Ready for Reuse' },
    { code: 'STG-06', unit: 'Distribution Header', process: 'Dual supply loop: WC flush lines & landscape irrigation', flow: '2,890 L Reused Total', status: 'In Service' },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Wastewater Reclamation & Secondary Effluent Loop"
        description="Dual-stage bio-filtration efficiency, greywater recovery ledger, and secondary non-potable distribution."
        badgeText="CLOSED LOOP RECOVERY"
      />

      {/* Recovery Mass Balance Summary */}
      <Card className="bg-white border border-slate-200 rounded p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Input Effluent (T3)</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">2.1 / 5.0 L</div>
            <div className="text-[11px] text-amber-700">42% Sump Level</div>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Filtration Manifold</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">Dual-Stage Unit</div>
            <div className="text-[11px] text-slate-600">Sand + Activated Carbon</div>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Treated Buffer (T4)</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">3.75 / 5.0 L</div>
            <div className="text-[11px] text-emerald-700">75% Reserve Volume</div>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Reclamation Yield</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">82.4%</div>
            <div className="text-[11px] text-emerald-700">Daily Municipal Offset</div>
          </div>
        </div>
      </Card>

      {/* Process Stages Ledger Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Effluent Treatment & Recycling Manifold Ledger</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Dual-Stage Mechanical & Biological Loop</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Stage</th>
                <th className="p-3">Equipment / Vessel</th>
                <th className="p-3">Process Description</th>
                <th className="p-3">Current Telemetry</th>
                <th className="p-3">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processStages.map((stage) => (
                <tr key={stage.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{stage.code}</td>
                  <td className="p-3 font-sans font-semibold text-slate-900">{stage.unit}</td>
                  <td className="p-3 font-sans text-slate-600">{stage.process}</td>
                  <td className="p-3 font-bold text-slate-800 tabular-nums">{stage.flow}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {stage.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mass Balance Weekly Comparison Chart */}
      <ChartCard
        title="Weekly Mass Balance: Generated vs Filtered vs Reused Water"
        subtitle="Daily comparison of wastewater effluent recovery efficiency across facilities"
        isLoading={isLoading}
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reuseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="L" />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 4, borderColor: '#cbd5e1' }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Bar dataKey="generated" name="Wastewater Generated" fill="#d97706" />
              <Bar dataKey="treated" name="Bio-Filtered" fill="#0284c7" />
              <Bar dataKey="reused" name="Successfully Reused" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  )
}
