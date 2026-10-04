import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export const DetailSheet = ({ title, eyebrow = 'Details', onClose, children }: { title: string; eyebrow?: string; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => { const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [onClose])
  return <div className="fixed inset-0 z-[60]">
    <button onClick={onClose} className="absolute inset-0 bg-[#10231F]/30 backdrop-blur-[1px]" aria-label="Close details" />
    <aside role="dialog" aria-modal="true" aria-label={title} className="absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl">
      <header className="flex items-start justify-between border-b border-[#DDE6E2] px-6 py-5"><div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63736E]">{eyebrow}</p><h2 className="mt-1 text-xl font-semibold text-[#10231F]">{title}</h2></div><button onClick={onClose} className="rounded-md p-2 text-[#63736E] hover:bg-[#F7F9F8]" aria-label="Close"><X className="h-5 w-5" /></button></header>
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </aside>
  </div>
}
