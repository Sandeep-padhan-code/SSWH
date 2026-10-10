import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { LandingNav } from '@/components/landing/LandingNav'
import { HeroSection } from '@/components/landing/HeroSection'
import { LiveTelemetryRibbon } from '@/components/landing/LiveTelemetryRibbon'
import { PlatformArchitecture } from '@/components/landing/PlatformArchitecture'
import { SystemCapabilities } from '@/components/landing/SystemCapabilities'
import { MentorsSection } from '@/components/landing/MentorsSection'
import { TeamSection } from '@/components/landing/TeamSection'
import { BusinessOpportunity } from '@/components/landing/BusinessOpportunity'
import { FutureImpact } from '@/components/landing/FutureImpact'
import { LandingFooter } from '@/components/landing/LandingFooter'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  const handleGetStarted = () => {
    navigate('/login')
  }

  const handleExploreClick = () => {
    const el = document.getElementById('architecture')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#060c0e] text-slate-100 flex flex-col font-sans selection:bg-[#5494DA] selection:text-white">
      {/* Editorial Top Navigation */}
      <LandingNav onGetStarted={handleGetStarted} />

      {/* Main Fullscreen Hero & Narrative Sections */}
      <main className="flex-1">
        {/* 01 — HERO: "What is SSWH?" */}
        <HeroSection
          onGetStarted={handleGetStarted}
          onExploreClick={handleExploreClick}
        />

        {/* 02 — LIVE / SYSTEM OVERVIEW: "What does it monitor?" */}
        <LiveTelemetryRibbon />

        {/* 03 — ARCHITECTURAL FOUNDATION: "How does the system work?" */}
        <PlatformArchitecture />

        {/* 04 — SYSTEM / CAPABILITY EXPLANATION: "What can the platform do?" */}
        <SystemCapabilities />

        {/* 05 — MENTORS & LEADERSHIP: "Who guides the journey?" (IMMEDIATELY ABOVE TEAM) */}
        <MentorsSection />

        {/* 06 — TEAM: "Who is building it?" */}
        <TeamSection />

        {/* 07 — BUSINESS / REAL-WORLD OPPORTUNITY: "Who needs it and why?" */}
        <BusinessOpportunity />

        {/* 08 — FUTURE / IMPACT: "Where can this go?" */}
        <FutureImpact />

        {/* 09 — FINAL CTA: "Explore / Get Started" */}
        <section className="relative z-10 bg-[#05090b] py-24 border-b border-white/10 overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-[#86CEFA] text-xs font-mono uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-[#73B9EE]" />
              <span>READY FOR REAL-TIME OPERATIONS</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight mb-6">
              Empowering facilities with intelligent water sovereignty.
            </h2>

            <p className="font-sans text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Access the live SCADA command center, review sensor telemetry, track reservoir capacities, and balance purification loops instantly.
            </p>

            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-3 px-9 py-4 bg-[#5494DA] hover:bg-[#73B9EE] text-slate-950 text-xs font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-xl shadow-[#5494DA]/20 active:scale-[0.98] cursor-pointer"
              id="cta-enter-dashboard-btn"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <LandingFooter />
    </div>
  )
}
