import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { LineChart, ShieldCheck } from 'lucide-react'
import { MLInsight } from '@/types'
import { cn } from '@/utils/cn'

export interface InsightCardProps {
  insight: MLInsight
  className?: string
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, className }) => {
  return (
    <Card className={cn('bg-white border border-[#D6E3DD] rounded', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="font-bold text-[#5494DA] bg-[#EAF3FD] border border-[#D1E2F5] px-1.5 py-0.2 rounded">
                {insight.id}
              </span>
              <span className="text-[#4A637D]">• {insight.targetArea}</span>
            </div>
            <CardTitle className="text-xs sm:text-sm font-bold text-[#0E1B2A] mt-1">
              {insight.title}
            </CardTitle>
            <div className="text-[11px] text-[#4A637D] font-mono mt-0.5">
              Algorithm: {insight.modelName}
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-[#5494DA] bg-[#EAF3FD] border border-[#D1E2F5] px-2 py-0.5 rounded">
            {insight.confidencePercent}% Confidence
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        <div className="p-2.5 rounded bg-[#F4F8FB] border border-[#D1E2F5] text-xs text-[#4A637D] space-y-1">
          <div className="font-semibold text-[#0E1B2A] flex items-center gap-1.5 text-xs">
            <LineChart className="h-3.5 w-3.5 text-[#73B9EE]" />
            Operational Recommendation:
          </div>
          <p className="text-[11px] text-[#4A637D] leading-normal">{insight.recommendation}</p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#4A637D] pt-1 border-t border-[#E4EFFB]">
          <span>Forecast Horizon: {insight.timeHorizon}</span>
          <span className="flex items-center gap-1 text-[#4A637D]">
            <ShieldCheck className="h-3 w-3 text-[#5494DA]" />
            Staged Validation Schema
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
