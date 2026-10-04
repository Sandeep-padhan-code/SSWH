import { AuditLogEntry, UserRole, Permission } from '@/types'
import { hasPermission } from '@/auth/permissions'

const AUDIT_STORAGE_KEY = 'sswh.audit_logs'

const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'audit-001',
    user: 'Operator John',
    role: 'SCADA',
    action: 'START_PUMP',
    device: 'Pump-01 (Raw Water Main)',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    result: 'SUCCESS',
    details: 'Flow rate stabilized at 124.5 L/min',
  },
  {
    id: 'audit-002',
    user: 'Operator John',
    role: 'SCADA',
    action: 'CLOSE_VALVE',
    device: 'Valve-04 (Bypass Isolation)',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    result: 'SUCCESS',
    details: 'Line pressure adjusted to 4.2 Bar',
  },
  {
    id: 'audit-003',
    user: 'Lead Sarah',
    role: 'FACILITIES_LEAD',
    action: 'ACKNOWLEDGE_ALARM',
    device: 'Sensor FL-09 (Leak Detector)',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    result: 'SUCCESS',
    details: 'Maintenance work order #WO-849 created',
  },
  {
    id: 'audit-004',
    user: 'Guest Tenant',
    role: 'TENANT_OBSERVER',
    action: 'CONTROL_PUMP_ATTEMPT',
    device: 'Pump-02 (Recirculation)',
    timestamp: new Date(Date.now() - 1000 * 60 * 200).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    result: 'DENIED',
    details: 'Unauthorized API call blocked by RBAC security guard',
  },
]

let auditLogs: AuditLogEntry[] = (() => {
  try {
    const saved = localStorage.getItem(AUDIT_STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load audit logs', e)
  }
  return initialAuditLogs
})()

const saveLogs = () => {
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditLogs))
  } catch (e) {
    console.error('Failed to save audit logs', e)
  }
}

export const auditService = {
  getAuditLogs(): AuditLogEntry[] {
    return [...auditLogs]
  },

  recordLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
    const newLog: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }
    auditLogs = [newLog, ...auditLogs]
    saveLogs()
    return newLog
  },

  /**
   * Secure Control Action Execution
   * Enforces backend/API level RBAC permission checks before allowing control execution.
   */
  async executeControlAction<T>({
    userName,
    role,
    requiredPermission,
    action,
    device,
    details,
    actionFn,
  }: {
    userName: string
    role: UserRole
    requiredPermission: Permission
    action: string
    device: string
    details?: string
    actionFn: () => Promise<T> | T
  }): Promise<{ success: boolean; data?: T; error?: string }> {
    // 1. Backend permission check
    if (!hasPermission(role, requiredPermission)) {
      const deniedMessage = `Access Denied: ${role} role lacks required permission [${requiredPermission}] to perform ${action}`
      this.recordLog({
        user: userName || 'Unknown',
        role,
        action: `${action}_ATTEMPT`,
        device,
        result: 'DENIED',
        details: deniedMessage,
      })
      return {
        success: false,
        error: deniedMessage,
      }
    }

    // 2. Perform action if authorized
    try {
      const data = await actionFn()
      this.recordLog({
        user: userName || 'System Operator',
        role,
        action,
        device,
        result: 'SUCCESS',
        details: details || `Operation ${action} executed successfully`,
      })
      return { success: true, data }
    } catch (err: any) {
      this.recordLog({
        user: userName || 'System Operator',
        role,
        action,
        device,
        result: 'FAILED',
        details: err?.message || `Execution of ${action} failed unexpectedly`,
      })
      return { success: false, error: err?.message || 'Action execution failed' }
    }
  },
}
