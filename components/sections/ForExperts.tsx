'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import Button from '@/components/ui/Button'
import ExpertModal from '@/components/ui/ExpertModal'

const perks = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1l2 6h6l-5 3.5 2 6L9 13l-5 3.5 2-6L1 7h6L9 1z" fill="currentColor" fillOpacity="0.9" />
      </svg>
    ),
    text: 'High-value client engagements',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 5V4a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
    text: 'Flexible remote contracts',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 9h14M9 2c-2 2.5-3 5-3 7s1 4.5 3 7M9 2c2 2.5 3 5 3 7s-1 4.5-3 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    text: 'Work across AWS, GCP & Azure',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l2 6h6l-5 3.5L14 17 9 14l-5 3 2-5.5L1 8h6L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Elite FinOps community',
  },
]

export default function ForExperts() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section
        id="for-experts"
        aria-label="For FinOps Experts"
        className="section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0D1117 0%, #0f1f3d 100%)',
            }}
          >
            {/* Decorative glows */}
            <div
              className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(77,163,255,0.12) 0%, transparent 65%)',
                transform: 'translate(-30%, -30%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(47,128,237,0.1) 0%, transparent 65%)',
                transform: 'translate(30%, 30%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 md:p-16 items-center">
              {/* Left: copy */}
              <FadeUp>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  For FinOps Experts
                </span>
                <h2 className="text-[clamp(26px,3.5vw,38px)] font-extrabold text-white leading-tight mb-4">
                  Work with companies optimizing{' '}
                  <span className="text-primary">millions in cloud spend.</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
                  Join our vetted network of FinOps engineers and get matched with high-impact engagements.
                </p>

                {/* Perks */}
                <ul className="space-y-3 mb-10">
                  {perks.map((perk) => (
                    <li key={perk.text} className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-primary"
                        style={{ background: 'rgba(77,163,255,0.15)' }}
                      >
                        {perk.icon}
                      </span>
                      <span className="text-sm text-gray-300">{perk.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary text-white border-0 hover:bg-primary-dark btn-glow"
                  onClick={() => setModalOpen(true)}
                >
                  Join FinOps Network
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </FadeUp>

              {/* Right: stats */}
              <FadeUp delay={0.15}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '$2M+', label: 'Cloud spend managed per expert annually' },
                    { value: '3–6', label: 'Active engagements at peak' },
                    { value: '48h', label: 'Typical time to first match' },
                    { value: '100%', label: 'Remote & async-friendly' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="rounded-2xl p-5"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <p className="text-2xl font-extrabold text-white mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <ExpertModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
