import React, { useState } from 'react'
import { RotateCw, CornerDownLeft, Sparkles, ShieldCheck } from 'lucide-react'
import { mentorsData, Mentor } from '@/data/mentorData'

export const MentorsSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})

  const handleCardToggle = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardToggle(id)
    }
  }

  return (
    <section
      id="mentors"
      className="relative z-10 bg-[#05090b] py-20 lg:py-28 border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Ambient Background Depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Introduction */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-[0.2em] mb-3">
            <span>// THE GUIDING MINDS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">
            Guided by experience. Driven by purpose.
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Visionary leadership and seasoned technical advisory steering SSWH from research innovation to municipal-scale intelligent water infrastructure.
          </p>
        </div>

        {/* Two Equal Vertical Halves (50% / 50% split on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10 border border-white/10 bg-slate-950/40 rounded-sm overflow-hidden backdrop-blur-sm shadow-2xl">
          {mentorsData.map((mentor: Mentor) => {
            const isFlipped = !!flippedCards[mentor.id]

            return (
              <div
                key={mentor.id}
                className="perspective-1200 w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] p-4 sm:p-6 lg:p-8 flex flex-col"
              >
                {/* 3D Flip Card Container */}
                <div
                  className={`relative w-full flex-1 rounded-sm transform-style-3d transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* ==================================================== */}
                  {/* FRONT SIDE (Full-Color Portrait & Identity) */}
                  {/* ==================================================== */}
                  <div
                    tabIndex={isFlipped ? -1 : 0}
                    role="button"
                    aria-label={`View profile of ${mentor.name}, ${mentor.role}. Click or press Enter to flip card.`}
                    aria-expanded={isFlipped}
                    onClick={() => handleCardToggle(mentor.id)}
                    onKeyDown={(e) => handleKeyDown(e, mentor.id)}
                    className="backface-hidden absolute inset-0 w-full h-full rounded-sm overflow-hidden border border-white/10 hover:border-emerald-500/40 bg-slate-950 flex flex-col justify-between p-6 sm:p-8 cursor-pointer transition-all duration-300 group select-none shadow-lg"
                  >
                    {/* Background Photograph — FULL COLOR at all times, no grayscale filter */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={mentor.image}
                        alt={`${mentor.name} - ${mentor.role}`}
                        className="w-full h-full object-cover object-top brightness-[0.96] contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Cinematic Multi-Layer Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05090b] via-[#05090b]/35 to-transparent z-10" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#05090b]/75 via-transparent to-[#05090b]/80 z-10" />
                    </div>

                    {/* Front Top Bar: Small Label */}
                    <div className="relative z-20 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300 font-semibold">
                          {mentor.label}
                        </span>
                      </div>
                    </div>

                    {/* Front Bottom Bar: Name, Role & Interaction Indicator */}
                    <div className="relative z-20 space-y-4 pt-8">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-1">
                          {mentor.role}
                        </div>
                        <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                          {mentor.name}
                        </h3>
                      </div>

                      {/* Flip Prompt Trigger */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300 group-hover:text-emerald-200 tracking-wider transition-colors">
                          <span className="uppercase tracking-[0.16em] font-medium text-[11px]">
                            VIEW PROFILE
                          </span>
                          <RotateCw className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase hidden sm:inline-block">
                          CLICK TO FLIP
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================== */}
                  {/* BACK SIDE (Structured Profile & Placeholders) */}
                  {/* ==================================================== */}
                  <div
                    tabIndex={isFlipped ? 0 : -1}
                    role="region"
                    aria-label={`Detailed profile and credentials for ${mentor.name}`}
                    className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-sm overflow-y-auto border border-emerald-500/30 bg-gradient-to-br from-[#061410] via-[#05090b] to-[#040809] flex flex-col justify-between p-6 sm:p-8 shadow-2xl select-text"
                  >
                    {/* Technical Corner Accents */}
                    <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-500/30 pointer-events-none select-none">
                      +
                    </div>
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-emerald-500/30 pointer-events-none select-none">
                      +
                    </div>
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono text-emerald-500/30 pointer-events-none select-none">
                      +
                    </div>
                    <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-500/30 pointer-events-none select-none">
                      +
                    </div>

                    <div className="space-y-5">
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-1 rounded-sm border border-emerald-500/30">
                          {mentor.label}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>SSWH OVERSIGHT</span>
                        </div>
                      </div>

                      {/* Mentor Identity */}
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-0.5">
                          {mentor.name}
                        </h3>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300 font-medium">
                          {mentor.role}
                        </p>
                      </div>

                      {/* Section 1: DESCRIPTION */}
                      <div className="pt-2 border-t border-white/10">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-1.5">
                          DESCRIPTION
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                          {mentor.description}
                        </p>
                        {/* <!-- DESCRIPTION_PLACEHOLDER --> */}
                      </div>

                      {/* Section 2: EXPERTISE */}
                      <div className="pt-2 border-t border-white/10">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-1.5">
                          EXPERTISE
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                          {mentor.expertise}
                        </p>
                        {/* <!-- EXPERTISE_PLACEHOLDER --> */}
                      </div>

                      {/* Section 3: EXPERIENCE */}
                      <div className="pt-2 border-t border-white/10">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-1.5">
                          EXPERIENCE
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                          {mentor.experience}
                        </p>
                        {/* <!-- EXPERIENCE_PLACEHOLDER --> */}
                      </div>
                    </div>

                    {/* Back Footer: Return Action */}
                    <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => handleCardToggle(mentor.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleCardToggle(mentor.id)
                          }
                        }}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white/5 hover:bg-emerald-950/50 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer group"
                        aria-label={`Return to front view of ${mentor.name}`}
                      >
                        <CornerDownLeft className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
                        <span>BACK TO PROFILE</span>
                      </button>

                      <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>EDITORIAL PROFILE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
