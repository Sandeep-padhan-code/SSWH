import React from 'react'
import { Card, CardContent } from './Card'
import { Button } from './Button'
import { CheckCircle2, MapPin } from 'lucide-react'
import { Alert } from '@/types'
import { cn } from '@/utils/cn'

export interface AlertCardProps {
  alert: Alert
  onResolve?: (id: string) => void
  className?: string
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onResolve, className }) => {
  const severityBorders = {
    CRITICAL: 'border-l-4 border-l-[#C94B5B]',
    WARNING: 'border-l-4 border-l-[#D99024]',
    INFO: 'border-l-4 border-l-[#4FA3A5]',
  }

  const borderClass = severityBorders[alert.severity] || severityBorders.INFO

  return (
    <Card className={cn('bg-white border border-[#D6E3DD] rounded', borderClass, className)}>
      <CardContent className="p-3.5 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-[#587068] font-bold">{alert.id}</span>
              <span
                className={cn(
                  'text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase',
                  alert.severity === 'CRITICAL'
                    ? 'bg-[#FEF0F2] text-[#C94B5B] border border-[#F5C6CC]'
                    : alert.severity === 'WARNING'
                    ? 'bg-[#FEF4E0] text-[#D99024] border border-[#F9DFA5]'
                    : 'bg-[#EAF4F4] text-[#0B6B73] border border-[#B2D8DB]'
                )}
              >
                {alert.severity}
              </span>
              <span className="text-[10px] font-mono text-[#587068] bg-[#F4F8F5] border border-[#D6E3DD] px-1.5 py-0.2 rounded">
                {alert.category}
              </span>
              <span className="text-[10px] font-mono text-[#71877F]">• {alert.timestamp}</span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-[#10251F]">{alert.title}</h4>
            <p className="text-xs text-[#3F514B] leading-normal">{alert.description}</p>

            <div className="pt-1.5 flex flex-wrap gap-4 text-[10px] font-mono text-[#587068]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#71877F]" />
                <span>{alert.location}</span>
              </span>
              <span>Source: <strong className="text-[#10251F]">{alert.source}</strong></span>
            </div>
          </div>

          <div className="flex items-center sm:self-center shrink-0">
            {alert.isResolved ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#0F4D3A] bg-[#DCEAE4] px-2 py-0.5 rounded border border-[#B8D4C8]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#18A878]" /> Resolved
              </span>
            ) : onResolve ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onResolve(alert.id)}
                className="text-xs"
              >
                Acknowledge / Clear
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
