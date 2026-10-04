import React from 'react'
import { AlertTriangle, X, ShieldAlert } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  actionLabel: string
  deviceLabel: string
  isDangerous?: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  actionLabel,
  deviceLabel,
  isDangerous = true,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#10251F]/40 backdrop-blur-xs transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-xl border border-[#DDE6E2] bg-white p-6 shadow-2xl transition-all"
      >
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-md p-1 text-[#63736E] hover:bg-[#F4F8F5]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`rounded-full p-3 ${
              isDangerous ? 'bg-[#FFF2F2] text-[#C83D3D]' : 'bg-[#E8F5F0] text-[#075B48]'
            }`}
          >
            {isDangerous ? <AlertTriangle className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#10231F]">{title}</h3>
            <p className="mt-1 text-xs font-mono font-medium text-[#075B48]">
              Target Equipment: <span className="text-[#10231F] font-bold">{deviceLabel}</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#63736E]">{message}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#F7F9F8] p-3 border border-[#E5EEE9] text-[11px] text-[#587068] font-mono flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-[#075B48] shrink-0" />
          <span>This action will be authorized and recorded in the SCADA audit log.</span>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border border-[#DDE6E2] bg-white px-4 py-2 text-xs font-medium text-[#3F514B] hover:bg-[#F7F9F8]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors ${
              isDangerous
                ? 'bg-[#C83D3D] hover:bg-[#A82D2D]'
                : 'bg-[#075B48] hover:bg-[#054436]'
            }`}
          >
            {isLoading ? 'Executing API Action...' : actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
