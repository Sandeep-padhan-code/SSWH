import { UserRole, Permission, CanonicalRole } from '@/types'

export type { CanonicalRole }

/**
 * Normalizes any role representation (legacy or canonical) into one of the 3 primary roles:
 * - 'scada_operator'
 * - 'facilities_lead'
 * - 'tenant_observer'
 */
export const normalizeRole = (role: UserRole): CanonicalRole => {
  if (!role) return 'tenant_observer'
  const normalized = String(role).trim().toLowerCase()
  if (normalized === 'scada_operator' || normalized === 'scada' || normalized === 'admin') {
    return 'scada_operator'
  }
  if (
    normalized === 'facilities_lead' ||
    normalized === 'facilities' ||
    normalized === 'building_manager'
  ) {
    return 'facilities_lead'
  }
  return 'tenant_observer'
}

/**
 * Human-readable display titles for roles
 */
export const roleDisplayNames: Record<CanonicalRole | 'SCADA' | 'FACILITIES_LEAD' | 'TENANT_OBSERVER' | 'ADMIN' | 'BUILDING_MANAGER' | 'RESIDENT', string> = {
  scada_operator: 'SCADA Operator',
  facilities_lead: 'Facilities Lead',
  tenant_observer: 'Tenant Observer',
  // Legacy aliases
  SCADA: 'SCADA Operator',
  FACILITIES_LEAD: 'Facilities Lead',
  TENANT_OBSERVER: 'Tenant Observer',
  ADMIN: 'SCADA Administrator',
  BUILDING_MANAGER: 'Facilities Lead',
  RESIDENT: 'Tenant Observer',
}

/**
 * Centralized Role-Based Access Control (RBAC) Permission Matrix
 */
export const permissionsByRole: Record<CanonicalRole, Permission[]> = {
  scada_operator: [
    'VIEW_REALTIME_DATA',
    'VIEW_ANALYTICS',
    'VIEW_ALERTS',
    'CONTROL_PUMP',
    'CONTROL_VALVE',
    'CONTROL_EQUIPMENT',
    'VIEW_REPORTS',
    'MANAGE_MAINTENANCE',
    'SYSTEM_CONFIG',
    'VIEW_AUDIT_LOG',
  ],
  facilities_lead: [
    'VIEW_REALTIME_DATA',
    'VIEW_ANALYTICS',
    'VIEW_ALERTS',
    'VIEW_REPORTS',
    'MANAGE_MAINTENANCE',
    'VIEW_AUDIT_LOG',
  ],
  tenant_observer: [
    'VIEW_ANALYTICS',
    'VIEW_ALERTS',
    'VIEW_REPORTS',
  ],
}

/**
 * Checks if a user role matches a target role or any role in a list of allowed roles
 */
export const hasRole = (userRole: UserRole, targetRole: UserRole | UserRole[]): boolean => {
  const currentNormalized = normalizeRole(userRole)
  if (Array.isArray(targetRole)) {
    return targetRole.some((r) => normalizeRole(r) === currentNormalized)
  }
  return normalizeRole(targetRole) === currentNormalized
}

/**
 * Checks if a given role has a specific operational or telemetry permission
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const normalized = normalizeRole(role)
  return permissionsByRole[normalized].includes(permission)
}


export const getDashboardRoute = (role: UserRole): string => {
  const normalized = normalizeRole(role)
  switch (normalized) {
    case 'scada_operator':
      return '/scada/dashboard'
    case 'facilities_lead':
      return '/facilities/dashboard'
    case 'tenant_observer':
    default:
      return '/tenant/dashboard'
  }
}

/**
 * Backward compatibility alias for getDashboardRoute
 */
export const dashboardPathForRole = getDashboardRoute

/**
 * Route protection rules: determines whether a normalized role can access a specific route
 */
export const isRouteAllowedForRole = (role: UserRole, path: string): boolean => {
  const normalized = normalizeRole(role)

  // SCADA operator can access all operational dashboards and tools
  if (normalized === 'scada_operator') {
    return true
  }

  // Facilities Lead cannot access live SCADA actuator controls, raw process mimic, or system RBAC admin
  if (normalized === 'facilities_lead') {
    const scadaOnlyPaths = ['/scada', '/live-operations', '/process-flow', '/users']
    return !scadaOnlyPaths.some((p) => path.startsWith(p))
  }

  // Tenant Observer can only access tenant dashboard, consumption analytics, alerts, reports, and tenant utility pages
  if (normalized === 'tenant_observer') {
    const allowedTenantPaths = [
      '/tenant',
      '/consumption',
      '/alerts',
      '/reports',
      '/drinking-water',
      '/leak-detection',
    ]
    return allowedTenantPaths.some((p) => path.startsWith(p))
  }

  return false
}
