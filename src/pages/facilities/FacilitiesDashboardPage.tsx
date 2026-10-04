import React, { useState } from 'react'
import {
  BarChart3,
  Building2,
  Droplets,
  FileText,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Shield,
  Download,
  Info,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { DataFreshnessTag } from '@/components/common/DataFreshnessTag'
import { useAuth } from '@/auth/AuthContext'

const weeklyConsumptionData = [
  { day: 'Mon', municipal: 4200, harvested: 1800, total: 6000 },
  { day: 'Tue', municipal: 4500, harvested: 2100, total: 6600 },
  { day: 'Wed', municipal: 3900, harvested: 2400, total: 6300 },
  { day: 'Thu', municipal: 4800, harvested: 2200, total: 7000 },
  { day: 'Fri', municipal: 4100, harvested: 2500, total: 6600 },
  { day: 'Sat', municipal: 3600, harvested: 1900, total: 5500 },
  { day: 'Sun', municipal: 3400, harvested: 1800, total: 5200 },
]

const zoneBreakdown = [
  { name: 'Household / Restrooms', value: 42, color: '#075B48' },
  { name: 'Cooling & HVAC', value: 28, color: '#2386A8' },
  { name: 'Landscape Irrigation', value: 18, color: '#18A878' },
  { name: 'Kitchen & Dining', value: 12, color: '#D98A00' },
]

const maintenanceIssues = [
  {
    id: 'wo-849',
    title: 'Flow Variance at Riser B-2',
    zone: 'Zone B - Residential Wing',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    assignedTo: 'Tech Services Team A',
    date: 'Oct 04, 09:30 AM',
  },
  {
    id: 'wo-850',
    title: 'Secondary Pump Calibration Check',
    zone: 'Main Pump House',
    severity: 'MEDIUM',
    status: 'PENDING',
    assignedTo: 'Lead Technician Mike',
    date: 'Oct 03, 04:15 PM',
  },
  {
    id: 'wo-851',
    title: 'Rainwater Filter Tank T-2 Cleansed',
    zone: 'Roof Harvesting Deck',
    severity: 'LOW',
    status: 'RESOLVED',
    assignedTo: 'Facility Maintenance',
    date: 'Oct 02, 11:00 AM',
  },
]

export const FacilitiesDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly')
  const [reportExporting, setReportExporting] = useState(false)

  const handleExportReport = () => {
    setReportExporting(true)
    setTimeout(() => {
      setReportExporting(false)
      alert('Facility Water Analytics & Maintenance Report exported to PDF successfully!')
    }, 1200)
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <section className="flex flex-col gap-3 border-b border-[#DDE6E2] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#E8F5F0] px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[#075B48] border border-[#D6E3DD]">
              Facilities Lead Workspace
            </span>
            <span className="text-xs text-[#587068]">Facility Management & Analytics</span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#10231F]">
            Facility Water Intelligence Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#63736E]">
            Comprehensive water consumption analysis, efficiency optimization, and maintenance tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            disabled={reportExporting}
            className="flex items-center gap-2 rounded-lg bg-[#075B48] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#054436] transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
            {reportExporting ? 'Generating Report...' : 'Export Facility Report'}
          </button>
          <DataFreshnessTag showStatusDot={true} />
        </div>
      </section>

      {/* Facilities Key Performance Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#E8F5F0] p-2 text-[#075B48]">
              <Droplets className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#075B48]">
              <TrendingDown className="h-3.5 w-3.5" /> -4.2% vs avg
            </span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Total Facility Consumption
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">
            43,200 <span className="text-xs font-sans text-[#63736E]">L / week</span>
          </p>
          <p className="mt-2 text-xs text-[#63736E]">Target threshold: 50,000 L</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#E8F5F0] p-2 text-[#075B48]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#075B48] bg-[#E8F5F0] px-1.5 py-0.5 rounded">
              OPTIMAL
            </span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Water Efficiency Index
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">91.4%</p>
          <p className="mt-2 text-xs text-[#075B48]">● +2.1% improvement this month</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#FFF2F2] p-2 text-[#C83D3D]">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#C83D3D] bg-[#FFF2F2] px-1.5 py-0.5 rounded">
              1 HIGH PRIORITY
            </span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Maintenance Work Orders
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">3 Open</p>
          <p className="mt-2 text-xs text-[#63736E]">1 In Progress • 2 Pending</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#E9F5F8] p-2 text-[#2386A8]">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono text-[#587068]">ESTIMATED</span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Weekly Water Cost
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">$1,248.50</p>
          <p className="mt-2 text-xs text-[#2386A8]">Harvested reuse saved ~$340.00</p>
        </div>
      </section>

      {/* Analytics & Consumption Breakdown Charts */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Main Consumption Trend Chart */}
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5EEE9] pb-4 mb-4">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#075B48]">
                Consumption Comparison
              </p>
              <h3 className="text-lg font-semibold text-[#10231F]">Weekly Water Volume & Harvesting</h3>
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-[#F7F9F8] p-1 border border-[#DDE6E2]">
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  timeframe === 'weekly' ? 'bg-[#075B48] text-white' : 'text-[#63736E]'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  timeframe === 'monthly' ? 'bg-[#075B48] text-white' : 'text-[#63736E]'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EEE9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#63736E' }} />
                <YAxis tick={{ fontSize: 11, fill: '#63736E' }} unit=" L" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#10231F', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="municipal" name="Municipal Supply (L)" fill="#2386A8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="harvested" name="Harvested Reuse (L)" fill="#075B48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone Breakdown Donut Chart */}
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs">
          <div className="border-b border-[#E5EEE9] pb-4 mb-4">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#075B48]">
              Demand Breakdown
            </p>
            <h3 className="text-lg font-semibold text-[#10231F]">Consumption by Facility Zone</h3>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {zoneBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend formatter={(value) => <span className="text-xs text-[#3F514B] font-medium">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 rounded-lg bg-[#F7F9F8] p-3 border border-[#E5EEE9] text-xs text-[#63736E] flex items-center gap-2">
            <Info className="h-4 w-4 text-[#075B48] shrink-0" />
            <span>Restroom & Household zones remain the highest consumption area (42%).</span>
          </div>
        </div>
      </section>

      {/* Maintenance & Abnormal Consumption Tracking */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Maintenance Orders Table */}
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5EEE9] pb-4 mb-4">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#075B48]">
                Maintenance & Equipment Health
              </p>
              <h3 className="text-lg font-semibold text-[#10231F]">Facility Issue & Leak Tracker</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-[#075B48]">3 Active Tickets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E5EEE9] bg-[#F7F9F8] text-[10px] font-mono uppercase text-[#587068]">
                <tr>
                  <th className="py-2.5 px-3">Issue Title</th>
                  <th className="py-2.5 px-3">Zone / Location</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EEE9]">
                {maintenanceIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-[#F7F9F8]">
                    <td className="py-3 px-3 font-semibold text-[#10231F]">{issue.title}</td>
                    <td className="py-3 px-3 text-[#63736E]">{issue.zone}</td>
                    <td className="py-3 px-3 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          issue.severity === 'HIGH'
                            ? 'bg-[#FFF2F2] text-[#C83D3D]'
                            : issue.severity === 'MEDIUM'
                            ? 'bg-[#FFFDF8] text-[#D98A00]'
                            : 'bg-[#E8F5F0] text-[#075B48]'
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-[#3F514B]">{issue.status}</td>
                    <td className="py-3 px-3 text-[#63736E]">{issue.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Abnormal Consumption Detection Card */}
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#D98A00] mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs font-mono font-bold uppercase">Abnormal Flow Alert</span>
            </div>
            <h3 className="text-lg font-semibold text-[#10231F]">Micro-Leak Advisory: Riser B-2</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#63736E]">
              Overnight baseline flow rate did not drop below 8.2 L/min between 02:00 AM - 04:00 AM. This indicates a potential continuous flush valve leak or pipe line micro-fissure.
            </p>

            <div className="mt-4 rounded-lg bg-[#FFFDF8] p-3.5 border border-[#F0E0C3] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#63736E]">Detected Baseline Flow:</span>
                <span className="font-mono font-bold text-[#D98A00]">8.2 L/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#63736E]">Expected Baseline Flow:</span>
                <span className="font-mono font-bold text-[#075B48]">&lt; 1.5 L/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#63736E]">Estimated Waste Rate:</span>
                <span className="font-mono font-bold text-[#C83D3D]">492 L / hour</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5EEE9] flex items-center justify-between text-xs text-[#63736E]">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-[#075B48]" /> SCADA Controls Isolated
            </span>
            <span className="font-mono text-[11px]">WO #WO-849 Active</span>
          </div>
        </div>
      </section>
    </div>
  )
}
