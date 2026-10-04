import React, { useState, useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { InsightCard } from '@/components/ui/InsightCard'
import { LoadingState } from '@/components/ui/LoadingState'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { mlService } from '@/services/mlService'
import { MLInsight } from '@/types'
import { ShieldCheck } from 'lucide-react'

export const AiInsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<MLInsight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadInsights() {
      setIsLoading(true)
      const data = await mlService.getInsights()
      setInsights(data)
      setIsLoading(false)
    }
    loadInsights()
  }, [])

  const modelSpecs = [
    {
      code: 'MDL-LSTM-01',
      name: 'Diurnal Demand Forecaster',
      type: 'Long Short-Term Memory (LSTM)',
      inputHorizon: '72h Continuous Telemetry',
      outputHorizon: '24h Forward Demand (Hourly)',
      purpose: 'Predicts peak domestic draw windows and coordinates pre-fill of T2 Overhead Clean Tank during off-peak power rates.',
    },
    {
      code: 'MDL-AE-02',
      name: 'Hydrodynamic Anomaly Detector',
      type: 'Deep Autoencoder Residuals',
      inputHorizon: '10-minute Rolling Window',
      outputHorizon: 'Reconstruction Error Delta',
      purpose: 'Screens flow rate deviations during 02:00–04:00 nocturnal baselines to isolate pipe hairline micro-leaks before catastrophic bursts.',
    },
    {
      code: 'MDL-OPT-03',
      name: 'Pump Energy & Tariff Optimizer',
      type: 'Mixed-Integer Linear Program (MILP)',
      inputHorizon: 'Real-Time Storage Levels + Tariffs',
      outputHorizon: 'Pump Schedule Dispatch Matrix',
      purpose: 'Schedules Pump 1 and Pump 3 duty cycles strictly during low-tariff electric windows while guaranteeing emergency reserve margins.',
    },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Predictive Analytics & Hydrodynamic Modeling"
        description="Machine learning forecasting, minimum-flow residual anomaly detection, and energy-optimal pump scheduling."
        badgeText="STATISTICAL MODELING"
      />

      {/* Model Contract & API Architecture Banner */}
      <div className="p-3 rounded bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 font-mono">
        <ShieldCheck className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">API Contract Staging Staging Notice</span>: Displayed predictions represent statistical test vectors conforming strictly to production microservice interfaces. Microservices link via gRPC / REST into Python inference workers without requiring UI restructuring.
        </div>
      </div>

      {/* Mathematical Model Specification Registry */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Active Hydrodynamic & Predictive Model Specifications</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Inference Architecture Matrix</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Model Code</th>
                <th className="p-3">Model Title</th>
                <th className="p-3">Mathematical Formulation</th>
                <th className="p-3">Forecast Horizon</th>
                <th className="p-3">Operational Objective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modelSpecs.map((spec) => (
                <tr key={spec.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{spec.code}</td>
                  <td className="p-3 font-sans font-semibold text-slate-900">{spec.name}</td>
                  <td className="p-3 text-slate-800">{spec.type}</td>
                  <td className="p-3 text-slate-600">{spec.outputHorizon}</td>
                  <td className="p-3 font-sans text-slate-600 max-w-sm">{spec.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Model Recommendations & Output Signals */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-900">
            Validated Operational Predictions & Actionable Recommendations
          </h2>
          <span className="text-xs font-mono text-slate-500">
            {insights.length} Active Staged Predictions
          </span>
        </div>

        {isLoading ? (
          <LoadingState height="h-64" message="Polling predictive model inference contracts..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
