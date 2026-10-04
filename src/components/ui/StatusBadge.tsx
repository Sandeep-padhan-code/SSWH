import React from 'react'
import { StatusSeverity } from '@/types'
import { cn } from '@/utils/cn'

export interface StatusBadgeProps {
  status: StatusSeverity
  label?: string
  className?: string
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
  size = 'md',
}) => {
  const configs: Record<string, { bg: string; defaultLabel: string; dot: string }> = {
    NORMAL: {
      bg: 'bg-[#E4F5EE] border-[#BFE7D5] text-[#18A878]',
      defaultLabel: 'Normal',
      dot: 'bg-[#18A878]',
    },
    WARNING: {
      bg: 'bg-[#FFF3D8] border-[#F3D299] text-[#D99024]',
      defaultLabel: 'Warning',
      dot: 'bg-[#D99024]',
    },
    CRITICAL: {
      bg: 'bg-[#FBE8EB] border-[#F6B6C1] text-[#C94B5B]',
      defaultLabel: 'Critical',
      dot: 'bg-[#C94B5B]',
    },
    INFO: {
      bg: 'bg-[#E3F2F2] border-[#B9DDDD] text-[#0B6B73]',
      defaultLabel: 'Info',
      dot: 'bg-[#0B6B73]',
    },
    OFFLINE: {
      bg: 'bg-[#F4F8F5] border-[#D6E3DD] text-[#71877F]',
      defaultLabel: 'Offline',
      dot: 'bg-[#71877F]',
    },
    SIMULATED: {
      bg: 'bg-[#E3F2F2] border-[#B9DDDD] text-[#0B6B73]',
      defaultLabel: 'Simulated',
      dot: 'bg-[#0B6B73]',
    },
  }

  const current = configs[status] || configs.NORMAL

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border font-mono font-medium rounded select-none',
        current.bg,
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5',
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', current.dot)} aria-hidden="true" />
      <span>{label || current.defaultLabel}</span>
    </span>
  )
}
