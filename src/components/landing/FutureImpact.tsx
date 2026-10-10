import React from 'react'
import { CheckCircle2, Clock, Compass, Cpu, HardDrive, ShieldAlert, Sparkles } from 'lucide-react'

export const FutureImpact: React.FC = () => {
  const roadmapPhases = [
    {
      phase: 'PHASE 01',
      title: 'Software SCADA & Telemetry Prototype',
      status: 'IMPLEMENTED',
      statusColor: 'text-[#86CEFA] border-[#5494DA]/30 bg-[#5494DA]/15',
      icon: CheckCircle2,
      points: [
        'Full web-based SCADA interface',
        'Simulated real-time sensor streams',
        'Tank capacity & quality monitoring views',
        'Multi-role access control structure',
      ],
    },
    {
      phase: 'PHASE 02',
      title: 'Physical IoT Hardware Interfacing',
      status: 'UNDER DEVELOPMENT',
      statusColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      icon: Clock,
      points: [
        'Microcontroller (ESP32/STM32) integration',
        'Industrial RS485 Modbus & MQTT gateways',
        'Physical flow, level, and pH sensor calibration',
        'Hardware actuated valve control loops',
      ],
    },
    {
      phase: 'PHASE 03',
      title: 'Autonomous Neural Operations',
      status: 'PLANNED ROADMAP',
      statusColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      icon: Compass,
      points: [
        'Local meteorological radar AI integration',
        'Acoustic leak pinpointing algorithms',
        'District-scale grid water balancing',
        'Carbon footprint & energy optimization',
      ],
    },
  ]

  const impactPoints = [
    {
      title: 'Water Security & Resilience',
      desc: 'Decreasing vulnerability to drought and municipal supply disruptions through localized multi-source harvesting.',
    },
    {
      title: 'Zero-Waste Cycle Efficiency',
      desc: 'Eliminating avoidable storage overflows and undetected leaks through real-time telemetry and automated valves.',
    },
    {
      title: 'Aquifer Restoration',
      desc: 'Returning purified excess rainwater directly to groundwater tables via controlled subterranean injection.',
    },
    {
      title: 'Data Transparency',
      desc: 'Providing audit-ready water quality and volume telemetry to residents, facility managers, and environmental panels.',
    },
  ]

  return (
    <section id="impact" className="relative z-10 bg-[#060c0e] py-20 lg:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[#73B9EE] font-mono text-[11px] uppercase tracking-[0.2em] mb-3">
            <span>// FUTURE DIRECTION & SYSTEM EVOLUTION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">
            The roadmap to full-scale autonomous water infrastructure.
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            SSWH is engineered as a scalable technology stack. Here is the technical progression from current software prototype to full physical hardware implementation.
          </p>
        </div>

        {/* Technical Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {roadmapPhases.map((phase, idx) => {
            const Icon = phase.icon
            return (
              <div
                key={idx}
                className="p-6 bg-slate-950/70 border border-white/10 hover:border-[#5494DA]/50 rounded-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                      {phase.phase}
                    </span>
                    <span className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded border ${phase.statusColor}`}>
                      {phase.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-white font-normal mb-4 flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0 text-[#5494DA]" />
                    <span>{phase.title}</span>
                  </h3>

                  <ul className="space-y-2.5 mb-6">
                    {phase.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-sans text-slate-300 font-light">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5494DA] shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>EVOLUTION MILESTONE</span>
                  <span className="text-[#73B9EE]">0{idx + 1}/03</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Real-world Environmental Impact */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-[#5494DA]/15 via-slate-950/80 to-black border border-[#5494DA]/30 rounded-sm">
          <div className="flex items-center gap-2 text-[#73B9EE] font-mono text-[11px] uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-4 h-4 text-[#5494DA]" />
            <span>REAL-WORLD ECOLOGICAL & OPERATIONAL IMPACT</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-8">
            Transforming water harvesting into a measurable environmental asset.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactPoints.map((item, i) => (
              <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-sm">
                <h4 className="font-serif text-lg text-[#86CEFA] font-normal mb-2">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-slate-300 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
