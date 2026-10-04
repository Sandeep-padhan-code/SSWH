import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { DemoBadge } from './DemoBadge'
import { LoadingState } from './LoadingState'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { cn } from '@/utils/cn'

export interface ChartCardProps {
  title: string
  subtitle?: string
  badgeText?: string
  actions?: React.ReactNode
  isLoading?: boolean
  isEmpty?: boolean
  error?: string
  onRetry?: () => void
  children?: React.ReactNode
  className?: string
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  badgeText = 'SIMULATED DATA',
  actions,
  isLoading = false,
  isEmpty = false,
  error,
  onRetry,
  children,
  className,
}) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
            {badgeText && <DemoBadge label={badgeText} size="sm" />}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <LoadingState height="h-64" />
        ) : error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : isEmpty ? (
          <EmptyState height="h-64" />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
