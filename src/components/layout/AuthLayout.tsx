import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Droplets } from 'lucide-react'
import { LegalModal } from '@/components/common/LegalModal'

export const AuthLayout: React.FC = () => {
  const [legalType, setLegalType] = useState<
    'terms' | 'privacy' | 'compliance' | null
  >(null)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center space-y-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white">
                <Droplets className="h-4.5 w-4.5 text-sky-400" />
              </div>

              <span className="font-bold text-xl tracking-tight text-slate-900">
                WaterWise SCADA
              </span>
            </Link>

            <p className="text-xs text-slate-500 font-mono">
              Industrial Water Lifecycle & Reclamation Management
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
            <Outlet />
          </div>

          {/* Compliance & Legal Footer */}
          <div className="text-center text-xs text-slate-500 space-y-1.5 font-mono">
            <div>Protected by Role-Based Access Control (RBAC).</div>

            <div className="flex items-center justify-center gap-3 text-[11px]">
              <button
                onClick={() => setLegalType('terms')}
                className="text-slate-600 hover:text-slate-900 underline underline-offset-2 cursor-pointer"
              >
                Terms of Service
              </button>

              <span>•</span>

              <button
                onClick={() => setLegalType('privacy')}
                className="text-slate-600 hover:text-slate-900 underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </button>

              <span>•</span>

              <button
                onClick={() => setLegalType('compliance')}
                className="text-slate-600 hover:text-slate-900 underline underline-offset-2 cursor-pointer"
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