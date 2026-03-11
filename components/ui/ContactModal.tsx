'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Turnstile } from '@marsidev/react-turnstile'
import Button from '@/components/ui/Button'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const CLOUD_SPEND_OPTIONS = [
  'Under $10k/month',
  '$10k – $50k/month',
  '$50k – $150k/month',
  '$150k – $500k/month',
  '$500k+/month',
]

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!turnstileToken) {
      setErrorMsg('Please complete the security check.')
      return
    }

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem('company') as HTMLInputElement).value.trim(),
      cloud_spend: (form.elements.namedItem('cloud_spend') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
      turnstileToken,
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      formRef.current?.reset()
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const handleClose = () => {
    if (status === 'loading') return
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setErrorMsg('')
      setTurnstileToken(null)
    }, 300)
  }

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2
                      id="modal-title"
                      className="text-xl font-bold text-gray-900 mb-1"
                    >
                      Book Your Free Audit
                    </h2>
                    <p className="text-sm text-gray-400">
                      We&apos;ll respond within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
                    aria-label="Close modal"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Success state */}
                {status === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <path d="M5 14l6 6 12-12" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      You&apos;re all set!
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      We&apos;ve received your request and will be in touch within 24
                      hours with your audit details.
                    </p>
                    <Button onClick={handleClose} variant="secondary">
                      Close
                    </Button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-gray-700 mb-1.5"
                        >
                          Full name <span aria-hidden="true" className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jane Smith"
                          className={inputClass}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-gray-700 mb-1.5"
                        >
                          Work email <span aria-hidden="true" className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jane@company.com"
                          className={inputClass}
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-semibold text-gray-700 mb-1.5"
                        >
                          Company <span aria-hidden="true" className="text-primary">*</span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          autoComplete="organization"
                          placeholder="Acme Corp"
                          className={inputClass}
                        />
                      </div>

                      {/* Cloud spend */}
                      <div>
                        <label
                          htmlFor="cloud_spend"
                          className="block text-xs font-semibold text-gray-700 mb-1.5"
                        >
                          Monthly cloud spend <span aria-hidden="true" className="text-primary">*</span>
                        </label>
                        <select
                          id="cloud_spend"
                          name="cloud_spend"
                          required
                          className={inputClass}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select a range
                          </option>
                          {CLOUD_SPEND_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold text-gray-700 mb-1.5"
                        >
                          Tell us about your main cost challenges
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="e.g. We have GPU clusters running 24/7 but only used during business hours..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      {/* Turnstile */}
                      <div className="flex justify-center">
                        <Turnstile
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onError={() => setTurnstileToken(null)}
                          onExpire={() => setTurnstileToken(null)}
                          options={{ theme: 'light', size: 'normal' }}
                        />
                      </div>

                      {/* Error message */}
                      {status === 'error' && (
                        <div
                          role="alert"
                          className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-red-500" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <p className="text-sm text-red-600">{errorMsg}</p>
                        </div>
                      )}

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        loading={status === 'loading'}
                        className="w-full"
                        disabled={!turnstileToken}
                      >
                        {status === 'loading' ? 'Submitting…' : 'Book My Free Audit'}
                      </Button>

                      <p className="text-[11px] text-gray-400 text-center">
                        By submitting you agree to our{' '}
                        <a href="#" className="underline hover:text-gray-600">
                          Privacy Policy
                        </a>
                        . No spam, ever.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
