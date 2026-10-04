import { UserRole, Permission } from '@/types'

export const normalizeRole = (role: UserRole): 'SCADA' | 'FACILITIES_LEAD' | 'TENANT_OBSERVER' => {
  if (role === 'SCADA' || role === 'ADMIN') return 'SCADA'
  if (role === 'FACILITIES_LEAD' || role === 'BUILDING_MANAGER') return 'FACILITIES_LEAD'
  return 'TENANT_OBSERVER'
}

export const roleDisplayNames: Record<'SCADA' | 'FACILITIES_LEAD' | 'TENANT_OBSERVER', string> = {
  SCADA: 'SCADA Operator',
  FACILITIES_LEAD: 'Facilities Lead',
  TENANT_OBSERVER: 'Tenant Observer',
}

export const permissionsByRole: Record<'SCADA' | 'FACILITIES_LEAD' | 'TENANT_OBSERVER', Permission[]> = {
  SCADA: [
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
  FACILITIES_LEAD: [
    'VIEW_REALTIME_DATA',
    'VIEW_ANALYTICS',
    'VIEW_ALERTS',
    'VIEW_REPORTS',
    'MANAGE_MAINTENANCE',
    'VIEW_AUDIT_LOG',
  ],
  TENANT_OBSERVER: [
    'VIEW_ANALYTICS',
    'VIEW_ALERTS',
    'VIEW_REPORTS',
  ],
}

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const normalized = normalizeRole(role)
  return permissionsByRole[normalized].includes(permission)
}

export const dashboardPathForRole = (role: UserRole): string => {
  const normalized = normalizeRole(role)
  if (normalized === 'SCADA') return '/scada/dashboard'
  if (normalized === 'FACILITIES_LEAD') return '/facilities/dashboard'
  return '/tenant/dashboard'
}
