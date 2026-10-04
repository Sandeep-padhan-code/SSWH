import React, { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Download, FileText, Filter } from 'lucide-react'

export const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('Daily Usage')
  const [selectedBuilding, setSelectedBuilding] = useState('Building Alpha-1')
  const [dateRange, setDateRange] = useState('Last 7 Days')

  const reportRecords = [
    { date: '2026-09-30', collectedLiters: 1850, consumedLiters: 1180, reusedLiters: 420, avgQuality: '98.5% (Good)', leaksDetected: 1 },
    { date: '2026-09-29', collectedLiters: 1620, consumedLiters: 1210, reusedLiters: 400, avgQuality: '99.1% (Good)', leaksDetected: 0 },
    { date: '2026-09-28', collectedLiters: 1940, consumedLiters: 1140, reusedLiters: 450, avgQuality: '97.8% (Good)', leaksDetected: 0 },
    { date: '2026-09-27', collectedLiters: 2100, consumedLiters: 1300, reusedLiters: 480, avgQuality: '98.2% (Good)', leaksDetected: 0 },
    { date: '2026-09-26', collectedLiters: 1750, consumedLiters: 1220, reusedLiters: 390, avgQuality: '99.0% (Good)', leaksDetected: 0 },
  ]

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,Collected (L),Consumed (L),Reused (L),Quality Compliance,Leaks\n' +
      reportRecords.map((r) => `${r.date},${r.collectedLiters},${r.consumedLiters},${r.reusedLiters},${r.avgQuality},${r.leaksDetected}`).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `water_audit_report_${reportType.toLowerCase().replace(/\s+/g, '_')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Regulatory Compliance & Water Balance Audit Reports"
        description="Parameterized water balance, quality compliance, and sub-metered telemetry reports."
        badgeText="AUDIT LEDGER"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleExportCSV} className="text-xs">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV Data
            </Button>
            <Button variant="outline" size="sm" disabled className="text-xs opacity-60">
              <FileText className="h-3.5 w-3.5 mr-1" /> PDF Export (Staged)
            </Button>
          </div>
        }
      />

      {/* Filter Parameters */}
      <Card className="p-3 bg-white border border-slate-200 rounded">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className="h-3.5 w-3.5 text-slate-600" />
            <span>Audit Query Filters:</span>
          </div>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 outline-none"
          >
            <option value="Daily Usage">Daily Water Usage & Balance</option>
            <option value="Rainwater Harvesting">Rainwater Catchment Audit</option>
            <option value="Wastewater Recycling">Wastewater Recycling Yield</option>
            <option value="Water Quality Audit">Potable Water Quality Conformance</option>
            <option value="Leak Incidents">Hydrodynamic Leak & Anomaly Incidents</option>
          </select>

          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 outline-none"
          >
            <option value="Building Alpha-1">Facility Alpha-1 (Primary)</option>
            <option value="Building Beta-2">Facility Beta-2 (Annex)</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 outline-none"
          >
            <option value="Last 7 Days">Last 7 Operating Days</option>
            <option value="Last 30 Days">Last 30 Operating Days</option>
            <option value="This Quarter">Current Quarter (Q3 2026)</option>
          </select>

          <div className="ml-auto text-[11px] text-slate-500 font-mono">
            Records Matching: <span className="font-bold text-slate-900">{reportRecords.length} Days</span>
          </div>
        </div>
      </Card>

      {/* Reports Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Operating Date</th>
                <th className="p-3 text-right">Harvested / Intake (L)</th>
                <th className="p-3 text-right">Gross Consumption (L)</th>
                <th className="p-3 text-right">Secondary Reused (L)</th>
                <th className="p-3">Potable Compliance Index</th>
                <th className="p-3 text-right">Anomalies Detected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportRecords.map((r) => (
                <tr key={r.date} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{r.date}</td>
                  <td className="p-3 text-right tabular-nums text-slate-900 font-semibold">{r.collectedLiters.toLocaleString()} L</td>
                  <td className="p-3 text-right tabular-nums text-slate-900 font-semibold">{r.consumedLiters.toLocaleString()} L</td>
                  <td className="p-3 text-right tabular-nums text-emerald-700 font-semibold">{r.reusedLiters.toLocaleString()} L</td>
                  <td className="p-3 font-sans text-slate-800">{r.avgQuality}</td>
                  <td className="p-3 text-right tabular-nums">
                    {r.leaksDetected > 0 ? (
                      <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        {r.leaksDetected} Alert
                      </span>
                    ) : (
                      <span className="text-slate-400">0</span>
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
