import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'

export const LandingFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#04080a] text-slate-400 border-t border-white/10 pt-16 pb-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={sswhLogo}
                alt="SSWH Logo"
                className="h-8 w-8 rounded object-contain bg-white p-0.5"
              />
              <span className="font-serif text-2xl text-white font-normal tracking-[0.16em]">
                SSWH
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed font-light">
              SSWH-Smart Sustainable Water Harvesting designed for continuous industrial, commercial, and municipal hydrological resilience.
            </p>
            <div className="text-[10px] text-[#73B9EE]">
              BUILDING ALPHA-1 SCADA FACILITY
            </div>
          </div>

          {/* Quick Access to Real Operations */}
          <div>
            <div className="text-white uppercase tracking-wider mb-4 text-[11px]">
              COMMAND & TELEMETRY
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link to="/dashboard" className="hover:text-[#73B9EE] transition-colors flex items-center gap-1">
                  <span>Command Center</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/monitoring" className="hover:text-[#73B9EE] transition-colors flex items-center gap-1">
                  <span>Live Sensor Matrix</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/tanks" className="hover:text-[#73B9EE] transition-colors flex items-center gap-1">
                  <span>Storage Reservoirs</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/devices" className="hover:text-[#73B9EE] transition-colors flex items-center gap-1">
                  <span>Hardware Gateway</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Environmental Systems */}
          <div>
            <div className="text-white uppercase tracking-wider mb-4 text-[11px]">
              LIFECYCLE MANIFOLDS
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link to="/water-quality" className="hover:text-[#73B9EE] transition-colors">
                  Water Quality & Treatment
                </Link>
              </li>
              <li>
                <Link to="/consumption" className="hover:text-[#73B9EE] transition-colors">
                  Consumption Analytics
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-[#73B9EE] transition-colors">
                  Rain Catchment Topology
                </Link>
              </li>
              <li>
                <Link to="/recharge" className="hover:text-[#73B9EE] transition-colors">
                  Subterranean Aquifer Recharge
                </Link>
              </li>
              <li>
                <Link to="/wastewater" className="hover:text-[#73B9EE] transition-colors">
                  Wastewater & Greywater Reuse
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <div className="text-white uppercase tracking-wider mb-4 text-[11px]">
              GOVERNANCE & STANDARDS
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed font-light mb-3">
              Designed to support operational water quality monitoring workflows and environmental sustainability frameworks.
            </p>
          </div>
        </div>

        {/* Bottom Credits & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 SSWH-SMART SUSTAINABLE WATER HARVESTING. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              ALL SYSTEMS OPERATIONAL
            </span>
            <Link to="/reports" className="hover:text-slate-400 transition-colors">
              COMPLIANCE AUDIT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
