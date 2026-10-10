import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Database, Droplet, Recycle, Cpu } from 'lucide-react'

export const PlatformArchitecture: React.FC = () => {
  const subsystems = [
    {
      num: '01',
      title: 'Sensor Matrix & Telemetry',
      category: 'MODBUS RTU / MQTT PROTOCOL',
      description:
        'Continuous industrial-grade monitoring of pH, Turbidity, Dissolved Oxygen, Total Dissolved Solids, and high-precision fluid velocity across all capture nodes.',
      linkPath: '/monitoring',
      linkText: 'Inspect Live Sensors',
      icon: Activity,
    },
    {
      num: '02',
      title: 'Reservoirs & Catchment Manifolds',
      category: 'HYDROLOGICAL CAPACITANCE',
      description:
        'Multi-chamber atmospheric rainwater storage infrastructure with automated motorized valves, sediment settlement separators, and intelligent level balancing.',
      linkPath: '/tanks',
      linkText: 'View Reservoir Topology',
      icon: Database,
    },
    {
      num: '03',
      title: 'Closed-Loop Treatment & Potability',
      category: 'MULTI-BARRIER PURIFICATION',
      description:
        'Multi-stage filtration including sediment interception, activated carbon absorption, inline ultraviolet (UV) sterilization, and water quality parameter tracking.',
      linkPath: '/water-quality',
      linkText: 'Verify Water Purity',
      icon: Droplet,
    },
    {
      num: '04',
      title: 'Subterranean Aquifer Recharge',
      category: 'ECOLOGICAL GROUNDWATER INJECTION',
      description:
        'Gravity-assisted deep percolation wells and permeable bioremediation trenches designed to restore depleted regional water tables with purified excess rainwater.',
      linkPath: '/recharge',
      linkText: 'Examine Recharge Cycles',
      icon: Recycle,
    },
    {
      num: '05',
      title: 'AI Anomaly Detection & Insights',
      category: 'NEURAL PRECIPITATION MODELING',
      description:
        'Acoustic leak pinpointing and predictive rainfall catchment forecasting utilizing local meteorological radar data and hydrological machine learning inference.',
      linkPath: '/ai-insights',
      linkText: 'Open Predictive Engine',
      icon: Cpu,
    },
  ]

  return (
    <section id="architecture" className="relative z-10 bg-[#060c0e] py-20 lg:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[#5494DA] font-mono text-[11px] uppercase tracking-[0.2em] mb-3">
            <span>// ARCHITECTURAL FOUNDATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">
            Engineered for zero-waste hydrological sovereignty.
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            SSWH unifies physical hydraulics and SCADA automation into a single cohesive control framework. Every drop captured from precipitation, industrial effluent, or greywater is accounted for, treated, and directed to purposeful reuse.
          </p>
        </div>

        {/* Subsystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subsystems.map((sub, idx) => {
            const Icon = sub.icon
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-8 bg-slate-950/60 border border-white/10 hover:border-[#5494DA]/50 transition-all duration-300 rounded-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl text-[#5494DA]/80 font-light">
                      {sub.num}
                    </span>
                    <div className="p-2 rounded bg-white/5 text-slate-400 group-hover:text-[#73B9EE] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#73B9EE] mb-2">
                    {sub.category}
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal tracking-tight mb-3">
                    {sub.title}
                  </h3>

                  <p className="font-sans text-sm text-slate-400 leading-relaxed font-light mb-6">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    to={sub.linkPath}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.16em] uppercase text-white group-hover:text-[#73B9EE] transition-colors"
                  >
                    <span>{sub.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#5494DA]" />
                  </Link>
                </div>
              </div>
            )
          })}

          {/* Direct CTA card to existing dashboard */}
          <div className="flex flex-col justify-between p-8 bg-gradient-to-br from-[#5494DA]/20 via-slate-950/80 to-black border border-[#5494DA]/30 rounded-sm">
            <div>
              <span className="font-serif text-3xl text-[#73B9EE] font-light">
                06
              </span>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#86CEFA] mt-6 mb-2">
                UNIFIED OPERATIONS
              </div>
              <h3 className="font-serif text-2xl text-white font-normal tracking-tight mb-3">
                Command Center SCADA
              </h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed font-light mb-6">
                Direct access to the operational dashboard featuring water flow diagrams, active alert mitigation, tank volume tracking, and compliance logs.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                to="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#5494DA] hover:bg-[#73B9EE] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-sm transition-all duration-300 shadow-md shadow-[#5494DA]/25"
              >
                <span>ENTER COMMAND CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
