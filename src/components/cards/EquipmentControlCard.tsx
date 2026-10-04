import React from 'react'
import { Activity, Power, Lock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { Permission } from '@/types'

interface EquipmentControlCardProps {
  id: string
  name: string
  type: 'PUMP' | 'VALVE'
  status: 'RUNNING' | 'STOPPED' | 'OPEN' | 'CLOSED'
  flowRate?: number | string
  unit?: string
  powerKw?: number
  positionPercent?: number
  requiredPermission: Permission
  onToggle: () => void
  isDisabled?: boolean
}

export const EquipmentControlCard: React.FC<EquipmentControlCardProps> = ({
  name,
  type,
  status,
  flowRate,
  unit = 'L/min',
  powerKw,
  positionPercent,
  requiredPermission,
  onToggle,
  isDisabled = false,
}) => {
  const { hasPermission } = useAuth()
  const canControl = hasPermission(requiredPermission)
  const isActive = status === 'RUNNING' || status === 'OPEN'

  return (
    <div className="rounded-xl border border-[#DDE6E2] bg-white p-5 shadow-xs transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`rounded-lg p-2.5 ${
              isActive
                ? 'bg-[#E8F5F0] text-[#075B48]'
                : 'bg-[#F7F9F8] text-[#63736E]'
            }`}
          >
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#10231F]">{name}</h4>
            <span className="text-[10px] font-mono text-[#587068] uppercase">
              {type} • Telemetry Sensor Attached
            </span>
          </div>
        </div>

        <span
          className={`flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
            isActive
              ? 'bg-[#E8F5F0] text-[#075B48] border border-[#D6E3DD]'
              : 'bg-[#F7F9F8] text-[#63736E] border border-[#DDE6E2]'
          }`}
        >
          {isActive ? (
            <CheckCircle2 className="h-3 w-3 text-[#075B48]" />
          ) : (
            <AlertCircle className="h-3 w-3 text-[#63736E]" />
          )}
          {status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#F7F9F8] p-3 text-xs">
        {flowRate !== undefined && (
          <div>
            <span className="text-[#63736E]">Flow Telemetry</span>
            <p className="font-mono font-bold text-[#10231F]">
              {flowRate} {unit}
            </p>
          </div>
        )}
        {powerKw !== undefined && (
          <div>
            <span className="text-[#63736E]">Power Load</span>
            <p className="font-mono font-bold text-[#10231F]">{powerKw} kW</p>
          </div>
        )}
        {positionPercent !== undefined && (
          <div>
            <span className="text-[#63736E]">Valve Open</span>
            <p className="font-mono font-bold text-[#10231F]">{positionPercent}%</p>
          </div>
        )}
        <div>
          <span className="text-[#63736E]">Control Mode</span>
          <p className="font-mono font-bold text-[#075B48]">REMOTE AUTO</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E5EEE9] flex items-center justify-between">
        {canControl ? (
          <button
            onClick={onToggle}
            disabled={isDisabled}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-white transition-colors cursor-pointer ${
              isActive
                ? 'bg-[#C83D3D] hover:bg-[#A82D2D]'
                : 'bg-[#075B48] hover:bg-[#054436]'
            }`}
          >
            <Power className="h-3.5 w-3.5" />
            {type === 'PUMP'
              ? isActive
                ? 'STOP PUMP'
                : 'START PUMP'
              : isActive
              ? 'CLOSE VALVE'
              : 'OPEN VALVE'}
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#F7F9F8] border border-[#DDE6E2] py-2 text-xs text-[#63736E]">
            <Lock className="h-3.5 w-3.5 text-[#8AA097]" />
            <span>Control Restricted (SCADA Only)</span>
          </div>
        )}
      </div>
    </div>
  )
}
