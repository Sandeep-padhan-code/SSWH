import React from 'react'
import { AlertOctagon, RotateCcw } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/utils/cn'

export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Telemetry Stream Fault',
  message = 'Failed to poll telemetry bus. Verify microcontroller connection and retry.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center p-6 text-center rounded bg-rose-50 border border-rose-200',
        className
      )}
    >
      <div className="p-2 rounded bg-rose-100 text-rose-700 mb-2">
        <AlertOctagon className="h-5 w-5" />
      </div>
      <h4 className="text-xs font-bold text-rose-950 tracking-tight">{title}</h4>
      <p className="text-[11px] text-rose-800 max-w-sm mt-0.5">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-3 text-xs border-rose-300 text-rose-900 hover:bg-rose-100"
        >
          <RotateCcw className="h-3 w-3 mr-1" /> Re-poll Bus
        </Button>
      )}
    </div>
  )
}
