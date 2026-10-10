import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building, Home, KeyRound, Eye, EyeOff, AlertCircle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { getDashboardRoute } from '@/auth/permissions'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [apartment, setApartment] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const [showPrivilegedField, setShowPrivilegedField] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setError('')
    setSuccessMessage('')

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanBuilding = buildingName.trim()
    const cleanApartment = apartment.trim()

    if (!cleanName || !cleanEmail || !password) {
      setError('Please fill in all required fields.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters in length.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.')
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp({
        name: cleanName,
        email: cleanEmail,
        password,
        buildingName: cleanBuilding || 'Main Residential Block',
        apartment: cleanApartment || 'Unit 101',
        invitationCode: showPrivilegedField ? invitationCode : undefined,
      })

      if (!result.success || !result.user) {
        setIsLoading(false)
        setError(result.error || 'Failed to create account. Please try again.')
        return
      }

      setSuccessMessage('Account created successfully! Redirecting to your dashboard...')
      
      const destination = getDashboardRoute(result.user.role)
      setTimeout(() => {
        navigate(destination, { replace: true })
      }, 700)
    } catch (err) {
      setIsLoading(false)
      setError('An unexpected error occurred during account creation.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Create SSWH Account
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Register for SSWH-Smart Sustainable Water Harvesting & resident access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-200 animate-in fade-in duration-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="flex-1 leading-relaxed">{error}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-200 animate-in fade-in duration-200"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
            <div className="flex-1 leading-relaxed">{successMessage}</div>
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="fullName" className="block text-xs font-medium text-slate-300">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
              placeholder="e.g. Alex Morgan"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="registerEmail" className="block text-xs font-medium text-slate-300">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="registerEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
              placeholder="alex@example.com"
            />
          </div>
        </div>

        {/* Building & Flat/Unit Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="building" className="block text-xs font-medium text-slate-300">
              Building / Complex
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="building"
                type="text"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                disabled={isLoading}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
                placeholder="Tower Alpha"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="apartment" className="block text-xs font-medium text-slate-300">
              Flat / Unit Number
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="apartment"
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                disabled={isLoading}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
                placeholder="Flat 402"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="regPassword" className="block text-xs font-medium text-slate-300">
            Password (Min. 8 characters) *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="regPassword"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
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

        {/* Confirm Password */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-300">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Privileged Role Provisioning Code Toggle */}
        <div className="pt-1">
          {!showPrivilegedField ? (
            <button
              type="button"
              onClick={() => setShowPrivilegedField(true)}
              className="text-[11px] text-slate-400 hover:text-[#73B9EE] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <KeyRound className="h-3 w-3" />
              <span>Have a facility engineer or operator invitation key?</span>
            </button>
          ) : (
            <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/90 border border-[#5494DA]/30">
              <div className="flex items-center justify-between">
                <label htmlFor="invitationCode" className="block text-xs font-medium text-[#86CEFA]">
                  Privileged Authorization Passcode
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowPrivilegedField(false)
                    setInvitationCode('')
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-300"
                >
                  Cancel
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73B9EE]/80 pointer-events-none" />
                <input
                  id="invitationCode"
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] uppercase tracking-wider font-mono"
                  placeholder="e.g. SCADA-OPS-2026 or FAC-LEAD-2026"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Authorized field engineers only. Standard residents should leave this blank.
              </p>
            </div>
          )}
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
              <span>Registering Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-[#73B9EE] hover:text-[#86CEFA] hover:underline transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
