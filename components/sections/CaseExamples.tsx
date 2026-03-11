'use client'

import FadeUp from '@/components/ui/FadeUp'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { motion } from 'framer-motion'

const metrics = [
  {
    value: 30,
    suffix: '%+',
    label: 'Average Cloud Savings',
    sub: 'Across all client engagements',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 17l5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'text-green-600',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.18)',
  },
  {
    value: 48,
    suffix: 'h',
    label: 'Audit Turnaround',
    sub: 'From request to full report',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 6v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'text-primary',
    bg: 'rgba(77,163,255,0.08)',
    border: 'rgba(77,163,255,0.18)',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Environments Optimized',
    sub: 'AWS, GCP, and Azure combined',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 11l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'text-violet-600',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.15)',
  },
]

export default function CaseExamples() {
  return (
    <section id="case-examples" aria-label="Results" className="section">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Results
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-tight mb-4">
            Numbers that speak for themselves
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Real outcomes from real engagements across AI startups, SaaS platforms, and enterprise teams.
          </p>
        </FadeUp>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {metrics.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(77,163,255,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass rounded-2xl p-8 text-center shadow-glass flex flex-col items-center"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${m.color}`}
                  style={{ background: m.bg, border: `1px solid ${m.border}` }}
                >
                  {m.icon}
                </div>

                {/* Counter */}
                <AnimatedCounter
                  from={0}
                  to={m.value}
                  suffix={m.suffix}
                  duration={1800}
                  className={`text-5xl font-extrabold tabular-nums ${m.color}`}
                />

                <p className="text-[17px] font-semibold text-gray-800 mt-3 mb-1">
                  {m.label}
                </p>
                <p className="text-sm text-gray-400">{m.sub}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Social proof quote */}
        <FadeUp>
          <div
            className="glass rounded-2xl p-8 md:p-10 text-center shadow-glass"
            style={{ background: 'rgba(77,163,255,0.04)', borderColor: 'rgba(77,163,255,0.15)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-4 text-primary/30" aria-hidden="true">
              <path d="M6 20c0-6 4-10 8-12l2 3c-2.5 1.5-4 3.5-4 5h4v8H6v-4zm14 0c0-6 4-10 8-12l2 3c-2.5 1.5-4 3.5-4 5h4v8H20v-4z" fill="currentColor" />
            </svg>
            <p className="text-lg text-gray-600 italic max-w-2xl mx-auto mb-5 leading-relaxed">
              &ldquo;CloudOptic cut our monthly AI infrastructure bill from $120k to $68k in three weeks.
              The ROI was immediate and the process was completely hands-off for our engineering team.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                JK
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Jordan K.</p>
                <p className="text-xs text-gray-400">CTO, Series B AI Startup</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
