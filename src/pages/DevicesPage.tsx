import React, { useState, useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { DeviceCard } from '@/components/ui/DeviceCard'
import { LoadingState } from '@/components/ui/LoadingState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { deviceService } from '@/services/deviceService'
import { Device } from '@/types'
import { Table as TableIcon, LayoutGrid, Search, AlertOctagon } from 'lucide-react'

export const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadDevices() {
      setIsLoading(true)
      const data = await deviceService.getAllDevices()
      setDevices(data)
      setIsLoading(false)
    }
    loadDevices()
  }, [])

  const categories = ['ALL', 'GATEWAY', 'CONTROLLER', 'ACTUATOR', 'SENSOR']

  const filteredDevices = devices.filter((d) => {
    const matchesCategory = selectedCategory === 'ALL' || d.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-4">
      <PageHeader
        title="Hardware Node Registry & Microcontroller Layer"
        description="Logical gateway abstraction, microcontroller peripheral nodes, inline sensor manifolds, and actuator relays."
        badgeText="HARDWARE REGISTRY"
      />

      {/* Hardware Staging Notice Banner */}
      <div className="p-3 rounded bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 font-mono">
        <AlertOctagon className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Hardware Actuation Interlocked</span>: Physical microcontroller bus (ESP32 / Optoisolated Relays / RS485 RTU) is operating in staging mode. Relay switching commands remain virtualized to prevent unintended equipment cycling during testing.
        </div>
      </div>

      {/* Filter & View Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded border border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search devices, nodes, IP..."
              className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none w-48 sm:w-60 font-mono"
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs font-mono text-slate-500 mr-1 hidden sm:inline">Type:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 text-xs font-mono font-medium rounded cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-mono">
            {filteredDevices.length} of {devices.length} Nodes Registered
          </span>

          <div className="flex border border-slate-200 rounded p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View (Registry)"
            >
              <TableIcon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View (Device Cards)"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <LoadingState height="h-64" message="Loading hardware device registry..." />
      ) : filteredDevices.length === 0 ? (
        <EmptyState title="No hardware devices found" description="No registered nodes match the selected filter criteria." />
      ) : viewMode === 'table' ? (
        <Card className="bg-white border border-slate-200 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Node ID</th>
                  <th className="p-3">Device Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Physical Location</th>
                  <th className="p-3">Network Protocol</th>
                  <th className="p-3">Power Bus</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Heartbeat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{device.id}</td>
                    <td className="p-3 font-sans">
                      <span className="font-bold text-slate-900 block">{device.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{device.type}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-slate-700 font-semibold">
                        {device.category}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600">{device.location}</td>
                    <td className="p-3 text-slate-800 font-semibold">{device.connectivity}</td>
                    <td className="p-3 text-slate-600">{device.batteryLevel || '12V DC Mains'}</td>
                    <td className="p-3">
                      <StatusBadge status={device.status} size="sm" />
                    </td>
                    <td className="p-3 text-slate-500 text-[11px]">{device.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  )
}
