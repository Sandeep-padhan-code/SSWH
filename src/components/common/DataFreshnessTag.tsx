import React from 'react'

interface DataFreshnessTagProps {
  lastUpdated?: Date | string
  status?: 'ONLINE' | 'OFFLINE' | 'SIMULATED' | 'NORMAL' | 'WARNING' | 'CRITICAL'
  showStatusDot?: boolean
  className?: string
}

export const DataFreshnessTag: React.FC<DataFreshnessTagProps> = ({
  lastUpdated,
  status = 'ONLINE',
  showStatusDot = true,
  className = '',
}) => {
  const formatTime = () => {
    if (!lastUpdated) return 'Just now'
    if (typeof lastUpdated === 'string') return lastUpdated
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const isOnline = status === 'ONLINE' || status === 'NORMAL' || status === 'SIMULATED'

  return (
    <div className={`inline-flex items-center gap-2 text-[11px] font-mono text-[#587068] ${className}`}>
      {showStatusDot && (
        <span className="flex items-center gap-1 font-semibold text-[#5494DA]">
          <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-[#18A878] animate-pulse' : 'bg-[#C83D3D]'}`} />
          {isOnline ? 'Online' : 'Offline'}
        </span>
      )}
      <span className="text-[#8AA097]">•</span>
      <span>Updated {formatTime()}</span>
    </div>
  )
}
