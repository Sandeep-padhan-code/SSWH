import React from 'react'
import { cn } from '@/utils/cn'

export interface LoadingStateProps {
  message?: string
  className?: string
  height?: string
  variant?: 'spinner' | 'skeleton'
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading telemetry & system metrics...',
  className,
  height = 'h-48',
  variant = 'skeleton',
}) => {
  if (variant === 'skeleton') {
    return (
      <div
        className={cn(
          'w-full flex flex-col justify-center p-6 text-slate-500 rounded bg-white border border-slate-200 space-y-3',
          height,
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="h-3.5 bg-slate-200 rounded w-1/4 animate-pulse" />
          <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 bg-slate-100 rounded w-full animate-pulse" />
          <div className="h-2.5 bg-slate-100 rounded w-5/6 animate-pulse" />
          <div className="h-2.5 bg-slate-100 rounded w-2/3 animate-pulse" />
        </div>
        <div className="text-[11px] font-mono text-slate-400 pt-1">
          {message}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center p-6 text-center text-slate-500 rounded bg-white border border-slate-200',
        height,
        className
      )}
    >
      <div className="h-4 w-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin mb-2" />
      <span className="text-xs font-mono text-slate-600">{message}</span>
    </div>
  )
}
