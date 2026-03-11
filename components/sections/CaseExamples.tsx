'use client'

import FadeUp from '@/components/ui/FadeUp'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import GlassCard from '@/components/ui/GlassCard'

const cases = [
  {
    tag: 'AI Startup',
    description:
      'A Series B AI startup was running LLM inference on over-provisioned GPU clusters with no auto-scaling.',
    before: 120000,
    after: 68000,
    savingsPct: 43,
    timeframe: '3 weeks',
    items: [
      'Spot instance migration for non-critical workloads',
      'Inference batching & model quantization',
      'Auto-scaling based on request queue depth',
    ],
  },
  {
    tag: 'SaaS Platform',
    description:
      'A mid-market SaaS company had orphaned reserved instances and no resource tagging across 3 AWS accounts.',
    before: 85000,
    after: 54000,
    savingsPct: 36,
    timeframe: '2 weeks',
    items: [
      'Reserved instance portfolio rebalancing',
      'Resource tagging & cost allocation',
      'Idle EC2 and RDS cleanup',
    ],
  },
  {
    tag: 'FinTech Scale-up',
    description:
      'A FinTech company was over-provisioning Kubernetes nodes with no VPA/HPA policies in place.',
    before: 210000,
    after: 127000,
    savingsPct: 40,
    timeframe: '4 weeks',
    items: [
      'VPA & HPA policy implementation',
      'Spot node pool migration',
      'Namespace-level resource quotas',
    ],
  },
]

export default function CaseExamples() {
  return (
    <section id="case-examples" aria-label="Case studies" className="section">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Results
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-tight mb-4">
            Real savings, real companies
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            From AI startups to enterprise SaaS — our FinOps engineers deliver
            measurable results fast.
          </p>
        </FadeUp>

        {/* Case cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {cases.map((c, i) => (
            <FadeUp key={c.tag} delay={i * 0.1}>
              <GlassCard hover padding="lg" className="h-full flex flex-col">
                {/* Tag */}
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-5 self-start">
                  {c.tag}
                </span>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {c.description}
                </p>

                {/* Numbers */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Before
                    </p>
                    <AnimatedCounter
                      from={c.before}
                      to={c.before}
                      prefix="$"
                      suffix="/mo"
                      className="text-lg font-bold text-gray-400 tabular-nums"
                    />
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(77,163,255,0.06)', border: '1px solid rgba(77,163,255,0.15)' }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
                      After
                    </p>
                    <AnimatedCounter
                      from={c.before}
                      to={c.after}
                      prefix="$"
                      suffix="/mo"
                      duration={1800}
                      className="text-lg font-bold text-primary tabular-nums"
                    />
                  </div>
                </div>

                {/* Savings highlight */}
                <div
                  className="rounded-xl px-5 py-4 flex items-center justify-between mb-6"
                  style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
                >
                  <span className="text-sm text-gray-500 font-medium">Savings</span>
                  <div className="flex items-center gap-2">
                    <AnimatedCounter
                      from={0}
                      to={c.savingsPct}
                      suffix="%"
                      duration={1600}
                      className="text-2xl font-extrabold text-green-600 tabular-nums"
                    />
                    <span className="text-xs text-gray-400">in {c.timeframe}</span>
                  </div>
                </div>

                {/* Action items */}
                <ul className="space-y-2 flex-1">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-gray-500"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="mt-0.5 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6l2.5 2.5L10 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeUp>
          ))}
        </div>

        {/* Aggregate stats bar */}
        <FadeUp>
          <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-glass">
            {[
              { value: 30, suffix: '%+', label: 'Average savings' },
              { value: 48, suffix: 'h', label: 'Audit turnaround' },
              { value: 2, suffix: 'wks', label: 'Time to results' },
              { value: 100, suffix: '%', label: 'Risk-free engagement' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <AnimatedCounter
                  from={0}
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={1600}
                  className="text-3xl font-extrabold text-gray-900 tabular-nums"
                />
                <span className="text-xs text-gray-400 mt-1.5 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
