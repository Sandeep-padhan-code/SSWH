import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { LegalModal } from '@/components/common/LegalModal'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'

export const AuthLayout: React.FC = () => {
  const [legalType, setLegalType] = useState<
    'terms' | 'privacy' | 'compliance' | null
  >(null)

  return (
    <div className="min-h-screen flex flex-col bg-[#04080e] text-slate-100 selection:bg-[#5494DA] selection:text-white relative overflow-hidden">
      {/* Subtle Background Glows & Telemetry Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#5494DA]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#73B9EE]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#5494DA 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md space-y-6">
          {/* SSWH Top Brand Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={sswhLogo}
                alt="SSWH Logo"
                className="h-11 w-11 rounded-lg object-contain bg-white p-1 shadow-lg shadow-[#5494DA]/25 group-hover:scale-105 transition-transform duration-200"
              />

              <div className="text-left">
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  SSWH
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#73B9EE] font-semibold">
                  SSWH-Smart Sustainable Water Harvesting
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 font-sans font-light">
              Save Water Today. Live Life Tomorrow.
            </p>
          </div>

          {/* Auth Card Container */}
          <div className="bg-[#07101a]/90 backdrop-blur-xl border border-[#5494DA]/30 rounded-xl p-6 sm:p-7 shadow-2xl shadow-black/60">
            <Outlet />
          </div>

          {/* Compliance & Security Footer */}
          <div className="text-center text-xs text-slate-400 space-y-2 font-mono">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5494DA]/10 border border-[#5494DA]/30 text-[11px] text-[#86CEFA]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>RBAC Enforced • End-to-End Telemetry Security</span>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
              <button
                onClick={() => setLegalType('terms')}
                className="hover:text-[#73B9EE] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>

              <span className="text-slate-600">•</span>

              <button
                onClick={() => setLegalType('privacy')}
                className="hover:text-[#73B9EE] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>

              <span className="text-slate-600">•</span>

              <button
                onClick={() => setLegalType('compliance')}
                className="hover:text-[#73B9EE] transition-colors cursor-pointer"
              >
                Audit Standards
              </button>
            </div>
          </div>
        </div>
      </div>

      {legalType && (
        <LegalModal
          type={legalType}
          onClose={() => setLegalType(null)}
        />
      )}
    </div>
  )
}