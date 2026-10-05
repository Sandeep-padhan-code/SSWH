import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowUpRight, Droplets } from 'lucide-react'

interface LandingNavProps {
  onGetStarted: () => void
}

type MenuItem = { title: string; description?: string; path?: string; elementId?: string }

const menus: Record<string, MenuItem[]> = {
  Platform: [
    { title: 'SCADA Dashboard', description: 'Real-time telemetry command center.', path: '/dashboard' },
    { title: 'Live Operations', description: 'Monitor active facility flows and valves.', path: '/live-operations' },
    { title: 'Process Flow', description: 'Full hydraulic lifecycle diagram.', path: '/process-flow' },
    { title: 'Alerts & Events', description: 'Subsystem thresholds and leak warnings.', path: '/alerts' },
  ],
  Architecture: [
    { title: 'System Overview', description: 'Hydrological capacitance & sensors.', elementId: 'architecture' },
    { title: 'System Capabilities', description: 'Capabilities & water source breakdown.', elementId: 'capabilities' },
    { title: 'Subsystems Matrix', description: 'Telemetry bus & multi-chamber manifolds.', path: '/monitoring' },
  ],
  Organization: [
    { title: 'Mentors & Leadership', description: 'Visionary guidance & advisory board.', elementId: 'mentors' },
    { title: 'Engineering Team', description: 'The team behind SSWH intelligence.', elementId: 'team' },
    { title: 'Real-World Business', description: 'Target sectors and WaaS model.', elementId: 'business' },
    { title: 'Future Roadmap', description: 'IoT hardware & AI evolution.', elementId: 'impact' },
  ],
}

export const LandingNav: React.FC<LandingNavProps> = ({ onGetStarted }) => {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outside = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(null)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', outside)
    window.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', outside)
      window.removeEventListener('keydown', esc)
    }
  }, [])

  const handleNavClick = (item: MenuItem) => {
    setOpen(null)
    setMobile(false)
    if (item.elementId) {
      const el = document.getElementById(item.elementId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061410]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-white group">
          <span className="grid h-8 w-8 place-items-center rounded bg-emerald-400 text-[#062018] group-hover:bg-emerald-300 transition-colors">
            <Droplets className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-medium tracking-wide leading-none">SSWH</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-mono mt-0.5">
              Intelligent Water Harvesting
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Main navigation">
          {Object.keys(menus).map((label) => (
            <div key={label} className="relative">
              <button
                onClick={() => setOpen(open === label ? null : label)}
                onMouseEnter={() => setOpen(label)}
                aria-expanded={open === label}
                className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-mono tracking-wider uppercase text-slate-200 hover:bg-white/10 hover:text-emerald-300 transition-colors"
              >
                <span>{label}</span>
                <ChevronDown className="h-3.5 w-3.5 text-emerald-400" />
              </button>

              {open === label && (
                <div
                  onMouseLeave={() => setOpen(null)}
                  className="absolute left-0 top-full mt-1 w-80 rounded-sm border border-white/10 bg-[#060e0c] p-2 shadow-2xl backdrop-blur-xl"
                >
                  <p className="px-3 pb-2 pt-1 text-[10px] font-mono font-semibold uppercase tracking-[.18em] text-emerald-400">
                    {label}
                  </p>
                  {menus[label].map((item) =>
                    item.path ? (
                      <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => setOpen(null)}
                        className="block rounded-sm px-3 py-2.5 hover:bg-white/10 transition-colors"
                      >
                        <b className="block text-xs font-sans font-medium text-white">{item.title}</b>
                        <span className="mt-0.5 block text-[11px] leading-4 text-slate-400 font-light">{item.description}</span>
                      </Link>
                    ) : (
                      <button
                        key={item.title}
                        onClick={() => handleNavClick(item)}
                        className="w-full text-left rounded-sm px-3 py-2.5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <b className="block text-xs font-sans font-medium text-white">{item.title}</b>
                        <span className="mt-0.5 block text-[11px] leading-4 text-slate-400 font-light">{item.description}</span>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-sm bg-emerald-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-emerald-300 transition-all cursor-pointer shadow-md shadow-emerald-500/10"
          >
            <span>GET STARTED</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobile(!mobile)}
          className="p-2 text-white sm:hidden"
          aria-label="Toggle menu"
        >
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobile && (
        <div className="border-t border-white/10 bg-[#060e0c] px-5 py-4 sm:hidden">
          {Object.entries(menus).map(([label, items]) => (
            <details key={label} className="border-b border-white/10 py-2">
              <summary className="cursor-pointer text-xs font-mono uppercase text-emerald-300 py-1">{label}</summary>
              {items.map((i) =>
                i.path ? (
                  <Link
                    key={i.title}
                    to={i.path}
                    onClick={() => setMobile(false)}
                    className="block py-2 pl-3 text-xs text-slate-200"
                  >
                    {i.title}
                  </Link>
                ) : (
                  <button
                    key={i.title}
                    onClick={() => handleNavClick(i)}
                    className="block w-full text-left py-2 pl-3 text-xs text-slate-200"
                  >
                    {i.title}
                  </button>
                )
              )}
            </details>
          ))}
          <div className="mt-4">
            <button
              onClick={onGetStarted}
              className="w-full rounded-sm bg-emerald-400 px-4 py-2.5 text-xs font-bold uppercase text-slate-950"
            >
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
