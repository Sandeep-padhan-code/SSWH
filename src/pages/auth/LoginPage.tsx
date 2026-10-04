import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Lock, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { dashboardPathForRole } from '@/auth/permissions'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('admin@waterwise.internal')
  const [password, setPassword] = useState('password123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setError('')
    setIsLoading(true)

    const authenticated = await signIn(email, password)
    setIsLoading(false)

    if (!authenticated) {
      setError('Invalid email or password. Please check your operator credentials and try again.')
      return
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem('sswm.demo-auth-session') || '{}')
      const targetDashboard = dashboardPathForRole(savedUser.role)
      const destination = (location.state as { from?: string } | null)?.from || targetDashboard
      navigate(destination, { replace: true })
    } catch (err) {
      navigate('/dashboard', { replace: true })
    }
  }

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('password123')
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-[#10231F]">Welcome to SSWH.</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Sign in to access your role-based water management environment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-left font-mono text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Operator / User Work Email
          </label>
          <div className="relative">
            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none"
              placeholder="user@waterwise.internal"
            />
          </div>
        </div>

        {error && (
          <div role="alert" className="rounded-md border border-[#F0D3D3] bg-[#FFF8F8] p-3 font-sans text-xs text-[#C83D3D]">
            {error}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-700">
              Security Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[11px] text-slate-600 hover:text-slate-900 underline underline-offset-2"
            >
              Reset credential
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Quick Role Selection Cards */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] font-semibold uppercase text-slate-500 font-mono">
            Demo Account Quick Switch:
          </p>
          <div className="grid grid-cols-1 gap-1.5 font-sans">
            <button
              type="button"
              onClick={() => quickLogin('admin@waterwise.internal')}
              className={`p-2 rounded border text-left text-xs flex items-center justify-between cursor-pointer ${
                email === 'admin@waterwise.internal'
                  ? 'border-[#075B48] bg-[#E8F5F0] text-[#075B48] font-semibold'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div>
                <span className="block font-bold">1. SCADA Operator</span>
                <span className="text-[10px] text-slate-500 font-mono">admin@waterwise.internal (Full Controls)</span>
              </div>
              {email === 'admin@waterwise.internal' && <CheckCircle2 className="h-4 w-4 text-[#075B48]" />}
            </button>

            <button
              type="button"
              onClick={() => quickLogin('facilities@waterwise.internal')}
              className={`p-2 rounded border text-left text-xs flex items-center justify-between cursor-pointer ${
                email === 'facilities@waterwise.internal'
                  ? 'border-[#075B48] bg-[#E8F5F0] text-[#075B48] font-semibold'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div>
                <span className="block font-bold">2. Facilities Lead</span>
                <span className="text-[10px] text-slate-500 font-mono">facilities@waterwise.internal (Analytics & Maint)</span>
              </div>
              {email === 'facilities@waterwise.internal' && <CheckCircle2 className="h-4 w-4 text-[#075B48]" />}
            </button>

            <button
              type="button"
              onClick={() => quickLogin('tenant@waterwise.internal')}
              className={`p-2 rounded border text-left text-xs flex items-center justify-between cursor-pointer ${
                email === 'tenant@waterwise.internal'
                  ? 'border-[#075B48] bg-[#E8F5F0] text-[#075B48] font-semibold'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div>
                <span className="block font-bold">3. Tenant Observer</span>
                <span className="text-[10px] text-slate-500 font-mono">tenant@waterwise.internal (Read-Only Usage)</span>
              </div>
              {email === 'tenant@waterwise.internal' && <CheckCircle2 className="h-4 w-4 text-[#075B48]" />}
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
          {isLoading ? 'Authenticating Session...' : 'Sign In to Dashboard'}
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
        Default Password for all demo accounts:{' '}
        <span className="font-bold text-slate-900">password123</span>
      </div>
    </div>
  )
}
