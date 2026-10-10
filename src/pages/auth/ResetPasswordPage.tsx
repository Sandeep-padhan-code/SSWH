import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setError('')

    const cleanEmail = email.trim()
    if (!cleanEmail) {
      setError('Please enter your account email.')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords match.')
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPassword(cleanEmail, newPassword)

      if (!result.success) {
        setIsLoading(false)
        setError(result.error || 'Failed to update password. Please check your email address.')
        return
      }

      setIsLoading(false)
      setIsSuccess(true)

      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 1500)
    } catch (err) {
      setIsLoading(false)
      setError('An unexpected error occurred while resetting password.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Set New Password
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Create a new security password for your SSWH account.
        </p>
      </div>

      {isSuccess ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#5494DA]/20 border border-[#5494DA]/40 text-[#5494DA] flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">Password Updated Successfully</h3>
            <p className="text-xs text-slate-300 font-sans">
              Your password has been reset. Redirecting to sign in...
            </p>
          </div>
          <Link
            to="/login"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#5494DA] hover:bg-[#73B9EE] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            <span>Go to Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-200 animate-in fade-in duration-200"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="resetEmail" className="block text-xs font-medium text-slate-300">
              Account Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="resetEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-[#5494DA] focus:outline-none focus:ring-1 focus:ring-[#5494DA] transition-all disabled:opacity-50"
                placeholder="user@example.com"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label htmlFor="newPassword" className="block text-xs font-medium text-slate-300">
              New Password (Min. 8 characters)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <label htmlFor="confirmNewPassword" className="block text-xs font-medium text-slate-300">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="confirmNewPassword"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#5494DA] hover:bg-[#73B9EE] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-lg shadow-[#5494DA]/30 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <span>Update Password</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#73B9EE] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
