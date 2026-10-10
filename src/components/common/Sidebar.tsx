import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'
import {
  LayoutDashboard,
  Activity,
  Workflow,
  Droplets,
  BarChart3,
  Recycle,
  Database,
  Cpu,
  Bell,
  FileSpreadsheet,
  Wallet,
  Users,
  Settings,
  X,
  ChevronRight,
  Shield,
  Building,
  Home,
  Wrench,
} from 'lucide-react'
import { UserRole } from '@/types'
import { cn } from '@/utils/cn'
import { normalizeRole, roleDisplayNames } from '@/auth/permissions'

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentRole: UserRole
}

interface NavItem {
  name: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  badgeColor?: string
  roles?: UserRole[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentRole }) => {
  const [moreOpen, setMoreOpen] = useState(false)
  const normalized = normalizeRole(currentRole)

  const scadaGroups: NavGroup[] = [
    {
      label: 'SCADA CONTROL & TELEMETRY',
      items: [
        { name: 'SCADA Dashboard', path: '/scada/dashboard', icon: LayoutDashboard },
        {
          name: 'Live Operations',
          path: '/live-operations',
          icon: Activity,
          badge: 'Live',
          badgeColor: 'bg-[#EAF3FD] text-[#5494DA] border border-[#D1E2F5]',
        },
        { name: 'Process Flow Mimic', path: '/process-flow', icon: Workflow },
        { name: 'Storage Reservoirs', path: '/tanks', icon: Database, badge: '4 Tanks' },
        { name: 'System Alarms', path: '/alerts', icon: Bell, badge: 2, badgeColor: 'bg-rose-100 text-rose-800 border border-rose-200' },
      ],
    },
    {
      label: 'MONITORING & QUALITY',
      items: [
        { name: 'Sensor Telemetry', path: '/monitoring', icon: Activity },
        { name: 'Water Quality', path: '/water-quality', icon: Droplets },
        { name: 'Water Consumption', path: '/consumption', icon: BarChart3 },
        { name: 'Wastewater & Reuse', path: '/wastewater', icon: Recycle },
      ],
    },
    {
      label: 'ANALYTICS & ADMIN',
      items: [
        { name: 'Predictive Modeling', path: '/ai-insights', icon: Activity },
        { name: 'Compliance Reports', path: '/reports', icon: FileSpreadsheet },
        { name: 'Utility Ledger', path: '/recharge', icon: Wallet },
        { name: 'Access Control (RBAC)', path: '/users', icon: Users, roles: ['SCADA', 'ADMIN'] },
        { name: 'Calibration & Settings', path: '/settings', icon: Settings, roles: ['SCADA', 'ADMIN'] },
      ],
    },
  ]

  const facilitiesGroups: NavGroup[] = [
    {
      label: 'FACILITY MANAGEMENT',
      items: [
        { name: 'Facilities Overview', path: '/facilities/dashboard', icon: Building },
        { name: 'Water Consumption', path: '/consumption', icon: BarChart3 },
        { name: 'Storage Reservoirs', path: '/tanks', icon: Database },
        { name: 'Facility Alerts', path: '/alerts', icon: Bell },
        { name: 'Equipment & Maintenance', path: '/devices', icon: Wrench },
        { name: 'Facility Reports', path: '/reports', icon: FileSpreadsheet },
        { name: 'Facility Settings', path: '/settings', icon: Settings },
      ],
    },
  ]

  const tenantGroups: NavGroup[] = [
    {
      label: 'TENANT PORTAL',
      items: [
        { name: 'My Usage Overview', path: '/tenant/dashboard', icon: Home },
        { name: 'Building Consumption', path: '/consumption', icon: BarChart3 },
        { name: 'Alerts & Bulletins', path: '/alerts', icon: Bell },
        { name: 'Read-Only Reports', path: '/reports', icon: FileSpreadsheet },
      ],
    },
  ]

  const navGroups =
    normalized === 'scada_operator'
      ? scadaGroups
      : normalized === 'facilities_lead'
      ? facilitiesGroups
      : tenantGroups

  const roleTitle = roleDisplayNames[normalized]

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#0E1B2A]/40 backdrop-blur-[2px] z-40"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-dvh w-[19rem] bg-white border-r border-[#D1E2F5] flex flex-col justify-between transition-transform duration-250 ease-out select-none shadow-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D1E2F5] bg-[#F4F8FB]">
          <div className="flex items-center gap-2.5">
            <img
              src={sswhLogo}
              alt="SSWH Logo"
              className="h-8 w-8 rounded object-contain bg-white p-0.5 border border-[#D1E2F5] shadow-sm shrink-0"
            />
            <div>
              <span className="font-bold text-xs text-[#0E1B2A] tracking-tight block">
                SSWH
              </span>
              <span className="text-[10px] text-[#4A637D] block leading-tight font-medium">
                Smart Sustainable Water Harvesting
              </span>
              <span className="text-[10px] text-[#5494DA] font-mono font-semibold">
                Role: {roleTitle}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#4A637D] hover:bg-[#EAF3FD] cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Nav Groups */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter((item) => {
              if (!item.roles) return true
              return item.roles.some((r) => normalizeRole(r) === normalized)
            })

            if (visibleItems.length === 0) return null

            return (
              <div key={group.label} className="space-y-1">
                <div className="px-2 mb-1 text-[10px] font-mono font-bold text-[#4A637D] uppercase tracking-wider">
                  {group.label}
                </div>
                <div className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            'group flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors',
                            isActive
                              ? 'bg-[#5494DA] text-white font-medium'
                              : 'text-[#4A637D] hover:bg-[#F4F8FB] hover:text-[#0E1B2A]'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div className="flex items-center gap-2 truncate">
                              <Icon
                                className={cn(
                                  'h-3.5 w-3.5 shrink-0',
                                  isActive
                                    ? 'text-white'
                                    : 'text-[#6D869F] group-hover:text-[#5494DA]'
                                )}
                              />
                              <span className="truncate">{item.name}</span>
                            </div>
                            {item.badge !== undefined && (
                              <span
                                className={cn(
                                  'text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold tabular-nums shrink-0',
                                  isActive
                                    ? 'bg-white/20 text-white'
                                    : item.badgeColor ||
                                        'bg-[#F4F8FB] text-[#4A637D] border border-[#D1E2F5]'
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Hardware & Security Footer */}
        <div className="p-3 border-t border-[#D1E2F5] bg-[#F4F8FB] text-[11px]">
          <div className="flex items-center justify-between text-[#0E1B2A] font-semibold mb-1">
            <span className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18A878]" />
              {roleTitle}
            </span>
            <span className="text-[10px] font-mono text-[#5494DA]">RBAC SECURE</span>
          </div>
          <p className="text-[10px] text-[#4A637D] leading-tight">
            Protected session • Access Level: {normalized}
          </p>
        </div>
      </aside>
    </>
  )
}
