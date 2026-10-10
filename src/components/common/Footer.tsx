import React, { useState } from 'react'
import { LegalModal } from './LegalModal'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'

export const Footer: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'compliance' | null>(null)

  return (
    <>
      <footer className="border-t border-[#D6E3DD] bg-white text-[#587068] text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: System Identification & Standards */}
          <div className="flex flex-wrap items-center gap-3 text-[#587068]">
            <img src={sswhLogo} alt="SSWH Logo" className="h-4 w-4 rounded-sm object-contain" />
            <span className="font-semibold text-[#10251F]">SSWH-Smart Sustainable Water Harvesting</span>
            <span className="text-[#D6E3DD]">|</span>
            <span className="font-mono text-[11px] text-[#587068]">Node: SSWH-ALPHA-01 (v3.4.12)</span>
            <span className="text-[#D6E3DD]">|</span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#18A878] bg-[#E4F5EE] px-2 py-0.5 rounded border border-[#BFE7D5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18A878]" />
              <span>WHO / EPA Potable Compliance</span>
            </div>
          </div>

          {/* Right: Operational Governance Links */}
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setLegalType('terms')}
              className="text-[#587068] hover:text-[#5494DA] underline-offset-2 hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-[#D6E3DD]">•</span>
            <button
              onClick={() => setLegalType('privacy')}
              className="text-[#587068] hover:text-[#5494DA] underline-offset-2 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#D6E3DD]">•</span>
            <button
              onClick={() => setLegalType('compliance')}
              className="text-[#587068] hover:text-[#5494DA] underline-offset-2 hover:underline cursor-pointer"
            >
              Audit Protocols
            </button>
          </div>
        </div>
      </footer>

      {legalType && (
        <LegalModal type={legalType} onClose={() => setLegalType(null)} />
      )}
    </>
  )
}
