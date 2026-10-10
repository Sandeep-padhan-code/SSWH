import React from 'react'
import { X, Shield, CheckCircle } from 'lucide-react'

export interface LegalModalProps {
  type: 'terms' | 'privacy' | 'compliance' | null
  onClose: () => void
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null

  const content = {
    terms: {
      title: 'Terms of Telemetry & Operational Service',
      version: 'Rev. 2026.4',
      date: 'Effective Date: October 1, 2026',
      sections: [
        {
          heading: '1. Industrial Operational Scope',
          body: 'The WaterWise Supervisory Control and Data Acquisition (SCADA) platform manages building hydraulic flows, tank capacities, and sub-metered water distribution. Access is restricted to authorized facility operators, certified municipal engineers, and designated building managers.',
        },
        {
          heading: '2. Safety Interlocks & Manual Override',
          body: 'All automated solenoid valves, thermal sterilization heating elements, and submersible transfer pumps are subject to hardware safety interlocks. Under no circumstances may digital telemetry overrides disable biological thermal protection thresholds (>95°C for 60 seconds) or tank overflow emergency relief paths.',
        },
        {
          heading: '3. Data Retention & Incident Logging',
          body: 'Telemetry samples (flow rates, pressures, chemical quality indices) are retained for 365 days in tamper-evident audit ledgers. Critical alarm trip events are permanently archived in compliance with regional utility regulation codes.',
        },
        {
          heading: '4. Simulation Sandbox Disclaimer',
          body: 'When operating under Simulated Telemetry mode, readings reflect deterministic mathematical models. Actuation commands remain staged and do not energize physical relays until certified hardware handshakes are confirmed.',
        },
      ],
    },
    privacy: {
      title: 'Industrial Telemetry Privacy Policy',
      version: 'Rev. 2026.2',
      date: 'Effective Date: October 1, 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'The system collects telemetry metrics from physical and simulated sensors: volumetric consumption, hydrostatic pressure, pH, TDS, turbidity, and device heartbeats. For multi-tenant buildings, apartment sub-meter data is isolated and accessible only to the specific resident and designated building management.',
        },
        {
          heading: '2. Zero Commercial Data Monetization',
          body: 'Water telemetry and facility consumption profiles are strictly utilized for hydraulic load balancing, leak prevention, and regulatory water accounting. No building occupancy data or water usage patterns are shared with external commercial advertising entities.',
        },
        {
          heading: '3. Role-Based Access Control (RBAC)',
          body: 'Access to system telemetry is compartmentalized into Administrator, Facilities Lead, and Resident privilege levels. All credential authentications and privilege escalations are cryptographically logged.',
        },
      ],
    },
    compliance: {
      title: 'Regulatory Water Standards & Audit Protocol',
      version: 'ISO 14046 / WHO GDWQ 4th Ed.',
      date: 'Standards Compliance Audit',
      sections: [
        {
          heading: 'WHO Guidelines for Drinking-water Quality (4th Edition)',
          body: 'Drinking water distribution parameters adhere strictly to WHO potable benchmarks: pH 6.5–8.5, TDS < 300 mg/L, Turbidity < 1.0 NTU, and Free Residual Chlorine 0.2–0.5 mg/L.',
        },
        {
          heading: 'Thermal Sterilization Protocol',
          body: 'Thermal pasteurization of drinking water requires sustaining > 95°C for at least 60 consecutive seconds prior to dispensing valve clearance.',
        },
        {
          heading: 'EPA WaterSense & Secondary Reuse Safety',
          body: 'Secondary treated effluent (T4) is strictly isolated from potable lines (T2) via physical air gaps and color-coded manifold lines to prevent cross-contamination.',
        },
      ],
    },
  }[type]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-md max-w-2xl w-full border border-slate-200 shadow-lg my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-slate-700" />
            <div>
              <h2 id="legal-modal-title" className="text-sm font-bold text-slate-900">
                {content.title}
              </h2>
              <p className="text-[11px] text-slate-500 font-mono">
                {content.version} • {content.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-600 leading-relaxed">
          {content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="font-bold text-slate-900 text-xs">{sec.heading}</h3>
              <p className="text-slate-600">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <CheckCircle className="h-3.5 w-3.5 text-[#5494DA]" />
            Compliance Verified
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#5494DA] hover:bg-[#73B9EE] text-white rounded text-xs font-medium cursor-pointer transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  )
}
