import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'
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
  LogOut,
  UserCheck,
  MapPin,
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
  activeAlertCount?: number
  onSearch?: (term: string) => void
  userName?: string
  onSignOut?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  currentRole,
  onSearch,
  userName,
  onSignOut,
}) => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  const activeAlertCount = alerts.filter((a) => !a.isResolved).length
  const normalizedRole = normalizeRole(user?.role || currentRole)

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
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false)
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
    scada_operator: {
      label: 'SCADA Operator',
      icon: Shield,
      badge: 'Full Operational Control',
      badgeClass: 'bg-[#5494DA]/10 text-[#5494DA] border-[#5494DA]/20',
    },
    facilities_lead: {
      label: 'Facilities Lead',
      icon: Building,
      badge: 'Analytics & Maintenance',
      badgeClass: 'bg-[#73B9EE]/10 text-[#5494DA] border-[#73B9EE]/20',
    },
    tenant_observer: {
      label: 'Tenant Observer',
      icon: Home,
      badge: 'Read-Only Resident Scope',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    SCADA: {
      label: 'SCADA Operator',
      icon: Shield,
      badge: 'Full Operational Control',
      badgeClass: 'bg-[#EAF3FD] text-[#5494DA] border-[#D1E2F5]',
    },
    FACILITIES_LEAD: {
      label: 'Facilities Lead',
      icon: Building,
      badge: 'Analytics & Maintenance',
      badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    },
    TENANT_OBSERVER: {
      label: 'Tenant Observer',
      icon: Home,
      badge: 'Read-Only Resident Scope',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  }

  const CurrentRoleIcon = roleConfigs[normalizedRole]?.icon || Shield
  const currentConfig = roleConfigs[normalizedRole] || roleConfigs.tenant_observer

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut()
    } else {
      signOut()
      navigate('/login', { replace: true })
    }
  }

  const displayName = user?.fullName || user?.name || userName || 'Authenticated User'
  const userEmail = user?.email || 'user@sswh.io'

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-[#D1E2F5] px-4 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-[#4A637D] hover:bg-[#EAF3FD] hover:text-[#5494DA] cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to={dashboardPathForRole(normalizedRole)} className="flex items-center gap-2.5 text-decoration-none">
            <img
              src={sswhLogo}
              alt="SSWH Logo"
              className="h-8 w-8 rounded object-contain bg-white p-0.5 border border-[#D1E2F5] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#0E1B2A] tracking-tight">SSWH</span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 bg-[#EAF3FD] text-[#5494DA] rounded border border-[#D1E2F5]">
                  {roleDisplayNames[normalizedRole]}
                </span>
              </div>
              <p className="text-[11px] text-[#4A637D] hidden sm:block">
                SSWH-Smart Sustainable Water Harvesting
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div ref={searchRef} className="relative hidden md:block w-72 lg:w-[28rem]">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-[#4A637D] pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search equipment, tanks, sensors, alarms..."
              aria-label="Search telemetry entities"
              className="w-full pl-8 pr-12 py-1.5 text-xs bg-[#F4F8FB] border border-[#D1E2F5] rounded text-[#0E1B2A] placeholder-[#8AA097] focus:bg-white focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-colors"
            />
            <kbd className="absolute right-2 text-[10px] font-mono text-[#4A637D] bg-[#F4F8FB] px-1.5 py-0.5 rounded border border-[#D1E2F5]">
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

        {/* Right: Notifications & Authoritative User Identity Display */}
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

          {/* Authoritative User Identity Display (Non-Interactive Role Context) */}
          <div ref={profileDropdownRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#D1E2F5] bg-white hover:bg-[#F4F8FB] text-xs font-medium text-[#0E1B2A] cursor-pointer transition-colors"
              aria-expanded={isProfileOpen}
              aria-label="User account identity"
            >
              <div className="h-5 w-5 rounded-full bg-[#EAF3FD] border border-[#D1E2F5] flex items-center justify-center text-[#5494DA]">
                <CurrentRoleIcon className="h-3 w-3" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-semibold block text-[11px] leading-tight text-[#0E1B2A]">
                  {displayName}
                </span>
                <span className="text-[10px] text-[#4A637D] font-mono leading-none">
                  {currentConfig.label}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#4A637D]" />
            </button>

            {/* Account Details & Session Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-1.5 w-72 bg-white border border-[#D1E2F5] rounded-xl shadow-xl z-50 p-2 text-xs divide-y divide-[#E4EFFB]">
                {/* Account Profile Summary */}
                <div className="p-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#5494DA] text-white flex items-center justify-center font-bold text-xs">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 truncate text-xs">{displayName}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Assigned Operational Scope & Role */}
                <div className="p-2 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Assigned Role
                    </span>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CurrentRoleIcon className="h-3.5 w-3.5 text-[#5494DA]" />
                        <span className="font-semibold text-slate-900 text-xs">{currentConfig.label}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium border ${currentConfig.badgeClass}`}>
                        {currentConfig.badge}
                      </span>
                    </div>
                  </div>

                  {(user?.apartment || user?.buildingName || user?.facilityId) && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Assigned Data Scope
                      </span>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-100">
                        <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">
                          {user?.apartment ? `${user.apartment}, ` : ''}
                          {user?.buildingName || user?.facilityId || 'Global Facility'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-[10px] text-[#5494DA] font-medium">
                    <UserCheck className="h-3 w-3 text-[#5494DA]" />
                    <span>Authoritative Session Active</span>
                  </div>
                </div>

                {/* Sign Out Action */}
                <div className="pt-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-rose-700 hover:bg-rose-50 font-medium cursor-pointer transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5 text-rose-600" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
