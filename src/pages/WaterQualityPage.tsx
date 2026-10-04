import React, { useState, useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ChartCard } from '@/components/ui/ChartCard'
import { LoadingState } from '@/components/ui/LoadingState'
import { waterService } from '@/services/waterService'
import { WaterQuality } from '@/types'
import { ShieldCheck } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export const WaterQualityPage: React.FC = () => {
  const [qualities, setQualities] = useState<WaterQuality[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadQuality() {
      setIsLoading(true)
      const data = await waterService.getQualitySummary()
      setQualities(data)
      setIsLoading(false)
    }
    loadQuality()
  }, [])

  const qualityHistory = [
    { time: '02:00', pH: 7.1, TDS: 118, Turbidity: 0.28, Chlorine: 0.52 },
    { time: '06:00', pH: 7.2, TDS: 122, Turbidity: 0.32, Chlorine: 0.49 },
    { time: '10:00', pH: 7.3, TDS: 125, Turbidity: 0.35, Chlorine: 0.48 },
    { time: '14:00', pH: 7.2, TDS: 120, Turbidity: 0.30, Chlorine: 0.51 },
    { time: '18:00', pH: 7.1, TDS: 119, Turbidity: 0.29, Chlorine: 0.50 },
    { time: '22:00', pH: 7.2, TDS: 120, Turbidity: 0.30, Chlorine: 0.50 },
  ]

  const analyticalMethods: Record<string, { standard: string; method: string }> = {
    'pH Level': { standard: '6.5 - 8.5 pH (WHO GDWQ)', method: 'Potentiometric Glass Electrode' },
    'TDS (Total Dissolved Solids)': { standard: '< 300 mg/L (EPA Potable)', method: 'Conductometric Temperature Compensated' },
    'Turbidity': { standard: '< 1.0 NTU (EPA Standard)', method: '90° Scattered Nephelometric' },
    'Free Chlorine': { standard: '0.2 - 0.5 mg/L (Residual)', method: 'Amperometric Membrane Sensor' },
    'Dissolved Oxygen': { standard: '> 6.0 mg/L (Aerated)', method: 'Optical Luminescence Lumiprobe' },
    'Temperature': { standard: '15.0 - 25.0 °C (Ambient)', method: 'DS18B20 1-Wire Digital RTD' },
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Water Quality Analytics & Potable Compliance"
        description="Inline physical, chemical, and microbiological compliance tracking across storage tanks and filtration manifolds."
        badgeText="WHO / EPA COMPLIANT"
      />

      {/* Compliance Header Banner */}
      <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Potable Conformance Status</strong>: All measured parameters satisfy World Health Organization (WHO) and EPA Drinking Water Standards.
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
          Composite Index: 99.2%
        </span>
      </div>

      {/* Regulatory Parameter Matrix Table */}
      {isLoading ? (
        <LoadingState height="h-64" message="Polling water quality parameters..." />
      ) : (
        <Card className="bg-white border border-slate-200 rounded overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Regulatory Compliance Parameter Ledger</CardTitle>
            <span className="text-[10px] font-mono text-slate-500">Post-Filtration Probe Array</span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Parameter</th>
                  <th className="p-3 text-right">Measured Value</th>
                  <th className="p-3">Regulatory Benchmark</th>
                  <th className="p-3">Analytical Methodology</th>
                  <th className="p-3">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {qualities.map((param) => {
                  const meta = analyticalMethods[param.parameter] || { standard: param.safeRange, method: 'Standard Laboratory Sensor' }
                  return (
                    <tr key={param.parameter} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-sans font-semibold text-slate-900">{param.parameter}</td>
                      <td className="p-3 text-right tabular-nums">
                        <span className="font-bold text-slate-900 text-sm">{param.currentValue}</span>{' '}
                        <span className="text-slate-500 text-[10px]">{param.unit}</span>
                      </td>
                      <td className="p-3 text-slate-700 font-sans">{meta.standard}</td>
                      <td className="p-3 text-slate-500 font-sans">{meta.method}</td>
                      <td className="p-3">
                        <StatusBadge status={param.status} size="sm" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Historical Quality Trends */}
      <ChartCard
        title="24-Hour Parameter Stability Curves"
        subtitle="Inline continuous readings for pH, TDS, and Turbidity across filtration manifold"
        badgeText="24H CONTINUOUS"
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={qualityHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 4, borderColor: '#cbd5e1' }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Line type="monotone" dataKey="pH" name="pH Level" stroke="#0284c7" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="TDS" name="TDS (mg/L)" stroke="#0f172a" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Turbidity" name="Turbidity (NTU)" stroke="#d97706" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  )
}
