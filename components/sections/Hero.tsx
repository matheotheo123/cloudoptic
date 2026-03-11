'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import CloudBillVisual from '@/components/ui/CloudBillVisual'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

export default function Hero() {
  const handleCTA = () =>
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(77,163,255,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium bg-primary-light text-primary-dark border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" aria-hidden="true" />
                FinOps/AI Consulting and Brokerage
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-5"
            >
              Optimize Your AI
              <br />
              <span className="gradient-text">&amp; Cloud Infrastructure</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-[460px]"
            >
              Elite FinOps and AI engineers who reduce infrastructure spend
              and build smarter cloud architectures.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Button size="lg" onClick={handleCTA}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                  <path d="M8.5 1.5C5.46 1.5 3 3.96 3 7c0 1.87.93 3.52 2.36 4.53L4.5 15.5l3.5-1.5 3.5 1.5-.86-3.97A5.5 5.5 0 008.5 1.5z" fill="currentColor" fillOpacity="0.3" />
                  <circle cx="8.5" cy="7" r="2" fill="currentColor" />
                </svg>
                Book a Strategy Call
              </Button>
            </motion.div>

            {/* Neutral trust signals (no guarantees) */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 mt-10"
            >
              {[
                { value: 'AI + FinOps', label: 'Dual expertise' },
                { value: 'AWS · GCP · Azure', label: 'Multi-cloud' },
                { value: 'Zero', label: 'Commitment required' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: cycling visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative flex justify-center lg:justify-end"
          >
            <CloudBillVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
