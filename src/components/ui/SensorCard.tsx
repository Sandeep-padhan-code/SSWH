import React from 'react'
import { Card, CardContent } from './Card'
import { StatusBadge } from './StatusBadge'
import { OfflineState } from './OfflineState'
import { LoadingState } from './LoadingState'
import { Sensor } from '@/types'
import { cn } from '@/utils/cn'

export interface SensorCardProps {
  sensor: Sensor
  isLoading?: boolean
  isOffline?: boolean
  className?: string
}

export const SensorCard: React.FC<SensorCardProps> = ({
  sensor,
  isLoading = false,
  isOffline = false,
  className,
}) => {
  if (isLoading) {
    return <LoadingState height="h-32" className={className} />
  }

  if (isOffline || sensor.status === 'OFFLINE') {
    return (
      <OfflineState
        deviceName={sensor.name}
        lastReading={`${sensor.currentValue} ${sensor.unit}`}
        lastUpdated={sensor.lastUpdated}
        className={className}
      />
    )
  }

  return (
    <Card className={cn('bg-white border border-[#D6E3DD] rounded', className)}>
      <CardContent className="p-3.5 space-y-2">
        <div className="flex items-start justify-between gap-1">
          <div>
            <div className="text-[10px] font-mono text-[#71877F] font-bold">{sensor.id}</div>
            <h4 className="text-xs font-bold text-[#10251F] leading-snug">{sensor.name}</h4>
          </div>
          <StatusBadge status={sensor.status} size="sm" />
        </div>

        <div className="flex items-baseline gap-1.5 pt-0.5">
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0F4D3A] tracking-tight">
            {sensor.currentValue}
          </span>
          <span className="text-xs font-mono text-[#587068] font-normal">{sensor.unit}</span>
        </div>

        <div className="pt-2 border-t border-[#E5EEE9] flex items-center justify-between text-[10px] text-[#587068] font-mono">
          <span className="truncate">
            {sensor.safeRange ? `Safe: ${sensor.safeRange}` : sensor.location}
          </span>
          <span className="shrink-0">{sensor.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  )
}
