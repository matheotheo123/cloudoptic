'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeUp from '@/components/ui/FadeUp'

const steps = [
  {
    number: '01',
    title: 'Free Infrastructure Review',
    description:
      'Share your current cloud setup and billing reports. Our FinOps experts analyze your infrastructure within 48 hours — completely free, no strings attached.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 6v5l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    detail: '48-hour turnaround',
  },
  {
    number: '02',
    title: 'Expert Optimization Plan',
    description:
      'Receive a detailed, actionable plan from a certified FinOps engineer. Clear recommendations, priority ranked by ROI, with projected savings for each action.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 6h14M4 11h10M4 16h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="17" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 13.5v1.5l1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    detail: 'Prioritized by ROI',
  },
  {
    number: '03',
    title: 'Immediate Cost Reduction',
    description:
      'Our engineers implement optimizations alongside your team. Most clients see measurable savings within the first 2 weeks of engagement.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 12l5 5 11-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    detail: 'Results in 2 weeks',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="section bg-gray-50/50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Process
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-tight mb-4">
            From audit to savings
            <br />
            <span className="text-gray-400">in three steps</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            A clear, low-friction path from cloud cost pain to measurable
            savings.
          </p>
        </FadeUp>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-gray-100"
            aria-hidden="true"
          >
            <motion.div
              className="w-full bg-primary rounded-full origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              style={{ height: '100%' }}
            />
          </div>

          <div className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.2,
                    duration: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    i > 0 ? 'lg:-mt-4' : ''
                  }`}
                >
                  {/* Content block */}
                  <div className={isLeft ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}>
                    <div
                      className={`glass rounded-2xl p-7 shadow-glass ${
                        isLeft ? '' : ''
                      }`}
                    >
                      {/* Number tag */}
                      <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        Step {step.number}
                      </span>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Detail chip */}
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(77,163,255,0.08)', border: '1px solid rgba(77,163,255,0.15)' }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <circle cx="5" cy="5" r="5" />
                        </svg>
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {/* Center node (desktop) */}
                  <div
                    className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center ${
                      isLeft ? '' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        delay: 0.5 + i * 0.2,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-glow-blue text-white z-10"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Mobile: icon above content */}
                  <div
                    className="lg:hidden flex items-center gap-4 mb-3"
                    aria-hidden="true"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                      {step.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-300">
                      {step.number}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
