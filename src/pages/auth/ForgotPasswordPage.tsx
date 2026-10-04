import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 400)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">Credential Recovery</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">
          Enter registered operator email to receive credential reset token
        </p>
      </div>

      {isSubmitted ? (
        <div className="space-y-3 text-center font-mono">
          <div className="mx-auto w-10 h-10 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <CheckCircle className="h-5 w-5" />
          </div>
          <p className="text-xs text-slate-700 leading-normal font-sans">
            If an operator account exists for <span className="font-semibold text-slate-900">{email}</span>, a secure recovery token has been dispatched.
          </p>
          <Link to="/login" className="inline-block w-full">
            <Button variant="outline" className="w-full">
              Return to Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-left font-mono text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Operator Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none"
                placeholder="operator@waterwise.internal"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Generate Reset Token
          </Button>

          <div className="text-center pt-1 font-mono">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 underline underline-offset-2"
            >
              <ArrowLeft className="h-3 w-3" /> Back to sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
