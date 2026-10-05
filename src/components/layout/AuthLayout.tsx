import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Droplets, ShieldCheck } from 'lucide-react'
import { LegalModal } from '@/components/common/LegalModal'

export const AuthLayout: React.FC = () => {
  const [legalType, setLegalType] = useState<
    'terms' | 'privacy' | 'compliance' | null
  >(null)

  return (
    <div className="min-h-screen flex flex-col bg-[#050b09] text-slate-100 selection:bg-emerald-400 selection:text-slate-950 relative overflow-hidden">
      {/* Subtle Background Glows & Telemetry Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-teal-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md space-y-6">
          {/* SSWH Top Brand Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-lg bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-400/20 group-hover:scale-105 transition-transform duration-200">
                <Droplets className="h-5 w-5" />
              </div>

              <div className="text-left">
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  SSWH
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  Intelligent Water Harvesting
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 font-sans font-light">
              Save Water Today. Live Life Tomorrow.
            </p>
          </div>

          {/* Auth Card Container */}
          <div className="bg-[#091512]/90 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-6 sm:p-7 shadow-2xl shadow-black/60">
            <Outlet />
          </div>

          {/* Compliance & Security Footer */}
          <div className="text-center text-xs text-slate-400 space-y-2 font-mono">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-400/90">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>RBAC Enforced • End-to-End Telemetry Security</span>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
              <button
                onClick={() => setLegalType('terms')}
                className="hover:text-emerald-300 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>

              <span className="text-slate-600">•</span>

              <button
                onClick={() => setLegalType('privacy')}
                className="hover:text-emerald-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>

              <span className="text-slate-600">•</span>

              <button
                onClick={() => setLegalType('compliance')}
                className="hover:text-emerald-300 transition-colors cursor-pointer"
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