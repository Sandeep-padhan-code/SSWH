import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { StatusBadge } from './StatusBadge'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Tank } from '@/types'
import { cn } from '@/utils/cn'

export interface TankCardProps {
  tank: Tank
  onConfigure?: (tank: Tank) => void
  className?: string
}

export const TankCard: React.FC<TankCardProps> = ({ tank, onConfigure, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // SSWH Master tank level color system
  const getLevelColor = (pct: number, status: string) => {
    if (status === 'CRITICAL' || pct <= tank.criticalThreshold) return 'bg-[#C94B5B]'
    if (status === 'WARNING' || pct <= tank.warningThreshold) return 'bg-[#D99024]'
    if (pct <= 70) return 'bg-[#73B9EE]'
    return 'bg-[#5494DA]'
  }

  const netFlow = (tank.inflowRate - tank.outflowRate).toFixed(1)

  return (
    <Card className={cn('bg-white border border-[#D6E3DD] rounded shadow-xs', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#587068] font-bold uppercase">
            <span>{tank.code}</span>
            <span>•</span>
            <span>{tank.role}</span>
          </div>
          <CardTitle className="text-sm font-bold text-[#10251F] mt-0.5">
            {tank.name}
          </CardTitle>
        </div>
        <StatusBadge status={tank.status} size="sm" />
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        {/* Calibrated Level Gauge Container */}
        <div className="flex items-center gap-4">
          <div className="relative h-28 w-16 bg-[#F4F8F5] rounded border border-[#D6E3DD] overflow-hidden flex flex-col justify-end p-0.5">
            {/* Calibration tick marks */}
            <div className="absolute inset-y-0 right-0 w-2 flex flex-col justify-between py-1 text-[8px] font-mono text-[#71877F] select-none pointer-events-none">
              <span className="leading-none border-b border-[#D6E3DD] w-full text-right pr-0.5">100</span>
              <span className="leading-none border-b border-[#D6E3DD] w-full text-right pr-0.5">75</span>
              <span className="leading-none border-b border-[#D6E3DD] w-full text-right pr-0.5">50</span>
              <span className="leading-none border-b border-[#D6E3DD] w-full text-right pr-0.5">25</span>
              <span className="leading-none text-right pr-0.5">0</span>
            </div>

            {/* Liquid Fill Block */}
            <div
              className={cn(
                'w-full transition-all duration-300 rounded-xs',
                getLevelColor(tank.percentage, tank.status)
              )}
              style={{ height: `${Math.max(2, tank.percentage)}%` }}
            />

            {/* Overlay percentage */}
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-[#10251F] bg-white/60 px-1 py-0.5 rounded">
              {tank.percentage}%
            </div>
          </div>

          {/* Metric Details */}
          <div className="flex-1 space-y-2">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono tabular-nums text-[#5494DA] tracking-tight">
                  {tank.currentQuantity.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-[#587068]">
                  / {tank.capacity.toFixed(1)} L
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#587068]">
                Ullage: {(tank.capacity - tank.currentQuantity).toFixed(1)} L free
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-[#E5EEE9] font-mono">
              <div className="text-[#3F514B]">
                In: <span className="font-semibold text-[#18A878]">{tank.inflowRate} L/m</span>
              </div>
              <div className="text-[#3F514B]">
                Out: <span className="font-semibold text-[#10251F]">{tank.outflowRate} L/m</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#587068] font-mono pt-1">
              <span>Probe: {tank.sensorId}</span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-0.5 text-[#5494DA] hover:text-[#73B9EE] font-semibold cursor-pointer underline underline-offset-2"
              >
                <span>{isExpanded ? 'Hide' : 'Specs'}</span>
                {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Technical Specifications Drawer */}
        {isExpanded && (
          <div className="p-2.5 rounded bg-[#F4F8F5] border border-[#D6E3DD] text-[11px] text-[#587068] space-y-1.5 font-mono animate-in fade-in duration-100">
            <div className="flex justify-between">
              <span>Net Dynamic Balance:</span>
              <span className={cn('font-bold', Number(netFlow) >= 0 ? 'text-[#18A878]' : 'text-[#C94B5B]')}>
                {Number(netFlow) >= 0 ? `+${netFlow}` : netFlow} L/min
              </span>
            </div>
            <div className="flex justify-between">
              <span>Warning Threshold:</span>
              <span>&lt; {tank.warningThreshold}% ({(tank.capacity * (tank.warningThreshold / 100)).toFixed(1)} L)</span>
            </div>
            <div className="flex justify-between">
              <span>Critical Trip Limit:</span>
              <span className="text-[#C94B5B] font-semibold">
                &lt; {tank.criticalThreshold}% ({(tank.capacity * (tank.criticalThreshold / 100)).toFixed(1)} L)
              </span>
            </div>
            <div className="flex justify-between text-[#71877F] pt-1 border-t border-[#D6E3DD]">
              <span>Sensor Protocol:</span>
              <span>RS485 Modbus RTU</span>
            </div>
            {onConfigure && (
              <button
                onClick={() => onConfigure(tank)}
                className="w-full mt-1.5 py-1 text-center bg-white border border-[#D6E3DD] hover:bg-[#F4F8F5] text-[#5494DA] rounded font-sans text-xs cursor-pointer transition-colors"
              >
                Re-calibrate Tank Capacity
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
