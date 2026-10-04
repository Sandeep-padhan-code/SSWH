import React from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChartCard } from '@/components/ui/ChartCard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Info } from 'lucide-react'

export const CollectionPage: React.FC = () => {
  const collectionHistory = [
    { month: 'Apr', yieldLiters: 1200, rainfallMm: 38 },
    { month: 'May', yieldLiters: 1800, rainfallMm: 52 },
    { month: 'Jun', yieldLiters: 4200, rainfallMm: 114 },
    { month: 'Jul', yieldLiters: 5800, rainfallMm: 156 },
    { month: 'Aug', yieldLiters: 6400, rainfallMm: 172 },
    { month: 'Sep', yieldLiters: 4480, rainfallMm: 120 },
  ]

  const catchmentSpecs = [
    { label: 'Rooftop Catchment Footprint', val: '450 m²', sub: 'Coated elastomeric membrane' },
    { label: 'Runoff Yield Coefficient (C)', val: '0.90', sub: 'Industry standard for pitched roofs' },
    { label: 'First-Flush Diverter Chamber', val: '120 Liters', sub: 'Automated coarse sediment bypass' },
    { label: 'T1 Raw Tank Buffer Ullage', val: '2.0 / 10.0 L', sub: '20% active surge headroom' },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Rainwater Catchment & Raw Inflow Analytics"
        description="Rooftop runoff harvest dynamics, first-flush diversion stages, and precipitation yield calculations."
        badgeText="METEOROLOGICAL HARVEST"
      />

      {/* Weather API Staging Notice */}
      <div className="p-3 rounded bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2 font-mono">
        <Info className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 font-bold">Meteorological Telemetry Notice</strong>: Local Doppler precipitation radar feeds operate in deterministic simulation staging. Catchment runoff equations adhere to rational hydrological formulas (Q = C × I × A).
        </div>
      </div>

      {/* Catchment Infrastructure Specs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        {catchmentSpecs.map((spec) => (
          <Card key={spec.label} className="bg-white border border-slate-200 rounded p-3">
            <div className="text-[10px] text-slate-500 uppercase font-bold">{spec.label}</div>
            <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">{spec.val}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{spec.sub}</div>
          </Card>
        ))}
      </div>

      {/* Historical Yield Chart */}
      <ChartCard
        title="Seasonal Harvested Rainwater Volume (Liters)"
        subtitle="Monthly precipitation harvest yield tracked against measured rainfall depth (mm)"
        badgeText="SEASONAL PROFILE"
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={collectionHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="L" />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 4, borderColor: '#cbd5e1' }} />
              <Area type="monotone" dataKey="yieldLiters" name="Harvested Liters" stroke="#0284c7" fill="#0284c7" fillOpacity={0.12} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Catchment Runoff Accounting Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Catchment Runoff & Municipal Offset Accounting</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Hydrostatic Mass Balance</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3 text-right">Precipitation (mm)</th>
                <th className="p-3 text-right">Theoretical Runoff (L)</th>
                <th className="p-3 text-right">Actual Harvest (L)</th>
                <th className="p-3 text-right">Catchment Efficiency</th>
                <th className="p-3">Intake Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {collectionHistory.map((row) => {
                const theoretical = (row.rainfallMm * 450 * 0.9).toFixed(0)
                const eff = ((row.yieldLiters / Number(theoretical)) * 100).toFixed(1)
                return (
                  <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{row.month} 2026</td>
                    <td className="p-3 text-right tabular-nums text-slate-800">{row.rainfallMm} mm</td>
                    <td className="p-3 text-right tabular-nums text-slate-700">{Number(theoretical).toLocaleString()} L</td>
                    <td className="p-3 text-right tabular-nums font-bold text-slate-900">{row.yieldLiters.toLocaleString()} L</td>
                    <td className="p-3 text-right tabular-nums font-semibold text-emerald-700">{eff}%</td>
                    <td className="p-3">
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-slate-700">
                        First-Flush Filtered
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
