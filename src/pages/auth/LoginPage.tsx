import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { getDashboardRoute, isRouteAllowedForRole } from '@/auth/permissions'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const result = await signIn(trimmedEmail, trimmedPassword)

      if (!result.success || !result.user) {
        setIsLoading(false)
        setError(result.error || 'Invalid credentials. Please verify and try again.')
        return
      }

      // Automatic Dashboard Redirection based on authenticated user profile & role
      const userRole = result.user.role
      const defaultDashboard = getDashboardRoute(userRole)

      const stateFrom = (location.state as { from?: string } | null)?.from
      let destination = defaultDashboard

      if (stateFrom && isRouteAllowedForRole(userRole, stateFrom)) {
        destination = stateFrom
      }

      navigate(destination, { replace: true })
    } catch (err) {
      setIsLoading(false)
      setError('An unexpected authentication error occurred. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Welcome to SSWH
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Sign in to access your SSWH-Smart Sustainable Water Harvesting environment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Error Alert Message */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-200 animate-in fade-in duration-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="flex-1 leading-relaxed">{error}</div>
          </div>
        )}

        {/* Email Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-300"
          >
            Work or Residential Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isLoading}
              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all duration-150 disabled:opacity-50"
              placeholder="operator@sswh.io or resident@sswh.io"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-300"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-[#73B9EE] hover:text-[#86CEFA] hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
              className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all duration-150 disabled:opacity-50"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#5494DA] hover:bg-[#73B9EE] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 shadow-lg shadow-[#5494DA]/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Authenticating Session...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Registration Link */}
      <div className="text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-[#73B9EE] hover:text-[#86CEFA] hover:underline transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}
