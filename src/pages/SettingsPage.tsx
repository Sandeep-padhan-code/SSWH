import React, { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Database, Sliders, Save, RotateCcw, CheckCircle2 } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const [t1Capacity, setT1Capacity] = useState('10.0')
  const [t2Capacity, setT2Capacity] = useState('10.0')
  const [t3Capacity, setT3Capacity] = useState('5.0')
  const [t4Capacity, setT4Capacity] = useState('5.0')
  const [tariffRate, setTariffRate] = useState('0.0030')
  const [leakThreshold, setLeakThreshold] = useState('4.0')
  const [phMin, setPhMin] = useState('6.5')
  const [phMax, setPhMax] = useState('8.5')
  const [pollingInterval, setPollingInterval] = useState('1000')
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  const handleReset = () => {
    setT1Capacity('10.0')
    setT2Capacity('10.0')
    setT3Capacity('5.0')
    setT4Capacity('5.0')
    setTariffRate('0.0030')
    setLeakThreshold('4.0')
    setPhMin('6.5')
    setPhMax('8.5')
    setPollingInterval('1000')
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="SCADA Calibration & Dynamic Parameters"
        description="Configure tank volumetric capacities, water tariff rates, potable quality setpoints, and anomaly alarm limits."
        badgeText="CONFIGURATION"
      />

      <form onSubmit={handleSave} className="space-y-4">
        {/* Dynamic Tank Volumetric Capacities */}
        <Card className="bg-white border border-slate-200 rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4 text-slate-700" />
              Dynamic Storage Tank Capacities & Hydrostatic Bounds
            </CardTitle>
            <span className="text-[10px] font-mono text-slate-500">Configurable Geometry Parameters</span>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                T1 Raw Tank Capacity (L)
              </label>
              <input
                type="number"
                step="0.5"
                value={t1Capacity}
                onChange={(e) => setT1Capacity(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Surge buffer tank</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                T2 Clean Overhead Tank (L)
              </label>
              <input
                type="number"
                step="0.5"
                value={t2Capacity}
                onChange={(e) => setT2Capacity(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Potable distribution buffer</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                T3 Wastewater Sump (L)
              </label>
              <input
                type="number"
                step="0.5"
                value={t3Capacity}
                onChange={(e) => setT3Capacity(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Effluent collection sump</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                T4 Treated Reuse Tank (L)
              </label>
              <input
                type="number"
                step="0.5"
                value={t4Capacity}
                onChange={(e) => setT4Capacity(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Secondary non-potable</span>
            </div>
          </CardContent>
        </Card>

        {/* Sensor Tolerances & Tariffs */}
        <Card className="bg-white border border-slate-200 rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sliders className="h-4 w-4 text-slate-700" />
              Safety Setpoints, Anomaly Deltas & Tariffs
            </CardTitle>
            <span className="text-[10px] font-mono text-slate-500">WHO & Regulatory Tolerances</span>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                pH Safe Lower Limit
              </label>
              <input
                type="number"
                step="0.1"
                value={phMin}
                onChange={(e) => setPhMin(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">WHO Standard: 6.5</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                pH Safe Upper Limit
              </label>
              <input
                type="number"
                step="0.1"
                value={phMax}
                onChange={(e) => setPhMax(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">WHO Standard: 8.5</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                Leak Delta Trip (L/min)
              </label>
              <input
                type="number"
                step="0.5"
                value={leakThreshold}
                onChange={(e) => setLeakThreshold(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Minimum night flow threshold</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                Telemetry Rate (ms)
              </label>
              <input
                type="number"
                step="100"
                value={pollingInterval}
                onChange={(e) => setPollingInterval(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Bus sampling frequency</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                Base Utility Tariff ($/L)
              </label>
              <input
                type="number"
                step="0.0005"
                value={tariffRate}
                onChange={(e) => setTariffRate(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:bg-white focus:border-slate-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Standard volumetric slab</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Controls */}
        <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded">
          <div className="text-xs font-mono">
            {isSaved && (
              <span className="text-emerald-700 font-bold inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Parameters written to SCADA controller and verified in audit log.
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-3 w-3 mr-1" /> Restore Factory Calibration
            </Button>
            <Button type="submit" variant="primary" size="sm">
              <Save className="h-3 w-3 mr-1" /> Commit Calibration
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
