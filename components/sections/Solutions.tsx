'use client'

import FadeUp from '@/components/ui/FadeUp'
import Button from '@/components/ui/Button'

const solutions = [
  {
    problem: 'GPU clusters idle up to 70% of the time',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="2" y="7" width="22" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 7V5a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 12v4M11 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    featured: true,
    title: 'AI Infrastructure Optimization',
    description: 'We right-size your AI workloads so you only pay for compute you actually use.',
    bullets: [
      'GPU utilization audits',
      'Inference cost optimization',
      'Agentic AI pipeline design',
      'AI ops team augmentation',
    ],
  },
  {
    problem: 'Cloud bills spike with no visibility into why',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 2C7.48 2 3 6.48 3 12s4.48 10 10 10 10-4.48 10-10S18.52 2 13 2z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 12h20M13 2c-2.76 3.33-4 6.55-4 10s1.24 6.67 4 10M13 2c2.76 3.33 4 6.55 4 10s-1.24 6.67-4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    featured: false,
    title: 'Cloud Cost Reduction',
    description: 'We audit and fix AWS, GCP, and Azure spending end-to-end.',
    bullets: [
      'Multi-cloud billing audit',
      'Reserved instance planning',
      'Idle resource cleanup',
      'Cost tagging & governance',
    ],
  },
  {
    problem: 'No in-house AI expertise to move fast',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19 7l1.5 1.5L23 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    featured: false,
    title: 'Hire an AI Expert',
    description: 'We connect you with vetted AI engineers and FinOps experts ready to join your team.',
    bullets: [
      'Vetted AI engineers on-demand',
      'Deploy AI agents',
      'Fractional & full-time options',
      'Fast placement support',
    ],
  },
]

export default function Solutions() {
  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="solutions" aria-label="Our services" className="section">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            For Companies
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-tight mb-4">
            Every AI and cloud challenge
            <br className="hidden sm:block" />
            <span className="text-gray-400"> has a fix.</span>
          </h2>
        </FadeUp>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.1}>
              <div
                className={`relative h-full rounded-2xl p-7 flex flex-col ${
                  s.featured
                    ? 'bg-primary text-white shadow-glow-blue'
                    : 'glass shadow-glass'
                }`}
              >
                {/* Problem tag */}
                <span
                  className={`inline-block text-[11px] font-medium mb-5 px-3 py-1 rounded-full self-start ${
                    s.featured
                      ? 'bg-white/15 text-blue-100'
                      : 'bg-red-50 text-red-500 border border-red-100'
                  }`}
                >
                  ↑ {s.problem}
                </span>

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${
                    s.featured ? 'bg-white/15 text-white' : 'bg-primary-light text-primary'
                  }`}
                >
                  {s.icon}
                </div>

                <h3 className={`text-[18px] font-bold mb-2 ${s.featured ? 'text-white' : 'text-gray-900'}`}>
                  {s.title}
                </h3>
                <p className={`text-[15px] leading-relaxed mb-6 flex-1 ${s.featured ? 'text-blue-100' : 'text-gray-500'}`}>
                  {s.description}
                </p>

                <ul className="space-y-2 mb-7">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"
                        className={s.featured ? 'text-blue-200' : 'text-primary'}>
                        <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={s.featured ? 'text-blue-100' : 'text-gray-600'}>{b}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="ghost"
                  size="sm"
                  className={s.featured ? 'bg-white text-primary hover:bg-blue-50 w-full' : 'bg-primary-light text-primary hover:bg-primary/10 border border-primary/20 w-full'}
                  onClick={handleCTA}
                >
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
