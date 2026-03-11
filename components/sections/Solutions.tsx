'use client'

import FadeUp from '@/components/ui/FadeUp'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'

const solutions = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="22" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8V6a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 13v4M12 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="21" cy="8" r="3.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 6.5v1.5l1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Most Popular',
    title: 'AI Infrastructure Optimization',
    description:
      'Slash GPU costs and model serving expenses with right-sizing, spot instances, and intelligent auto-scaling strategies tailored to your AI workloads.',
    bullets: [
      'GPU utilization audits',
      'Inference cost optimization',
      'Training pipeline efficiency',
      'Model serving right-sizing',
    ],
    href: '#cta',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3C8.48 3 4 7.48 4 13s4.48 10 10 10 10-4.48 10-10S19.52 3 14 3z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 13h20M14 3c-2.76 3.33-4 6.55-4 10s1.24 6.67 4 10M14 3c2.76 3.33 4 6.55 4 10s-1.24 6.67-4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: null,
    title: 'Cloud Cost Reduction',
    description:
      'Comprehensive audit and optimization of AWS, GCP, and Azure spending. From reserved instance strategy to idle resource cleanup.',
    bullets: [
      'Multi-cloud billing audit',
      'Reserved instance planning',
      'Idle resource elimination',
      'Cost allocation & tagging',
    ],
    href: '#cta',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4L4 9v10l10 5 10-5V9L14 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 9l10 5 10-5M14 14v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2.5" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
    label: null,
    title: 'Kubernetes Optimization',
    description:
      'Improve cluster efficiency and reduce compute waste with intelligent resource requests, limits, and workload scheduling.',
    bullets: [
      'Resource request tuning',
      'Node pool right-sizing',
      'Horizontal pod autoscaling',
      'Spot/preemptible migration',
    ],
    href: '#cta',
  },
]

export default function Solutions() {
  const handleCTA = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="solutions" aria-label="Our services" className="section">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Services
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-tight mb-4">
            Elite engineers for every
            <br className="hidden sm:block" /> cloud cost challenge
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We match you with certified FinOps experts who specialize in your
            specific stack and cloud provider.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.1}>
              <div
                className={`relative h-full rounded-2xl p-7 flex flex-col ${
                  i === 0
                    ? 'bg-primary text-white shadow-glow-blue'
                    : 'glass shadow-glass'
                }`}
              >
                {/* Popular badge */}
                {s.label && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white">
                    {s.label}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                    i === 0
                      ? 'bg-white/15 text-white'
                      : 'bg-primary-light text-primary'
                  }`}
                >
                  {s.icon}
                </div>

                {/* Title & description */}
                <h3
                  className={`text-[18px] font-bold mb-2 ${
                    i === 0 ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`text-[15px] leading-relaxed mb-6 flex-1 ${
                    i === 0 ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {s.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-7">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className={i === 0 ? 'text-blue-200' : 'text-primary'}
                      >
                        <path
                          d="M2 7l3.5 3.5L12 3"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={i === 0 ? 'text-blue-100' : 'text-gray-600'}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={i === 0 ? 'ghost' : 'secondary'}
                  size="sm"
                  className={
                    i === 0
                      ? 'bg-white text-primary hover:bg-blue-50 w-full'
                      : 'w-full'
                  }
                  onClick={(e) => handleCTA(e, s.href)}
                >
                  Get Started
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
