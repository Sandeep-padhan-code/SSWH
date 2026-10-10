import React from 'react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Cpu,
  Droplet,
  Gauge,
  Layers,
  Radio,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export const SystemCapabilities: React.FC = () => {
  const waterSources = [
    {
      title: 'Rainwater Capture',
      desc: 'Atmospheric precipitation collection, roof runoff filtration, and settlement tank monitoring.',
      status: 'PROTOTYPE SIMULATED',
      icon: Droplet,
    },
    {
      title: 'Underground Aquifer',
      desc: 'Subterranean well depth tracking, static water table measurements, and controlled abstraction.',
      status: 'PLANNED INTEGRATION',
      icon: Layers,
    },
    {
      title: 'Municipal Supply',
      desc: 'City grid inlet metering, pressure stabilization, and emergency mains intake balancing.',
      status: 'DESIGNED FEATURE',
      icon: Activity,
    },
  ]

  const capabilities = [
    {
      icon: Radio,
      title: 'Real-Time Operational Telemetry',
      description:
        'Continuous multi-point data acquisition across flow meters, pressure sensors, and level transducers.',
      badge: 'PROTOTYPE DEMO',
    },
    {
      icon: AlertTriangle,
      title: 'Leakage & Overflow Detection',
      description:
        'Differential pressure anomaly analysis and automated valve shut-off triggers to mitigate wastage.',
      badge: 'DESIGNED CAPABILITY',
    },
    {
      icon: Gauge,
      title: 'Smart Flow & Pressure Management',
      description:
        'Variable speed pump modulation and zone pressure regulation to optimize energy and fluid velocity.',
      badge: 'UNDER DEVELOPMENT',
    },
    {
      icon: Droplet,
      title: 'Water Quality Telemetry',
      description:
        'In-line sensor monitoring for pH, Turbidity, TDS, and Dissolved Oxygen before distribution.',
      badge: 'PROTOTYPE SIMULATED',
    },
    {
      icon: Cpu,
      title: 'Predictive Neural Analytics',
      description:
        'Machine learning models trained to anticipate demand surges based on weather forecasts and usage history.',
      badge: 'FUTURE ROADMAP',
    },
    {
      icon: BarChart3,
      title: 'Centralized Visibility Hub',
      description:
        'Unified dashboard interface bringing storage capacity, usage analytics, and alert histories into one pane.',
      badge: 'OPERATIONAL UI',
    },
  ]

  return (
    <section id="capabilities" className="relative z-10 bg-[#060c0e] py-20 lg:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[#5494DA] font-mono text-[11px] uppercase tracking-[0.2em] mb-3">
            <span>// SYSTEM CAPABILITY EXPLANATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">
            Solving critical inefficiencies across the complete water cycle.
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Traditional water harvesting systems collect water but offer minimal real-time visibility. SSWH bridges hardware and software to provide end-to-end monitoring, automated distribution, and leak prevention.
          </p>
        </div>

        {/* 3 Water Sources Grid */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {waterSources.map((source, i) => {
            const Icon = source.icon
            return (
              <div
                key={i}
                className="p-6 bg-slate-950/80 border border-white/10 rounded-sm hover:border-[#5494DA]/35 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded bg-[#5494DA]/10 text-[#5494DA] border border-[#5494DA]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#73B9EE] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {source.status}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-white font-normal mb-2">
                  {source.title}
                </h3>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  {source.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-6 bg-slate-950/60 border border-white/10 hover:border-[#5494DA]/50 rounded-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded bg-white/5 text-slate-300">
                      <Icon className="w-4 h-4 text-[#5494DA]" />
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.16em] uppercase text-slate-400">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-white font-normal mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#73B9EE]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>DESIGN SPECIFICATION</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
