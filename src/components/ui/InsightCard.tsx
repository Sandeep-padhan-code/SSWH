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
              <span className="font-bold text-[#0F4D3A] bg-[#DCEAE4] border border-[#B8D4C8] px-1.5 py-0.2 rounded">
                {insight.id}
              </span>
              <span className="text-[#587068]">• {insight.targetArea}</span>
            </div>
            <CardTitle className="text-xs sm:text-sm font-bold text-[#10251F] mt-1">
              {insight.title}
            </CardTitle>
            <div className="text-[11px] text-[#587068] font-mono mt-0.5">
              Algorithm: {insight.modelName}
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-[#0F4D3A] bg-[#DCEAE4] border border-[#B8D4C8] px-2 py-0.5 rounded">
            {insight.confidencePercent}% Confidence
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        <div className="p-2.5 rounded bg-[#F4F8F5] border border-[#D6E3DD] text-xs text-[#3F514B] space-y-1">
          <div className="font-semibold text-[#10251F] flex items-center gap-1.5 text-xs">
            <LineChart className="h-3.5 w-3.5 text-[#0B6B73]" />
            Operational Recommendation:
          </div>
          <p className="text-[11px] text-[#587068] leading-normal">{insight.recommendation}</p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#587068] pt-1 border-t border-[#E5EEE9]">
          <span>Forecast Horizon: {insight.timeHorizon}</span>
          <span className="flex items-center gap-1 text-[#3F514B]">
            <ShieldCheck className="h-3 w-3 text-[#0F4D3A]" />
            Staged Validation Schema
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
