import React from 'react'
import {
  Droplets,
  Lightbulb,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Calendar,
  FileText,
  Bell,
  CheckCircle2,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useAuth } from '@/auth/AuthContext'

const tenantDailyData = [
  { day: 'Mon', usage: 280, avg: 320 },
  { day: 'Tue', usage: 310, avg: 320 },
  { day: 'Wed', usage: 295, avg: 320 },
  { day: 'Thu', usage: 340, avg: 320 },
  { day: 'Fri', usage: 312, avg: 320 },
  { day: 'Sat', usage: 260, avg: 320 },
  { day: 'Sun', usage: 245, avg: 320 },
]

const tenantNotifications = [
  {
    id: 't-notif-1',
    title: 'Scheduled Water Tank Sanitization',
    message: 'Routine cleaning scheduled for Main Water Storage Tank on Saturday 10:00 AM - 12:00 PM.',
    date: 'Oct 04',
    type: 'INFO',
  },
  {
    id: 't-notif-2',
    title: 'Water Efficiency Goal Achieved!',
    message: 'Your building unit used 8.2% less water this week compared to last week.',
    date: 'Oct 03',
    type: 'SUCCESS',
  },
]

export const TenantDashboardPage: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-5xl space-y-6 pb-8">
      {/* Header Banner */}
      <section className="flex flex-col gap-3 border-b border-[#DDE6E2] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#5494DA]/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[#5494DA] border border-[#5494DA]/20">
              Tenant Observer View
            </span>
            <span className="text-xs text-[#587068]">Read-Only Visibility</span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#10231F]">
            My Water Usage & Efficiency
          </h1>
          <p className="mt-1 text-sm text-[#63736E]">
            Track your building and household water consumption, historical trends, and water-saving advice.
          </p>
        </div>

        <div className="rounded-lg bg-[#F7F9F8] border border-[#DDE6E2] px-3 py-1.5 text-xs text-[#587068] font-mono flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#5494DA]" />
          <span>Read-Only Portal ({user?.buildingName || 'Block B - Apt 402'})</span>
        </div>
      </section>

      {/* Primary Metrics Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#5494DA]/10 p-2 text-[#5494DA]">
              <Droplets className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono text-[#587068]">TODAY</span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Current Water Usage
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">
            312 <span className="text-xs font-sans text-[#63736E]">Liters</span>
          </p>
          <p className="mt-2 text-xs text-[#18A878]">● Normal household consumption pattern</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#5494DA]/10 p-2 text-[#5494DA]">
              <TrendingDown className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#5494DA]">
              -8.2%
            </span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Compared With Last Week
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">
            -28 <span className="text-xs font-sans text-[#63736E]">L / day</span>
          </p>
          <p className="mt-2 text-xs text-[#5494DA]">Great job! You are using less water.</p>
        </div>

        <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-[#73B9EE]/10 p-2 text-[#5494DA]">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#5494DA] bg-[#5494DA]/10 px-1.5 py-0.5 rounded">
              GRADE A
            </span>
          </div>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-wider text-[#63736E]">
            Building Efficiency Score
          </p>
          <p className="mt-1 text-2xl font-bold font-mono text-[#10231F]">94 / 100</p>
          <p className="mt-2 text-xs text-[#63736E]">Top 15% in Waterwise Community</p>
        </div>
      </section>

      {/* Usage Trend Chart */}
      <section className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E5EEE9] pb-4 mb-4">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5494DA]">
              Daily Consumption History
            </p>
            <h3 className="text-lg font-semibold text-[#10231F]">7-Day Usage Trend vs Community Average</h3>
          </div>
          <span className="text-xs font-mono text-[#63736E] flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> Past 7 Days
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tenantDailyData}>
              <defs>
                <linearGradient id="tenantUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5494DA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5494DA" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EEE9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#63736E' }} />
              <YAxis tick={{ fontSize: 11, fill: '#63736E' }} unit=" L" />
              <Tooltip
                contentStyle={{ backgroundColor: '#10231F', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="usage" name="Your Usage (L)" stroke="#5494DA" strokeWidth={2} fillOpacity={1} fill="url(#tenantUsage)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Water Saving Tips & Tenant Notifications */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Water Saving Tip Card */}
        <div className="rounded-xl border border-[#5494DA]/20 bg-[#5494DA]/5 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#5494DA] mb-3">
              <Lightbulb className="h-6 w-6" />
              <h3 className="text-base font-semibold text-[#10231F]">Water-Saving Tip of the Week</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#3F514B]">
              Running full laundry loads and repairing aerators on bathroom faucets can save up to 45 liters per household per day!
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#5494DA]/20 flex items-center justify-between text-xs text-[#5494DA] font-medium">
            <span>● Easy Household Action</span>
            <span>Est. Savings: ~1,350 L / month</span>
          </div>
        </div>

        {/* Tenant Notifications List */}
        <div className="rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5EEE9] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#5494DA]" />
              <h3 className="text-base font-semibold text-[#10231F]">Tenant Notifications</h3>
            </div>
            <span className="text-[10px] font-mono text-[#587068]">Read-Only Feed</span>
          </div>

          <div className="space-y-3">
            {tenantNotifications.map((notif) => (
              <div key={notif.id} className="p-3 rounded-lg border border-[#E5EEE9] bg-[#F7F9F8] text-xs">
                <div className="flex items-center justify-between font-semibold text-[#10231F]">
                  <span className="flex items-center gap-1.5">
                    {notif.type === 'SUCCESS' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#18A878]" />
                    ) : (
                      <Bell className="h-3.5 w-3.5 text-[#5494DA]" />
                    )}
                    {notif.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#8AA097]">{notif.date}</span>
                </div>
                <p className="mt-1 text-[#63736E] leading-normal">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
