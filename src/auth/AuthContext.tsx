import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { UserRole, Permission } from '@/types'
import { normalizeRole, hasPermission as checkPermission, dashboardPathForRole } from './permissions'

export interface AuthUser {
  id?: string
  email: string
  name: string
  role: UserRole
  buildingName?: string
  apartment?: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  hasPermission: (permission: Permission) => boolean
  switchRole: (newRole: UserRole) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const SESSION_KEY = 'sswm.demo-auth-session'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser
        setUser(parsed)
      }
    } catch (e) {
      console.error('Failed to load session:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      async signIn(email: string, password: string) {
        await new Promise((resolve) => setTimeout(resolve, 350))
        const accounts: Record<string, AuthUser> = {
          'admin@waterwise.internal': {
            id: 'usr-scada-01',
            email: 'admin@waterwise.internal',
            name: 'John SCADA Lead',
            role: 'SCADA',
            buildingName: 'Alpha Command Center',
          },
          'facilities@waterwise.internal': {
            id: 'usr-fac-02',
            email: 'facilities@waterwise.internal',
            name: 'Sarah Facilities Mgr',
            role: 'FACILITIES_LEAD',
            buildingName: 'Waterwise Industrial Park',
          },
          'tenant@waterwise.internal': {
            id: 'usr-ten-03',
            email: 'tenant@waterwise.internal',
            name: 'Alex Resident',
            role: 'TENANT_OBSERVER',
            buildingName: 'Block B - Apt 402',
          },
        }

        const normalizedEmail = email.trim().toLowerCase()
        const targetUser = accounts[normalizedEmail]

        if (!targetUser || password !== 'password123') {
          return false
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify(targetUser))
        setUser(targetUser)
        return true
      },
      signOut() {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
      },
      hasPermission(permission: Permission) {
        if (!user) return false
        return checkPermission(user.role, permission)
      },
      switchRole(newRole: UserRole) {
        if (!user) return
        const updated = { ...user, role: newRole }
        setUser(updated)
        localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
      },
    }),
    [user, isLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
