import React from 'react'
import { ArrowRight, Activity, ChevronDown } from 'lucide-react'
import heroImage from '@/assets/sswh-landscape.jpg'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'

interface HeroSectionProps {
  onGetStarted: () => void
  onExploreClick: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExploreClick }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <img
          src={heroImage}
          alt="SSWH Natural Landscape - Aerial view of lake, lush mountains, and water harvesting basin"
          className="w-full h-full object-cover object-center scale-100 animate-ambient-drift origin-center"
          loading="eager"
          decoding="async"
        />

        {/* Subtle cinematic overlays for legibility while keeping nature luminous */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060c0e] via-[#060c0e]/30 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Spacer to push content down below the nav */}
      <div className="h-24 sm:h-32"></div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="max-w-3xl">
          {/* System Sub-heading / Category */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-black/50 backdrop-blur-md border border-[#5494DA]/35 text-slate-300 mb-6">
            <img src={sswhLogo} alt="SSWH Logo" className="h-4 w-4 rounded-sm object-contain bg-white p-0.5 shrink-0" />
            <span className="h-2 w-2 rounded-full bg-[#86CEFA] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-[#86CEFA] font-semibold">
              SSWH-Smart Sustainable Water Harvesting
            </span>
          </div>

          {/* Official Tagline Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05] drop-shadow-sm mb-6">
            Save Water Today,<br />
            <span className="italic font-normal text-[#86CEFA]">Live Life Tomorrow.</span>
          </h1>

          {/* Core Description */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl mb-10 drop-shadow-sm">
            A smart monitoring HUB and intelligent water-management system measuring water usage, water quality, rainwater harvesting, underground extraction, and municipal supply in real time.
          </p>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onGetStarted}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#5494DA] hover:bg-[#73B9EE] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-xl shadow-[#5494DA]/25 hover:shadow-[#5494DA]/40 cursor-pointer active:scale-[0.98]"
              id="hero-get-started-btn"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-slate-950/60 hover:bg-slate-900/80 text-white hover:text-[#73B9EE] border border-white/20 hover:border-[#5494DA]/50 backdrop-blur-md text-xs font-mono tracking-[0.16em] uppercase rounded-sm transition-all duration-300"
            >
              <Activity className="w-3.5 h-3.5 text-[#5494DA]" />
              <span>EXPLORE PLATFORM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Telemetry Ticker / Status Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-slate-300">
          {/* Coordinates & Node */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">NODE:</span>
              <span className="text-white font-medium">SSWH-PROTOTYPE-01</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">MODE:</span>
              <span className="text-[#73B9EE] font-medium">SYSTEM SIMULATION</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-400">TELEMETRY BUS:</span>
              <span className="text-white font-medium">DEVELOPMENT DEMO</span>
            </div>
          </div>

          {/* Scroll Prompt */}
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer group"
            aria-label="Scroll to discover architecture"
          >
            <span className="tracking-[0.18em] text-[11px] uppercase">DISCOVER ARCHITECTURE</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 text-[#5494DA]" />
          </button>
        </div>
      </div>
    </section>
  )
}
