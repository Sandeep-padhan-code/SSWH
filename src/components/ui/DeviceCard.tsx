import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { StatusBadge } from './StatusBadge'
import { Button } from './Button'
import { Power, RefreshCw, Sliders, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { Device } from '@/types'
import { cn } from '@/utils/cn'

export interface DeviceCardProps {
  device: Device
  className?: string
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className={cn('bg-white border border-[#D6E3DD] rounded', className)}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span className="text-[#71877F] font-bold">{device.id}</span>
            <span className="text-[#0F4D3A] bg-[#DCEAE4] border border-[#B8D4C8] px-1.5 py-0.2 rounded uppercase font-semibold">
              {device.category}
            </span>
          </div>
          <CardTitle className="text-xs sm:text-sm font-bold text-[#10251F] mt-1">
            {device.name}
          </CardTitle>
          <div className="text-[11px] text-[#587068] font-mono">{device.type}</div>
        </div>
        <StatusBadge status={device.status} size="sm" />
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        <div className="space-y-1 text-[11px] text-[#3F514B] bg-[#F4F8F5] p-2 rounded border border-[#D6E3DD] font-mono">
          <div className="flex justify-between">
            <span className="text-[#587068]">Location:</span>
            <span className="font-sans font-medium text-[#10251F]">{device.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#587068]">Protocol:</span>
            <span className="text-[#0F4D3A] font-semibold">{device.connectivity}</span>
          </div>
          {device.batteryLevel && (
            <div className="flex justify-between">
              <span className="text-[#587068]">Supply:</span>
              <span className="text-[#10251F]">{device.batteryLevel}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#587068]">Last Telemetry:</span>
            <span className="text-[#3F514B]">{device.lastSeen}</span>
          </div>
        </div>

        {/* Expansion for Specs */}
        {device.specs && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-[10px] text-[#587068] hover:text-[#0F4D3A] font-mono font-semibold cursor-pointer py-1"
            >
              <span>{isExpanded ? 'Hide Hardware Specs' : 'View Hardware Specs'}</span>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            {isExpanded && (
              <div className="mt-1 p-2 rounded bg-[#F4F8F5] border border-[#D6E3DD] text-[10px] font-mono space-y-1 text-[#3F514B]">
                {Object.entries(device.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-[#587068]">{key}:</span>
                    <span className="text-[#10251F]">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hardware Control Action Stubs */}
        <div className="pt-2 border-t border-[#E5EEE9] space-y-1.5">
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" disabled className="flex-1 opacity-60 text-[10px] h-6.5">
              <Power className="h-3 w-3 mr-1" /> Cycle
            </Button>
            <Button variant="outline" size="sm" disabled className="flex-1 opacity-60 text-[10px] h-6.5">
              <RefreshCw className="h-3 w-3 mr-1" /> Ping
            </Button>
            <Button variant="outline" size="sm" disabled className="flex-1 opacity-60 text-[10px] h-6.5">
              <Sliders className="h-3 w-3 mr-1" /> Param
            </Button>
          </div>
          <div className="text-[9px] text-center text-[#587068] font-mono flex items-center justify-center gap-1">
            <AlertCircle className="h-2.5 w-2.5 text-[#D99024]" />
            Hardware actuation interlocked in staging mode
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
