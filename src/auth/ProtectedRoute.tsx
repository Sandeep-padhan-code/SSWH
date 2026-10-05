import React from 'react'
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { UserRole, Permission } from '@/types'
import {
  getDashboardRoute,
  hasPermission as checkPermission,
  hasRole,
  normalizeRole,
  roleDisplayNames,
} from './permissions'
import { Droplets, ShieldAlert } from 'lucide-react'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  requiredPermission?: Permission
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  requiredPermission,
  children,
}) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#060e0c] text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
            <Droplets className="absolute inset-0 m-auto h-4 w-4 text-emerald-400" />
          </div>
          <p className="font-mono text-xs text-emerald-400/90 tracking-wider uppercase">
            Verifying SSWH Credentials...
          </p>
        </div>
      </div>
    )
  }

  // Check 1: Must be authenticated
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  // Check 2: Allowed Roles Enforcement
  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = hasRole(user.role, allowedRoles)
    if (!isAllowed) {
      const targetDashboard = getDashboardRoute(user.role)
      const userRoleTitle = roleDisplayNames[normalizeRole(user.role)]

      return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 p-8 shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-200">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <span className="inline-block px-2.5 py-1 rounded bg-rose-100 text-rose-800 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
              403 • Access Denied
            </span>
            <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Your authenticated account (<strong className="font-semibold text-slate-900">{userRoleTitle}</strong>) does not have authorization to access this operational area or dashboard.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to={targetDashboard}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0F4D3A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#075B48] transition-colors"
              >
                Return to {userRoleTitle} Dashboard
              </Link>
            </div>
          </div>
        </div>
      )
    }
  }

  // Check 3: Required Granular Permission Enforcement
  if (requiredPermission && !checkPermission(user.role, requiredPermission)) {
    const targetDashboard = getDashboardRoute(user.role)
    const userRoleTitle = roleDisplayNames[normalizeRole(user.role)]

    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <span className="inline-block px-2.5 py-1 rounded bg-rose-100 text-rose-800 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            403 • Permission Denied
          </span>
          <h2 className="text-xl font-bold text-slate-900">Insufficient Permissions</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            This operation requires the <code className="font-mono text-xs text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">{requiredPermission}</code> permission scope, which is not granted to your role (<strong className="font-semibold text-slate-900">{userRoleTitle}</strong>).
          </p>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to={targetDashboard}
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#0F4D3A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#075B48] transition-colors"
            >
              Return to {userRoleTitle} Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return children ? <>{children}</> : <Outlet />
}
