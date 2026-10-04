import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { UserRole, Permission } from '@/types'
import { dashboardPathForRole, hasPermission as checkPermission, normalizeRole } from './permissions'

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
      <div className="grid min-h-screen place-items-center bg-[#F4F8F5] text-sm text-[#587068]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#0F4D3A] border-t-transparent" />
          <p className="font-mono text-xs">Authenticating SCADA session...</p>
        </div>
      </div>
    )
  }

  // Check 1: Must be logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  // Check 2: Allowed Roles
  if (allowedRoles && allowedRoles.length > 0) {
    const userRoleNorm = normalizeRole(user.role)
    const isRoleAllowed = allowedRoles.some((r) => normalizeRole(r) === userRoleNorm)
    if (!isRoleAllowed) {
      return <Navigate to={dashboardPathForRole(user.role)} replace />
    }
  }

  // Check 3: Required Permission
  if (requiredPermission && !checkPermission(user.role, requiredPermission)) {
    return <Navigate to={dashboardPathForRole(user.role)} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
