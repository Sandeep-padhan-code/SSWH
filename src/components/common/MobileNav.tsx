import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Activity, Database, Bell, Menu } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface MobileNavProps {
  onOpenMenu: () => void
  activeAlertCount?: number
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenMenu, activeAlertCount = 3 }) => {
  const quickItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Telemetry', path: '/monitoring', icon: Activity },
    { name: 'Tanks', path: '/tanks', icon: Database },
    { name: 'Alarms', path: '/alerts', icon: Bell, badge: activeAlertCount },
  ]

  return (
    <nav aria-label="Mobile Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-3 py-1.5 shadow-sm">
      <div className="flex items-center justify-around">
        {quickItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-1 px-3 rounded text-[10px] font-medium transition-colors relative',
                  isActive
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                )
              }
            >
              <div className="relative">
                <Icon className="h-4.5 w-4.5 mb-0.5" />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 h-3.5 min-w-[0.875rem] px-0.5 rounded-full bg-rose-600 text-white font-mono font-bold text-[9px] flex items-center justify-center tabular-nums">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span>{item.name}</span>
            </NavLink>
          )
        })}

        {/* Menu toggle button */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 px-3 rounded text-[10px] font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
          aria-label="Open full navigation"
        >
          <Menu className="h-4.5 w-4.5 mb-0.5" />
          <span>Menu</span>
        </button>
      </div>
    </nav>
  )
}
