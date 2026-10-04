import React from 'react'
import { Card, CardContent } from './Card'
import { StatusBadge } from './StatusBadge'
import { DashboardMetric } from '@/types'
import { cn } from '@/utils/cn'

export interface StatCardProps {
  metric: DashboardMetric
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({ metric, className }) => {
  return (
    <Card className={cn('bg-white border border-[#D6E3DD] rounded shadow-xs', className)}>
      <CardContent className="p-3.5 space-y-1.5">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[11px] font-mono uppercase font-bold text-[#587068] tracking-wider truncate">
            {metric.label}
          </span>
          {metric.status && metric.status !== 'NORMAL' && (
            <StatusBadge status={metric.status} size="sm" />
          )}
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0F4D3A] tracking-tight">
            {metric.value}
          </span>
          {metric.unit && (
            <span className="text-xs font-mono text-[#587068] font-normal">
              {metric.unit}
            </span>
          )}
        </div>

        <div className="text-[11px] text-[#587068] pt-1 border-t border-[#E5EEE9] flex items-center justify-between">
          {metric.trend ? (
            <span
              className={cn(
                'font-mono font-medium',
                metric.trend.isPositive ? 'text-[#18A878]' : 'text-[#C94B5B]'
              )}
            >
              {metric.trend.isPositive ? '▲ +' : '▼ -'}
              {metric.trend.value > 0 ? `${metric.trend.value}% ` : ''}
              {metric.trend.label}
            </span>
          ) : metric.sublabel ? (
            <span className="text-[#587068] truncate">{metric.sublabel}</span>
          ) : (
            <span className="text-[#71877F] font-mono text-[10px]">SCADA Monitored</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
