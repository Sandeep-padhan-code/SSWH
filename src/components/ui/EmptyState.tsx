import React from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  action?: React.ReactNode
  className?: string
  height?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are no active records found for this view or filter.',
  icon: Icon = Inbox,
  action,
  className,
  height = 'h-48',
}) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center p-6 text-center rounded bg-white border border-slate-200',
        height,
        className
      )}
    >
      <div className="p-2 rounded bg-slate-100 text-slate-500 mb-2">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-xs font-bold text-slate-800 tracking-tight">{title}</h4>
      <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
