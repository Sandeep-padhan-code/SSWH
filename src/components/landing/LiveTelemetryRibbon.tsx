

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Droplets, Database, Recycle, CloudRain } from 'lucide-react'
import { dashboardService } from '@/services/dashboardService'
import { DashboardData } from '@/types'

export const LiveTelemetryRibbon: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await dashboardService.getDashboardSummary()
        setData(res)
      } catch (e) {
        console.error('Failed to load dashboard summary for landing page', e)
      }
    }
    fetchSummary()
  }, [])

  if (!data) return null

  const getMetricValue = (metricId: string) => {
    const metric = data.metrics.find(({ id }) => id === metricId)

    if (!metric) return '—'

    return `${metric.value}${metric.unit ? ` ${metric.unit}` : ''}`
  }

  // Extract key real metrics from existing system data
  const metrics = [
    {
      label: 'TOTAL WATER HARVESTED',
      value: getMetricValue('kpi-col'),
      subtext: '+12.4% vs baseline intake',
      icon: Droplets,
      targetPath: '/collection',
    },
    {
      label: 'RESERVOIR RESERVES BUFFER',
      value: getMetricValue('kpi-avl'),
      subtext: `${data.tanks.length} active storage reservoirs`,
      icon: Database,
      targetPath: '/tanks',
    },
    {
      label: 'RECIRCULATED & REUSED',
      value: getMetricValue('kpi-reu'),
      subtext: 'Greywater offset to non-potable grid',
      icon: Recycle,
      targetPath: '/wastewater',
    },
    {
      label: 'RAINWATER CATCHMENT',
      value: getMetricValue('kpi-rain'),
      subtext: 'Direct roof & catchment run-off',
      icon: CloudRain,
      targetPath: '/collection',
    },
  ]

  return (
    <section className="relative z-10 bg-[#070e10] border-y border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-[0.2em] mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              SCADA TELEMETRY BUS — SIMULATED DEMO STREAM
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight">
              Operational Telemetry Matrix
            </h2>
          </div>
          <Link
            to="/monitoring"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.16em] uppercase text-emerald-300 hover:text-white transition-colors"
          >
            <span>VIEW FULL SENSOR SPECTRUM</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Real Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon
            return (
              <Link
                key={idx}
                to={m.targetPath}
                className="group relative p-6 bg-slate-950/40 hover:bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded bg-white/5 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 mb-1">
                  {m.label}
                </div>
                <div className="font-serif text-3xl font-light text-white tracking-tight mb-2">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 font-sans group-hover:text-slate-300 transition-colors">
                  {m.subtext}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
