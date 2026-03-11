'use client'

import { useState } from 'react'
import FadeUp from '@/components/ui/FadeUp'
import Button from '@/components/ui/Button'
import ContactModal from '@/components/ui/ContactModal'
import ExpertModal from '@/components/ui/ExpertModal'

export default function CTASection() {
  const [auditOpen, setAuditOpen] = useState(false)
  const [expertOpen, setExpertOpen] = useState(false)

  return (
    <>
      <section id="cta" aria-label="Call to action" className="section">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EBF4FF 0%, #F8FBFF 50%, #EBF4FF 100%)',
                border: '1px solid rgba(77,163,255,0.2)',
              }}
            >
              {/* Decorations */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(77,163,255,0.12) 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(47,128,237,0.08) 0%, transparent 70%)',
                  transform: 'translate(-30%, 30%)',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 glass-blue rounded-3xl m-1 p-12 md:p-20 text-center">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                  Free Audit
                </span>

                <h2 className="text-[clamp(26px,4.5vw,48px)] font-extrabold text-gray-900 leading-tight mb-5">
                  Start Your Free
                  <br />
                  <span className="gradient-text">FinOps Audit</span>
                </h2>

                <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto">
                  Get a detailed infrastructure review from a certified FinOps engineer.
                  No commitment. Results in 48 hours.
                </p>

                {/* Primary CTA */}
                <Button size="lg" className="mb-5" onClick={() => setAuditOpen(true)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 1l2 6h6l-5 3.5 2 6L9 13l-5 3.5 2-6L1 7h6L9 1z" fill="currentColor" />
                  </svg>
                  Get Free Audit
                </Button>

                {/* Expert secondary link */}
                <div>
                  <button
                    onClick={() => setExpertOpen(true)}
                    className="text-sm text-gray-400 hover:text-primary transition-colors underline underline-offset-4"
                  >
                    I&apos;m a FinOps Expert
                  </button>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                  {['✓ No credit card', '✓ 48-hour turnaround', '✓ Zero commitment'].map((item) => (
                    <span key={item} className="text-sm font-medium text-gray-400">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContactModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
      <ExpertModal isOpen={expertOpen} onClose={() => setExpertOpen(false)} />
    </>
  )
}
