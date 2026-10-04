import React from 'react'
import { WifiOff, Clock } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface OfflineStateProps {
  deviceName?: string
  lastReading?: string
  lastUpdated?: string
  className?: string
}

export const OfflineState: React.FC<OfflineStateProps> = ({
  deviceName = 'SCADA Telemetry Node',
  lastReading = 'N/A',
  lastUpdated = 'Unknown',
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center p-4 text-center rounded bg-slate-50 border border-slate-200 text-slate-600',
        className
      )}
    >
      <div className="p-2 rounded bg-slate-200 text-slate-600 mb-2">
        <WifiOff className="h-4 w-4" />
      </div>
      <h4 className="text-xs font-bold text-slate-800 tracking-tight">
        Node Signal Disconnected
      </h4>
      <p className="text-[11px] text-slate-500 mt-0.5">
        {deviceName} is not transmitting telemetry heartbeats.
      </p>

      <div className="mt-2.5 flex items-center gap-3 text-[10px] bg-white px-2.5 py-1 rounded border border-slate-200 font-mono text-slate-600">
        <span>Last Value: {lastReading}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-slate-400" /> {lastUpdated}
        </span>
      </div>
    </div>
  )
}
