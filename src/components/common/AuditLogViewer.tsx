import React from 'react'
import { AuditLogEntry } from '@/types'
import { ShieldCheck, ShieldAlert, Clock, User, Cpu } from 'lucide-react'

interface AuditLogViewerProps {
  logs: AuditLogEntry[]
  title?: string
  maxEntries?: number
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({
  logs,
  title = 'SCADA Operational Audit Log',
  maxEntries = 10,
}) => {
  const displayLogs = logs.slice(0, maxEntries)

  return (
    <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E5EEE9] pb-3 mb-4">
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5494DA]">
            Security & Accountability
          </p>
          <h3 className="text-base font-semibold text-[#10231F]">{title}</h3>
        </div>
        <span className="rounded bg-[#5494DA]/10 px-2 py-1 text-[10px] font-mono font-semibold text-[#5494DA] border border-[#5494DA]/20">
          Backend Verified
        </span>
      </div>

      {displayLogs.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#63736E]">No operational audit logs recorded yet.</div>
      ) : (
        <div className="space-y-2.5">
          {displayLogs.map((log) => {
            const isSuccess = log.result === 'SUCCESS'
            const isDenied = log.result === 'DENIED'

            return (
              <div
                key={log.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border text-xs gap-2 ${
                  isDenied
                    ? 'border-[#F0D3D3] bg-[#FFF8F8]'
                    : isSuccess
                    ? 'border-[#E5EEE9] bg-[#F7F9F8]'
                    : 'border-[#F0E0C3] bg-[#FFFDF8]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {isDenied ? (
                      <ShieldAlert className="h-4 w-4 text-[#C83D3D]" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-[#18A878]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-[#10231F] uppercase">{log.action}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                          isDenied
                            ? 'bg-[#C83D3D] text-white'
                            : 'bg-[#18A878]/10 text-[#18A878] border border-[#18A878]/20'
                        }`}
                      >
                        {log.result}
                      </span>
                    </div>
                    <p className="mt-1 text-[#63736E] leading-normal">{log.details}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[#8AA097] font-mono">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.user} ({log.role})
                      </span>
                      <span className="flex items-center gap-1">
                        <Cpu className="h-3 w-3" />
                        {log.device}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 font-mono text-[10px] text-[#63736E] self-end sm:self-center">
                  <Clock className="h-3 w-3" />
                  {log.timestamp}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
