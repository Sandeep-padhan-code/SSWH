import React from 'react'
import { cn } from '@/utils/cn'

export interface DemoBadgeProps {
  label?: string
  className?: string
  size?: 'sm' | 'md'
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
  label = 'SIMULATED DATA',
  className,
  size = 'md',
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 rounded select-none',
        size === 'sm' ? 'text-[9px] px-1.5 py-0.2' : 'text-[10px] px-2 py-0.5',
        className
      )}
      title="Deterministic telemetry model"
    >
      <span>{label}</span>
    </span>
  )
}
