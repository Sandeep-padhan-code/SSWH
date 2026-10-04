import React, { useState, useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChartCard } from '@/components/ui/ChartCard'
import { waterService } from '@/services/waterService'
import { WaterUsage } from '@/types'
import { Filter, Building, Layers } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export const ConsumptionPage: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('Building Alpha-1')
  const [selectedFloor, setSelectedFloor] = useState('All Floors')
  const [zones, setZones] = useState<WaterUsage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadZones() {
      setIsLoading(true)
      const data = await waterService.getUsageByZone()
      setZones(data)
      setIsLoading(false)
    }
    loadZones()
  }, [])

  const floorData = [
    { floor: 'Basement Plant', consumption: 420 },
    { floor: 'Ground Floor', consumption: 2100 },
    { floor: 'Floor 1', consumption: 1850 },
    { floor: 'Floor 2', consumption: 1920 },
    { floor: 'Floor 3', consumption: 2450 },
  ]

  const submeterTable = [
    { id: 'SM-B1-01', zone: 'Domestic Restrooms', floor: 'All Floors', dailyLiters: 3200, pct: '38.5%', status: 'Normal Flow' },
    { id: 'SM-B1-02', zone: 'Kitchen & Cafeteria', floor: 'Ground Floor', dailyLiters: 2150, pct: '25.8%', status: 'Peak Window' },
    { id: 'SM-B1-03', zone: 'Landscape Irrigation', floor: 'Exterior', dailyLiters: 1680, pct: '20.2%', status: 'Reused Line (T4)' },
    { id: 'SM-B1-04', zone: 'HVAC Cooling Tower', floor: 'Roof Plant', dailyLiters: 890, pct: '10.7%', status: 'Make-up Line' },
    { id: 'SM-B1-05', zone: 'Floor Washing & Service', floor: 'All Floors', dailyLiters: 400, pct: '4.8%', status: 'Reused Line (T4)' },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Sub-Metered Water Consumption Analytics"
        description="Multi-tier sub-metered water consumption tracking across buildings, floors, utility risers, and end-use categories."
        badgeText="SUB-METERED MATRIX"
      />

      {/* Filter Toolbar */}
      <Card className="p-3 bg-white border border-slate-200 rounded">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className="h-3.5 w-3.5 text-slate-600" />
            <span>Facility Hierarchy:</span>
          </div>

          <div className="flex items-center gap-1">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none"
            >
              <option value="Building Alpha-1">Building Alpha-1 (Main Facility)</option>
              <option value="Building Beta-2">Building Beta-2 (Annex Facility)</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All Floors">All Levels Aggregate</option>
              <option value="Basement">Basement Mechanical</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="Floor 1">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
            </select>
          </div>

          <div className="ml-auto text-[11px] text-slate-500 font-mono">
            Aggregate Demand: <span className="font-bold text-slate-900">8,320 Liters / 24h</span>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Consumption Breakdown by End-Use Category"
          subtitle="Volume distribution across domestic, cooling, and secondary reuse lines."
          isLoading={isLoading}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zones} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} unit="L" />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} width={120} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 4, borderColor: '#cbd5e1' }} />
                <Bar dataKey="volumeLiters" name="Volume (L)" fill="#0f2942" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Floor-by-Floor Consumption Distribution"
          subtitle={`Aggregated consumption profile for ${selectedBuilding}.`}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={floorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="floor" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="L" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 4, borderColor: '#cbd5e1' }} />
                <Bar dataKey="consumption" name="Liters Consumed" fill="#0284c7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Sub-Meter Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Sub-Metered Distribution Points Ledger</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Pulse Flow Meters Calibrated</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Meter ID</th>
                <th className="p-3">Sub-Metered Zone</th>
                <th className="p-3">Physical Location</th>
                <th className="p-3 text-right">Daily Volume</th>
                <th className="p-3 text-right">Share of Facility</th>
                <th className="p-3">Line Circuit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submeterTable.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{row.id}</td>
                  <td className="p-3 font-sans font-medium text-slate-900">{row.zone}</td>
                  <td className="p-3 font-sans text-slate-600">{row.floor}</td>
                  <td className="p-3 text-right font-bold text-slate-900 tabular-nums">
                    {row.dailyLiters.toLocaleString()} L
                  </td>
                  <td className="p-3 text-right font-bold text-slate-700 tabular-nums">{row.pct}</td>
                  <td className="p-3">
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-slate-700">
                      {row.status}
                    </span>
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
