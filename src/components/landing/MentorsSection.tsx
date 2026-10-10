import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, ShieldCheck } from 'lucide-react'
import { mentorsData, Mentor } from '@/data/mentorData'

export const MentorsSection: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<'director' | 'mentor' | null>(null)

  const director: Mentor | undefined =
    mentorsData.find((m) => m.role.toLowerCase() === 'director') || mentorsData[0]
  const mentor: Mentor | undefined =
    mentorsData.find((m) => m.role.toLowerCase() === 'mentor') || mentorsData[1]

  if (!director && !mentor) return null

  const handleToggle = (type: 'director' | 'mentor') => {
    setActiveProfile((prev) => (prev === type ? null : type))
  }

  const handleClose = () => {
    setActiveProfile(null)
  }

  return (
    <section
      id="mentors"
      className="relative z-10 overflow-hidden border-b border-white/10 bg-[#05090b] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#5494DA]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#73B9EE]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5494DA]">
            <span>// THE GUIDING MINDS</span>
          </div>

          <h2 className="mb-5 font-serif text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl">
            Guided by experience. Driven by purpose.
          </h2>

          <p className="font-sans text-base font-light leading-relaxed text-slate-300 sm:text-lg">
            Visionary leadership and technical guidance steering SSWH toward intelligent water infrastructure.
          </p>
        </div>

        {/* STATE 1: BOTH PORTRAITS BALANCED SIDE-BY-SIDE */}
        {activeProfile === null && director && mentor && (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 transition-all duration-500">
            {/* Director Card */}
            <div className="overflow-hidden rounded-sm border border-white/10 bg-slate-950/50 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-[#5494DA]/35">
              <button
                type="button"
                onClick={() => handleToggle('director')}
                aria-expanded={false}
                aria-controls="director-profile-panel"
                aria-label={`View ${director.name}'s Director profile`}
                className="group relative block h-[520px] w-full cursor-pointer overflow-hidden bg-slate-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5494DA] md:h-[620px]"
              >
                <img
                  src={director.image}
                  alt={`${director.name} — ${director.role}`}
                  className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.96] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05090b] via-[#05090b]/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05090b]/70 via-transparent to-[#05090b]/70" />

                <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-[#5494DA]/30 bg-slate-950/85 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#73B9EE] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5494DA]" />
                    {director.label}
                  </span>

                  <span className="rounded-sm border border-white/15 bg-black/40 p-2 text-[#73B9EE] backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pt-16 sm:p-8">
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                    {director.role}
                  </p>

                  <h3 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
                    {director.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#86CEFA]">
                      CLICK TO VIEW PROFILE
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                      SSWH LEADERSHIP
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Mentor Card */}
            <div className="overflow-hidden rounded-sm border border-white/10 bg-slate-950/50 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-[#5494DA]/35">
              <button
                type="button"
                onClick={() => handleToggle('mentor')}
                aria-expanded={false}
                aria-controls="mentor-profile-panel"
                aria-label={`View ${mentor.name}'s Mentor profile`}
                className="group relative block h-[520px] w-full cursor-pointer overflow-hidden bg-slate-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5494DA] md:h-[620px]"
              >
                <img
                  src={mentor.image}
                  alt={`${mentor.name} — ${mentor.role}`}
                  className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.96] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05090b] via-[#05090b]/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05090b]/70 via-transparent to-[#05090b]/70" />

                <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-[#5494DA]/30 bg-slate-950/85 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#73B9EE] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5494DA]" />
                    {mentor.label}
                  </span>

                  <span className="rounded-sm border border-white/15 bg-black/40 p-2 text-[#73B9EE] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-x-1">
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pt-16 sm:p-8">
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                    {mentor.role}
                  </p>

                  <h3 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
                    {mentor.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#86CEFA]">
                      CLICK TO VIEW PROFILE
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                      SSWH LEADERSHIP
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STATE 2: DIRECTOR EXPANDED (Opens to the right) */}
        {activeProfile === 'director' && director && (
          <div className="mx-auto flex max-w-6xl flex-col items-stretch overflow-hidden rounded-sm border border-white/10 bg-slate-950/50 shadow-2xl backdrop-blur-sm md:flex-row transition-all duration-700">
            {/* Director Portrait (Smaller width on desktop) */}
            <button
              type="button"
              onClick={handleClose}
              aria-expanded={true}
              aria-controls="director-profile-panel"
              aria-label={`Close ${director.name}'s Director profile`}
              className="group relative block min-h-[480px] w-full shrink-0 cursor-pointer overflow-hidden bg-slate-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5494DA] md:min-h-[620px] md:w-[380px] lg:w-[420px] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <img
                src={director.image}
                alt={`${director.name} — ${director.role}`}
                className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.96] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#05090b] via-[#05090b]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#05090b]/70 via-transparent to-[#05090b]/70" />

              <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
                <span className="inline-flex items-center gap-2 rounded-sm border border-[#5494DA]/30 bg-slate-950/85 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#73B9EE] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5494DA]" />
                  {director.label}
                </span>

                <span className="rounded-sm border border-white/15 bg-black/40 p-2 text-[#73B9EE] backdrop-blur-sm transition-transform duration-500 group-hover:-translate-x-1">
                  <ChevronLeft className="h-4 w-4" />
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pt-16 sm:p-8">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                  {director.role}
                </p>

                <h3 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
                  {director.name}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#86CEFA]">
                    CLICK TO CLOSE
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                    SSWH LEADERSHIP
                  </span>
                </div>
              </div>
            </button>

            {/* Sliding Director Profile Panel (Revealed to the right) */}
            <div
              id="director-profile-panel"
              className="flex-1 min-w-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div className="flex h-full min-w-0 flex-col justify-between bg-gradient-to-br from-[#08121f] via-[#05090b] to-[#040809] p-6 sm:p-8 lg:p-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <span className="rounded-sm border border-[#5494DA]/30 bg-[#5494DA]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#73B9EE]">
                      {director.label}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#5494DA]" />
                      <span>SSWH OVERSIGHT</span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#86CEFA]">
                      {director.role}
                    </p>

                    <h3 className="font-serif text-2xl font-normal tracking-tight text-white sm:text-3xl">
                      {director.name}
                    </h3>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                      DESCRIPTION
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-200">
                      {director.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                      EXPERTISE
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-300">
                      {director.expertise}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                      EXPERIENCE
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-300">
                      {director.experience}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] text-slate-500">
                    <Sparkles className="h-3 w-3 text-[#5494DA]" />
                    DIRECTOR PROFILE
                  </span>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-slate-200 transition-colors hover:border-[#5494DA]/40 hover:bg-[#5494DA]/20 hover:text-[#73B9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5494DA]"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Close profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: MENTOR EXPANDED (Opens to the left, panel on left, portrait on right) */}
        {activeProfile === 'mentor' && mentor && (
          <div className="mx-auto flex max-w-6xl flex-col items-stretch overflow-hidden rounded-sm border border-white/10 bg-slate-950/50 shadow-2xl backdrop-blur-sm md:flex-row transition-all duration-700">
            {/* Sliding Mentor Profile Panel (On desktop placed on LEFT, revealing right-to-left) */}
            <div
              id="mentor-profile-panel"
              className="order-2 md:order-1 flex-1 min-w-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div className="flex h-full min-w-0 flex-col justify-between bg-gradient-to-br from-[#08121f] via-[#05090b] to-[#040809] p-6 sm:p-8 lg:p-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <span className="rounded-sm border border-[#5494DA]/30 bg-[#5494DA]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#73B9EE]">
                      {mentor.label}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#5494DA]" />
                      <span>SSWH OVERSIGHT</span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#86CEFA]">
                      {mentor.role}
                    </p>

                    <h3 className="font-serif text-2xl font-normal tracking-tight text-white sm:text-3xl">
                      {mentor.name}
                    </h3>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                      DESCRIPTION
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-200">
                      {mentor.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                      EXPERTISE
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-300">
                      {mentor.expertise}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                      EXPERIENCE
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-300">
                      {mentor.experience}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] text-slate-500">
                    <Sparkles className="h-3 w-3 text-[#5494DA]" />
                    MENTOR PROFILE
                  </span>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-slate-200 transition-colors hover:border-[#5494DA]/40 hover:bg-[#5494DA]/20 hover:text-[#73B9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5494DA]"
                  >
                    Close profile
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mentor Portrait (On desktop placed on RIGHT) */}
            <button
              type="button"
              onClick={handleClose}
              aria-expanded={true}
              aria-controls="mentor-profile-panel"
              aria-label={`Close ${mentor.name}'s Mentor profile`}
              className="order-1 md:order-2 group relative block min-h-[480px] w-full shrink-0 cursor-pointer overflow-hidden bg-slate-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5494DA] md:min-h-[620px] md:w-[380px] lg:w-[420px] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <img
                src={mentor.image}
                alt={`${mentor.name} — ${mentor.role}`}
                className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.96] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#05090b] via-[#05090b]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#05090b]/70 via-transparent to-[#05090b]/70" />

              <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
                <span className="inline-flex items-center gap-2 rounded-sm border border-[#5494DA]/30 bg-slate-950/85 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#73B9EE] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5494DA]" />
                  {mentor.label}
                </span>

                <span className="rounded-sm border border-white/15 bg-black/40 p-2 text-[#73B9EE] backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pt-16 sm:p-8">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5494DA]">
                  {mentor.role}
                </p>

                <h3 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
                  {mentor.name}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#86CEFA]">
                    CLICK TO CLOSE
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                    SSWH LEADERSHIP
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
