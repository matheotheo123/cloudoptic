'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/admin/applied')
    router.refresh()
  }

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#4DA3FF] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14.5 9.8a2 2 0 00-1.3-1.8l-.1-.1A3.2 3.2 0 005.3 8a2 2 0 00-1.8 2 2 2 0 002 2h7a2 2 0 002-2.2z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="0.9" strokeLinejoin="round" />
              <circle cx="9" cy="6.8" r="1.5" fill="white" />
              <path d="M6.4 11.6c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Admin Sign In</h1>
        <p className="text-sm text-gray-400 text-center mb-8">Anthropi dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="admin@anthropi.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div role="alert" className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#4DA3FF] text-white text-sm font-semibold hover:bg-[#2F80ED] disabled:opacity-60 transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
