import React from 'react'
import {
  Building2,
  Home,
  GraduationCap,
  Sprout,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Layers,
} from 'lucide-react'

export const BusinessOpportunity: React.FC = () => {
  const targetGroups = [
    {
      category: 'RESIDENTIAL',
      icon: Home,
      description: 'Single-family homes, housing complexes, and residential gated communities.',
      items: ['Households', 'Residential societies', 'Apartment complexes'],
    },
    {
      category: 'INSTITUTIONAL',
      icon: GraduationCap,
      description: 'Educational campuses, healthcare facilities, and public student housing.',
      items: ['Universities', 'College hostels', 'Hospitals', 'Educational institutions'],
    },
    {
      category: 'INDUSTRIAL & PUBLIC',
      icon: Building2,
      description: 'Manufacturing plants, commercial hubs, municipal bodies, and state facilities.',
      items: ['Industries & factories', 'Municipalities', 'Government organizations'],
    },
    {
      category: 'AGRICULTURAL & RURAL',
      icon: Sprout,
      description: 'Irrigation cooperatives, village rainwater systems, and rural table restoration.',
      items: ['Agricultural farms', 'Rural communities', 'Percolation districts'],
    },
  ]

  const waasAreas = [
    'Hardware deployment & IoT sensor gateways',
    'Cloud monitoring & SCADA platform access',
    'SaaS data analytics & predictive AI models',
    'Scheduled preventive system maintenance',
    'Custom enterprise & municipal dashboards',
    'Water quality compliance & auditing services',
  ]

  return (
    <section id="business" className="relative z-10 bg-[#05090b] py-20 lg:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-[0.2em] mb-3">
            <span>// BUILT FOR REAL-WORLD WATER MANAGEMENT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">
            From water harvesting to intelligent water operations.
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Conventional water harvesting focuses mainly on physical collection and storage. SSWH evolves water harvesting into an intelligent, data-driven operational platform with complete lifecycle management.
          </p>
        </div>

        {/* Target User Groups */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 mb-6">
            PRIMARY TARGET SECTORS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetGroups.map((group, idx) => {
              const Icon = group.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-slate-950/70 border border-white/10 rounded-sm hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">
                        {group.category}
                      </span>
                      <div className="p-2 rounded bg-white/5 text-slate-300">
                        <Icon className="w-4 h-4 text-emerald-300" />
                      </div>
                    </div>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed font-light mb-4">
                      {group.description}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-sans text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Commercial Model & WaaS Direction */}
        <div className="p-8 sm:p-10 bg-slate-950/90 border border-white/10 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-emerald-300 text-xs font-mono uppercase tracking-[0.16em] mb-4">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>COMMERCIAL DIRECTION</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
                Water-as-a-Service (WaaS) Framework
              </h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed font-light mb-4">
                SSWH is designed around a modular model adaptable for varying scales of water infrastructure—from single buildings to district-wide networks.
              </p>
              <div className="p-4 rounded bg-white/5 border border-white/10 flex items-start gap-3 text-xs font-mono text-slate-300">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-300 uppercase font-semibold block mb-1">
                    STATUS: UNDER DEVELOPMENT
                  </span>
                  <span>
                    Commercial pricing models, SLA terms, and tier structures are undergoing validation and system testing.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 mb-4">
                POTENTIAL SERVICE & PLATFORM REVENUE MODULES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {waasAreas.map((area, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded bg-white/5 border border-white/5 text-xs font-sans text-slate-200 flex items-center gap-2.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
