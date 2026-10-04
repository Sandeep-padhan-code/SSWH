import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Lock, CheckCircle } from 'lucide-react'

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => navigate('/login'), 1200)
    }, 400)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">Set New Security Credential</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">
          Establish cryptographic password for operator account
        </p>
      </div>

      {isSuccess ? (
        <div className="space-y-3 text-center font-mono">
          <div className="mx-auto w-10 h-10 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <CheckCircle className="h-5 w-5" />
          </div>
          <p className="text-xs text-slate-700 font-sans">
            Credential updated successfully. Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-left font-mono text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none"
                placeholder="Minimum 8 characters"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Update Credential
          </Button>

          <div className="text-center pt-1 font-mono">
            <Link to="/login" className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-2">
              Return to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
