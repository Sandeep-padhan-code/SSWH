import React from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  badgeText?: string
  actions?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badgeText,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {badgeText && (
            <span className="font-mono text-[10px] uppercase font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded tracking-wider">
              {badgeText}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
