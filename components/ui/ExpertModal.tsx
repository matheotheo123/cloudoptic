'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface ExpertModalProps {
  isOpen: boolean
  onClose: () => void
  jobId?: string
  jobTitle?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const EXPERIENCE_OPTIONS = ['1–2 years', '3–5 years', '6–9 years', '10+ years']

export default function ExpertModal({ isOpen, onClose, jobId, jobTitle }: ExpertModalProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    if (jobId) formData.set('jobId', jobId)

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/expert', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      formRef.current?.reset()
      setFileName(null)
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
    }, 300)
  }

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="expert-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 id="expert-modal-title" className="text-xl font-bold text-gray-900 mb-1">
                      {jobTitle ? `Apply: ${jobTitle}` : 'Join the FinOps Network'}
                    </h2>
                    <p className="text-sm text-gray-400">
                      We&apos;ll review your application and be in touch.
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

                {/* Success */}
                {status === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <path d="M5 14l6 6 12-12" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Application received!</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      We&apos;ll be in touch to discuss next steps.
                    </p>
                    <Button onClick={handleClose} variant="secondary">Close</Button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="expert-name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Full name <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <input id="expert-name" name="name" type="text" required autoComplete="name"
                          placeholder="Jane Smith" className={inputClass} />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="expert-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Email <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <input id="expert-email" name="email" type="email" required autoComplete="email"
                          placeholder="jane@email.com" className={inputClass} />
                      </div>

                      {/* Experience */}
                      <div>
                        <label htmlFor="expert-experience" className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Years of experience <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <select id="expert-experience" name="experience" required defaultValue=""
                          className={inputClass}>
                          <option value="" disabled>Select range</option>
                          {EXPERIENCE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Resume upload */}
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1.5">Resume (PDF or DOCX, max 5MB)</p>
                        <label
                          htmlFor="expert-resume"
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-dashed border-gray-200 hover:border-primary/40 cursor-pointer transition-colors bg-gray-50/50"
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-400 flex-shrink-0" aria-hidden="true">
                            <path d="M9 2v9M5 7l4-4 4 4M3 14h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className={`text-sm ${fileName ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                            {fileName ?? 'Upload your resume'}
                          </span>
                          <input
                            id="expert-resume"
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                          />
                        </label>
                      </div>

                      {/* Error */}
                      {status === 'error' && (
                        <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-red-500" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <p className="text-sm text-red-600">{errorMsg}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        loading={status === 'loading'}
                        className="w-full"
                      >
                        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
                      </Button>
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
