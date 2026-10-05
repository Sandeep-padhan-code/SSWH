import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { UserRole, Permission } from '@/types'
import {
  normalizeRole,
  hasPermission as checkPermission,
  hasRole as checkRole,
} from './permissions'

export interface AuthUser {
  id?: string
  userId?: string
  email: string
  name: string
  fullName?: string
  role: UserRole
  status?: string
  buildingName?: string
  buildingId?: string
  facilityId?: string
  apartment?: string
  flatId?: string
  createdAt?: string
  lastLoginAt?: string
}

export interface AuthResult {
  success: boolean
  error?: string
  user?: AuthUser
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
  buildingName?: string
  apartment?: string
  invitationCode?: string
}

interface StoredAccount extends AuthUser {
  passwordHash: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (payload: SignUpPayload) => Promise<AuthResult>
  signOut: () => void
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
  resetPassword: (email: string, newPassword: string) => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const SESSION_KEY = 'sswh_auth_session'
const ACCOUNTS_KEY = 'sswh_user_accounts'

// Privileged invitation codes for SCADA / Facilities roles
const INVITATION_CODES: Record<string, string> = {
  'SCADA-OPS-2026': 'scada_operator',
  'SSWH-ADMIN-PROV': 'scada_operator',
  'FAC-LEAD-2026': 'facilities_lead',
}

// Seed accounts for development and backward compatibility
const SEED_ACCOUNTS: StoredAccount[] = [
  {
    id: 'usr-scada-01',
    email: 'admin@sswh.io',
    name: 'Chief SCADA Operator',
    role: 'scada_operator',
    buildingName: 'Alpha Command Center',
    facilityId: 'FAC-CENTRAL-01',
    createdAt: '2026-01-15T08:00:00Z',
    passwordHash: 'password123',
  },
  {
    id: 'usr-fac-02',
    email: 'lead@sswh.io',
    name: 'Facilities Lead Engineer',
    role: 'facilities_lead',
    buildingName: 'SSWH Complex Tower Alpha',
    facilityId: 'FAC-ALPHA-01',
    createdAt: '2026-02-01T08:00:00Z',
    passwordHash: 'password123',
  },
  {
    id: 'usr-ten-03',
    email: 'resident@sswh.io',
    name: 'Alex Resident',
    role: 'tenant_observer',
    buildingName: 'Tower Alpha',
    apartment: 'Flat 402',
    flatId: 'FLAT-A402',
    createdAt: '2026-03-10T08:00:00Z',
    passwordHash: 'password123',
  },
  // Legacy backward-compat accounts
  {
    id: 'usr-legacy-scada',
    email: 'admin@waterwise.internal',
    name: 'John SCADA Lead',
    role: 'scada_operator',
    buildingName: 'Alpha Command Center',
    createdAt: '2026-01-01T08:00:00Z',
    passwordHash: 'password123',
  },
  {
    id: 'usr-legacy-fac',
    email: 'facilities@waterwise.internal',
    name: 'Sarah Facilities Mgr',
    role: 'facilities_lead',
    buildingName: 'Waterwise Industrial Park',
    createdAt: '2026-01-01T08:00:00Z',
    passwordHash: 'password123',
  },
  {
    id: 'usr-legacy-ten',
    email: 'tenant@waterwise.internal',
    name: 'Alex Resident',
    role: 'tenant_observer',
    buildingName: 'Block B',
    apartment: 'Apt 402',
    createdAt: '2026-01-01T08:00:00Z',
    passwordHash: 'password123',
  },
]

const getAccounts = (): StoredAccount[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (!raw) {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(SEED_ACCOUNTS))
      return SEED_ACCOUNTS
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_ACCOUNTS
  } catch {
    return SEED_ACCOUNTS
  }
}

const saveAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const accounts = getAccounts() // ensure seed accounts are initialized
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser
        if (parsed?.email) {
          // Cross-verify against authoritative account record to prevent client-side role tampering
          const cleanEmail = parsed.email.trim().toLowerCase()
          const matchedAccount = accounts.find(
            (a) => a.email.toLowerCase() === cleanEmail,
          )

          if (matchedAccount) {
            // Authoritative role comes strictly from account record, NOT from unverified session payload
            const authoritativeUser: AuthUser = {
              id: matchedAccount.id,
              userId: matchedAccount.userId,
              name: matchedAccount.name,
              fullName: matchedAccount.fullName || matchedAccount.name,
              email: matchedAccount.email,
              role: normalizeRole(matchedAccount.role),
              buildingName: matchedAccount.buildingName,
              buildingId: matchedAccount.buildingId,
              facilityId: matchedAccount.facilityId,
              apartment: matchedAccount.apartment,
              flatId: matchedAccount.flatId,
              createdAt: matchedAccount.createdAt,
              lastLoginAt: matchedAccount.lastLoginAt,
            }
            setUser(authoritativeUser)
            // Synchronize sanitized authoritative user state back to session cache
            localStorage.setItem(SESSION_KEY, JSON.stringify(authoritativeUser))
          } else {
            localStorage.removeItem(SESSION_KEY)
            setUser(null)
          }
        } else {
          localStorage.removeItem(SESSION_KEY)
          setUser(null)
        }
      }
    } catch (e) {
      console.error('Failed to restore session:', e)
      localStorage.removeItem(SESSION_KEY)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    await new Promise((r) => setTimeout(r, 350))

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: 'Email and password are required.' }
    }

    const accounts = getAccounts()
    const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail)

    if (!account) {
      return {
        success: false,
        error: 'No account found with this email. Please check your spelling or sign up.',
      }
    }

    if (account.passwordHash !== cleanPassword) {
      return {
        success: false,
        error: 'Incorrect password. Please verify your credentials and try again.',
      }
    }

    const now = new Date().toISOString()
    const authUser: AuthUser = {
      id: account.id,
      userId: account.userId,
      name: account.name,
      fullName: account.fullName || account.name,
      email: account.email,
      role: normalizeRole(account.role),
      buildingName: account.buildingName,
      buildingId: account.buildingId,
      facilityId: account.facilityId,
      apartment: account.apartment,
      flatId: account.flatId,
      createdAt: account.createdAt,
      lastLoginAt: now,
    }

    // Update lastLoginAt in account store
    const updated = accounts.map((a) =>
      a.id === account.id ? { ...a, lastLoginAt: now } : a,
    )
    saveAccounts(updated)

    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser))
    setUser(authUser)
    return { success: true, user: authUser }
  }

  const signUp = async (payload: SignUpPayload): Promise<AuthResult> => {
    await new Promise((r) => setTimeout(r, 400))

    const { name, email, password, buildingName, apartment, invitationCode } =
      payload
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return { success: false, error: 'Full name, email, and password are required.' }
    }

    if (cleanPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' }
    }

    const accounts = getAccounts()
    if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: 'An account with this email already exists. Please sign in instead.',
      }
    }

    // Determine authoritative role from valid invitation code or default to tenant_observer
    let role: UserRole = 'tenant_observer'
    const code = (invitationCode || '').trim().toUpperCase()
    if (code) {
      const mappedRole = INVITATION_CODES[code]
      if (!mappedRole) {
        return {
          success: false,
          error: 'Invalid authorization code. Leave the code empty for standard resident access.',
        }
      }
      role = mappedRole as UserRole
    }

    const newId = `usr-${Date.now()}`
    const newAccount: StoredAccount = {
      id: newId,
      userId: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: cleanName,
      fullName: cleanName,
      email: cleanEmail,
      role,
      buildingName: buildingName?.trim() || 'Main Residential Block',
      apartment: apartment?.trim() || '',
      flatId: apartment
        ? `FLAT-${apartment.trim().replace(/\s+/g, '')}`
        : undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      passwordHash: cleanPassword,
    }

    accounts.push(newAccount)
    saveAccounts(accounts)

    const authUser: AuthUser = {
      id: newAccount.id,
      userId: newAccount.userId,
      name: newAccount.name,
      fullName: newAccount.fullName,
      email: newAccount.email,
      role: normalizeRole(newAccount.role),
      buildingName: newAccount.buildingName,
      apartment: newAccount.apartment,
      flatId: newAccount.flatId,
      createdAt: newAccount.createdAt,
      lastLoginAt: newAccount.lastLoginAt,
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser))
    setUser(authUser)
    return { success: true, user: authUser }
  }

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const hasUserPermission = (permission: Permission): boolean => {
    if (!user) return false
    return checkPermission(user.role, permission)
  }

  const hasUserRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false
    return checkRole(user.role, role)
  }

  const resetUserPassword = async (
    email: string,
    newPassword: string,
  ): Promise<AuthResult> => {
    await new Promise((r) => setTimeout(r, 350))
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = newPassword.trim()

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: 'Email and new password are required.' }
    }
    if (cleanPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' }
    }

    const accounts = getAccounts()
    const idx = accounts.findIndex((a) => a.email.toLowerCase() === cleanEmail)
    if (idx === -1) {
      return { success: false, error: 'No account found with this email address.' }
    }

    accounts[idx].passwordHash = cleanPassword
    saveAccounts(accounts)
    return { success: true }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      hasPermission: hasUserPermission,
      hasRole: hasUserRole,
      resetPassword: resetUserPassword,
    }),
    [user, isLoading],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}