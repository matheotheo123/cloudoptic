'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import FadeUp from '@/components/ui/FadeUp'

const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="20" height="14" rx="2" stroke="#4DA3FF" strokeWidth="1.8" />
        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#4DA3FF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 11v4M10 13h4" stroke="#4DA3FF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI GPU Waste',
    description:
      'AI workloads idle on expensive GPU instances 60–70% of the time, burning budget on compute you never use.',
    stat: '68%',
    statLabel: 'avg GPU idle time',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#4DA3FF" strokeWidth="1.8" />
        <path d="M12 6v6l4 2" stroke="#4DA3FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16l1.5-1.5M16 16l-1.5-1.5" stroke="#4DA3FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Runaway Cloud Bills',
    description:
      'AWS, GCP, and Azure bills spike unpredictably. Reserved instances go unused while on-demand costs spiral.',
    stat: '$2.4M',
    statLabel: 'avg annual waste',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#4DA3FF" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4DA3FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Inefficient Infrastructure',
    description:
      'Oversized Kubernetes clusters, untagged resources, and sprawling microservices silently drain your runway.',
    stat: '40%',
    statLabel: 'of infra is over-provisioned',
  },
]

export default function Problem() {
  return (
    <section id="problem" aria-label="Problems we solve" className="section bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <FadeUp className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            The Problem
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-tight mb-4">
            Cloud costs are out of control.
            <br />
            <span className="text-gray-400">And nobody&apos;s fixing them.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Most engineering teams don&apos;t have the bandwidth or expertise to
            optimize infrastructure costs. That&apos;s where we come in.
          </p>
        </FadeUp>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <FadeUp key={problem.title} delay={i * 0.1}>
              <GlassCard hover padding="lg" className="h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(77,163,255,0.08)', border: '1px solid rgba(77,163,255,0.15)' }}
                >
                  {problem.icon}
                </div>

                {/* Content */}
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed flex-1">
                  {problem.description}
                </p>

                {/* Stat */}
                <div className="mt-6 pt-5 border-t border-gray-100/80 flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-primary">
                    {problem.stat}
                  </span>
                  <span className="text-xs text-gray-400 mb-1 font-medium">
                    {problem.statLabel}
                  </span>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
