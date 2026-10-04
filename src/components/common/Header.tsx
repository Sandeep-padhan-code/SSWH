import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Droplets,
  Search,
  Bell,
  Menu,
  Shield,
  Building,
  Home,
  ChevronDown,
  Database,
  Cpu,
  AlertTriangle,
  Activity,
  Check,
  LogOut,
} from 'lucide-react'
import { UserRole, Alert } from '@/types'
import { NotificationPanel } from './NotificationPanel'
import { mockAlerts } from '@/data/mock/alerts'
import { mockTanks } from '@/data/mock/tanks'
import { mockDevices } from '@/data/mock/devices'
import { mockSensors } from '@/data/mock/sensors'
import { normalizeRole, dashboardPathForRole, roleDisplayNames } from '@/auth/permissions'
import { useAuth } from '@/auth/AuthContext'

export interface HeaderProps {
  onMenuToggle: () => void
  currentRole: UserRole
  onRoleChange?: (role: UserRole) => void
  activeAlertCount?: number
  onSearch?: (term: string) => void
  userName?: string
  onSignOut?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  currentRole,
  onRoleChange,
  onSearch,
  userName,
  onSignOut,
}) => {
  const navigate = useNavigate()
  const { switchRole } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const roleDropdownRef = useRef<HTMLDivElement>(null)

  const activeAlertCount = alerts.filter((a) => !a.isResolved).length
  const normalizedRole = normalizeRole(currentRole)

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a))
    )
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false)
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (val: string) => {
    setSearchTerm(val)
    if (onSearch) {
      onSearch(val)
    }
  }

  const searchResults =
    searchTerm.trim().length > 0
      ? [
          ...mockTanks
            .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((t) => ({ id: t.id, title: t.name, type: 'Storage Tank', path: '/tanks', icon: Database })),
          ...mockDevices
            .filter(
              (d) =>
                d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.id.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((d) => ({ id: d.id, title: d.name, type: 'Hardware Node', path: '/devices', icon: Cpu })),
          ...mockSensors
            .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((s) => ({ id: s.id, title: s.name, type: 'Sensor Probe', path: '/monitoring', icon: Activity })),
          ...alerts
            .filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((a) => ({ id: a.id, title: a.title, type: 'Alarm Incident', path: '/alerts', icon: AlertTriangle })),
        ].slice(0, 6)
      : []

  const roleConfigs = {
    SCADA: { label: 'SCADA Operator', icon: Shield, badge: 'Full Control' },
    FACILITIES_LEAD: { label: 'Facilities Lead', icon: Building, badge: 'Analytics & Maint' },
    TENANT_OBSERVER: { label: 'Tenant Observer', icon: Home, badge: 'Read-Only' },
  }

  const CurrentRoleIcon = roleConfigs[normalizedRole].icon

  const handleSelectRole = (r: 'SCADA' | 'FACILITIES_LEAD' | 'TENANT_OBSERVER') => {
    switchRole(r)
    if (onRoleChange) onRoleChange(r)
    setIsRoleDropdownOpen(false)
    navigate(dashboardPathForRole(r))
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-[#DDE6E2] px-4 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-[#63736E] hover:bg-[#E8F5F0] hover:text-[#075B48] cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to={dashboardPathForRole(currentRole)} className="flex items-center gap-2.5 text-decoration-none">
            <div className="h-8 w-8 rounded bg-[#0F4D3A] flex items-center justify-center text-white shadow-sm">
              <Droplets className="h-4.5 w-4.5 text-[#B9DDDD]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#10251F] tracking-tight">SSWH</span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 bg-[#E4F5EE] text-[#0F4D3A] rounded border border-[#D6E3DD]">
                  {roleDisplayNames[normalizedRole]}
                </span>
              </div>
              <p className="text-[11px] text-[#587068] hidden sm:block">
                Smart Water Usage Management Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div ref={searchRef} className="relative hidden md:block w-72 lg:w-[28rem]">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-[#587068] pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search equipment, tanks, sensors, alarms..."
              aria-label="Search telemetry entities"
              className="w-full pl-8 pr-12 py-1.5 text-xs bg-[#F4F8F5] border border-[#D6E3DD] rounded text-[#10251F] placeholder-[#8AA097] focus:bg-white focus:border-[#0F4D3A] focus:outline-none focus:ring-1 focus:ring-[#0F4D3A] transition-colors"
            />
            <kbd className="absolute right-2 text-[10px] font-mono text-[#587068] bg-[#F4F8F5] px-1.5 py-0.5 rounded border border-[#D6E3DD]">
              /
            </kbd>
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D6E3DD] rounded shadow-md z-50 overflow-hidden divide-y divide-[#E5EEE9]">
              {searchResults.map((res) => {
                const Icon = res.icon
                return (
                  <button
                    key={`${res.type}-${res.id}`}
                    onClick={() => {
                      navigate(res.path)
                      setIsSearchFocused(false)
                      setSearchTerm('')
                    }}
                    className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#F4F8F5] text-xs cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-[#0B6B73]" />
                      <span className="font-medium text-[#10251F]">{res.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#587068] bg-[#F4F8F5] px-1.5 py-0.5 rounded border border-[#E5EEE9]">
                      {res.type}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: Notifications & Role Context Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Alarm Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded text-[#587068] hover:bg-[#F4F8F5] hover:text-[#10251F] cursor-pointer transition-colors"
              aria-label={`Active alarms: ${activeAlertCount}`}
            >
              <Bell className="h-4 w-4" />
              {activeAlertCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-[1rem] px-1 bg-[#C94B5B] text-white rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {activeAlertCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <NotificationPanel
                alerts={alerts}
                onClose={() => setIsNotificationsOpen(false)}
                onResolve={handleResolveAlert}
              />
            )}
          </div>

          <div className="h-4 w-px bg-[#D6E3DD] hidden sm:block" />

          {/* Role Context Dropdown */}
          <div ref={roleDropdownRef} className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-[#D6E3DD] bg-white hover:bg-[#F4F8F5] text-xs font-medium text-[#10251F] cursor-pointer transition-colors"
              aria-expanded={isRoleDropdownOpen}
              aria-label="Change role context"
            >
              <CurrentRoleIcon className="h-3.5 w-3.5 text-[#0F4D3A]" />
              <span className="hidden sm:inline">{roleConfigs[normalizedRole].label}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#587068]" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-[#D6E3DD] rounded shadow-md z-50 p-1">
                <div className="px-2 py-1.5 text-[10px] font-bold text-[#587068] uppercase tracking-wider">
                  Switch Authenticated Role Context
                </div>
                {(['SCADA', 'FACILITIES_LEAD', 'TENANT_OBSERVER'] as const).map((r) => {
                  const cfg = roleConfigs[r]
                  const Icon = cfg.icon
                  const isSelected = normalizedRole === r
                  return (
                    <button
                      key={r}
                      onClick={() => handleSelectRole(r)}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#E4F5EE] font-semibold text-[#0F4D3A]'
                          : 'text-[#3F514B] hover:bg-[#F4F8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-[#0F4D3A]' : 'text-[#71877F]'}`} />
                        <span>{cfg.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#587068] font-mono">{cfg.badge}</span>
                        {isSelected && <Check className="h-3 w-3 text-[#0F4D3A]" />}
                      </div>
                    </button>
                  )
                })}

                {onSignOut && (
                  <button
                    onClick={onSignOut}
                    className="mt-1 flex w-full items-center gap-2 border-t border-[#DDE6E2] px-2 py-2 text-left text-xs text-[#C83D3D] hover:bg-[#FFF8F8]"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out {userName ? `(${userName})` : ''}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
