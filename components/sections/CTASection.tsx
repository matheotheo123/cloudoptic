'use client'

import { useState } from 'react'
import FadeUp from '@/components/ui/FadeUp'
import Button from '@/components/ui/Button'
import ContactModal from '@/components/ui/ContactModal'

export default function CTASection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section
        id="cta"
        aria-label="Call to action"
        className="section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EBF4FF 0%, #F8FBFF 50%, #EBF4FF 100%)',
                border: '1px solid rgba(77,163,255,0.2)',
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(77,163,255,0.12) 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(47,128,237,0.08) 0%, transparent 70%)',
                  transform: 'translate(-30%, 30%)',
                }}
                aria-hidden="true"
              />

              {/* Glass inner panel */}
              <div className="relative z-10 glass-blue rounded-3xl m-1 p-14 md:p-20 text-center">
                {/* Tag */}
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                  Free Audit
                </span>

                {/* Headline */}
                <h2 className="text-[clamp(28px,4.5vw,48px)] font-extrabold text-gray-900 leading-tight mb-5">
                  Stop Overpaying for
                  <br />
                  <span className="gradient-text">Cloud Infrastructure</span>
                </h2>

                {/* Subtext */}
                <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Get a free, detailed infrastructure review from a certified
                  FinOps engineer. No commitment, no sales pitch — just clear
                  savings opportunities.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 justify-center mb-10">
                  <Button size="lg" onClick={() => setModalOpen(true)}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M9 1l2.2 6.4H18L12.4 11l2.2 6.4L9 13.8l-5.6 3.6 2.2-6.4L0 7.4h6.8L9 1z"
                        fill="currentColor"
                      />
                    </svg>
                    Book Free Audit
                  </Button>
                  <Button variant="secondary" size="lg">
                    Talk to an Expert
                  </Button>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {[
                    '✓ No credit card required',
                    '✓ 48-hour turnaround',
                    '✓ Zero commitment',
                  ].map((item) => (
                    <span
                      key={item}
                      className="text-sm font-medium text-gray-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
