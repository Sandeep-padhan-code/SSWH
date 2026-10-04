import React from 'react'
import { teamMembers, TeamMember } from '@/data/teamData'

export const TeamSection: React.FC = () => {
  // Duplicate team array to create a seamless infinite loop marquee
  const extendedTeam: TeamMember[] = [...teamMembers, ...teamMembers]

  return (
    <section id="team" className="relative z-10 bg-[#05090b] py-20 lg:py-28 border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-[0.2em] mb-3">
            <span>// THE TEAM BEHIND THE SYSTEM</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">
            Built by the team engineering the next generation of water intelligence.
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            A multidisciplinary team combining software, IoT, engineering, research and intelligent water-management systems.
          </p>
        </div>
      </div>

      {/* Automatic Continuous Sliding Carousel Container */}
      <div className="relative w-full overflow-hidden select-none py-2">
        {/* Gradient edge fades for cinematic depth */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#05090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#05090b] to-transparent z-10 pointer-events-none" />

        {/* Continuous Marquee Track */}
        <div className="animate-continuous-marquee flex items-stretch gap-6 px-4">
          {extendedTeam.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] shrink-0 flex flex-col justify-between bg-slate-950/80 border border-white/10 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300 backdrop-blur-sm group"
            >
              <div>
                {/* Card Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-medium bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-500/30">
                    {member.badge || `MEMBER ${member.id}`}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">
                    NODE 0{member.id}
                  </span>
                </div>

                {/* Member Photo Frame */}
                <div className="relative w-full aspect-[4/4.8] rounded-sm overflow-hidden mb-5 bg-slate-900 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover object-top filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                </div>

                {/* Member Meta */}
                <h3 className="font-serif text-2xl text-white font-normal tracking-tight mb-1">
                  {member.name}
                </h3>

                {/* Role Display */}
                <div className="text-xs font-mono uppercase tracking-[0.16em] text-emerald-300 font-semibold mb-3">
                  {member.role}
                </div>

                {/* Technical Skill Tags */}
                {member.tags && member.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono uppercase text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Contribution Description */}
                <p className="font-sans text-xs text-slate-300 leading-relaxed font-light mb-6">
                  {member.contribution}
                </p>
              </div>

              {/* Footer Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>SSWH CORE ENGINEERING</span>
                <span className="text-emerald-400/90 font-medium">VERIFIED CONTRIBUTOR</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
