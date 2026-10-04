import React from 'react'
import { Link } from 'react-router-dom'
import { X, Bell, CheckCircle2, ArrowRight } from 'lucide-react'
import { Alert } from '@/types'
import { cn } from '@/utils/cn'

export interface NotificationPanelProps {
  alerts: Alert[]
  onClose: () => void
  onResolve: (id: string) => void
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  alerts,
  onClose,
  onResolve,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 z-50 animate-in fade-in"
      />

      {/* Slide-out Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white border-l border-slate-200 flex flex-col shadow-lg animate-in slide-in-from-right duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-slate-700" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Incident Alarm Queue</h3>
              <p className="text-[10px] text-slate-500 font-mono">SCADA Telemetry Alerts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Close notification panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No active incidents reported.
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'p-3 rounded border text-xs space-y-1.5',
                  alert.severity === 'CRITICAL'
                    ? 'border-rose-300 bg-rose-50/50'
                    : alert.severity === 'WARNING'
                    ? 'border-amber-300 bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50'
                )}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-semibold text-slate-900 text-xs">
                    {alert.title}
                  </span>
                  <span
                    className={cn(
                      'text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider',
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : alert.severity === 'WARNING'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    )}
                  >
                    {alert.severity}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-normal">{alert.description}</p>

                <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 font-mono">
                  <span>{alert.timestamp}</span>
                  {!alert.isResolved ? (
                    <button
                      onClick={() => onResolve(alert.id)}
                      className="text-slate-900 hover:text-sky-700 font-semibold cursor-pointer underline underline-offset-2"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Log Source: Local SCADA</span>
          <Link
            to="/alerts"
            onClick={onClose}
            className="flex items-center gap-1 font-semibold text-slate-900 hover:text-sky-700"
          >
            <span>Full Incident Log</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </>
  )
}
