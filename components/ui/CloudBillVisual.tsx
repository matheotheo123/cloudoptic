'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

const BEFORE = 120000
const AFTER = 68000
const SAVINGS_PCT = 43

export default function CloudBillVisual() {
  const [bill, setBill] = useState(BEFORE)
  const [savings, setSavings] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || started) return
    setStarted(true)

    // Delay before animation starts
    const timeout = setTimeout(() => {
      const startTime = performance.now()
      const duration = 2400

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutQuad(progress)

        setBill(Math.round(lerp(BEFORE, AFTER, eased)))
        setSavings(Math.round(lerp(0, SAVINGS_PCT, eased)))

        if (progress < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }, 600)

    return () => clearTimeout(timeout)
  }, [isInView, started])

  const barProgress = ((BEFORE - bill) / (BEFORE - AFTER)) * 100

  return (
    <motion.div
      ref={ref}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-[420px]"
      aria-label="Cloud cost optimization dashboard"
    >
      {/* Decorative background blur blobs */}
      <div
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4DA3FF, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2F80ED, transparent)' }}
        aria-hidden="true"
      />

      {/* Main glass card */}
      <div className="glass rounded-3xl shadow-glass p-7 relative">
        {/* Card header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Monthly Cloud Spend
            </p>
            <div className="flex items-end gap-2">
              <motion.span
                key={bill}
                className="text-4xl font-extrabold text-gray-900 tabular-nums"
              >
                ${bill.toLocaleString()}
              </motion.span>
              <span className="text-sm text-gray-400 mb-1">/mo</span>
            </div>
          </div>

          {/* Savings badge */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={savings > 0 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className="flex flex-col items-center px-4 py-2.5 rounded-2xl"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
            aria-label={`${savings}% savings`}
          >
            <span className="text-2xl font-extrabold text-green-600 tabular-nums">
              {savings}%
            </span>
            <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">
              Saved
            </span>
          </motion.div>
        </div>

        {/* Bill comparison bars */}
        <div className="space-y-4 mb-6">
          {/* Before */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-gray-400">Before</span>
              <span className="text-xs font-semibold text-gray-500">$120,000</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-full rounded-full bg-gray-300" />
            </div>
          </div>

          {/* After (animated) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-gray-400">After</span>
              <span className="text-xs font-semibold text-primary">
                ${bill.toLocaleString()}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-primary-light overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #4DA3FF, #2F80ED)',
                  width: `${100 - (barProgress * 0.43)}%`,
                }}
                initial={{ width: '100%' }}
                animate={{
                  width: `${100 - (barProgress * 0.43)}%`,
                }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>
        </div>

        {/* Savings summary row */}
        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: 'rgba(77,163,255,0.06)', border: '1px solid rgba(77,163,255,0.12)' }}
        >
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Annual savings</p>
            <p className="text-lg font-bold text-primary tabular-nums">
              ${((BEFORE - bill) * 12).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-500">
              Optimization active
            </span>
          </div>
        </div>

        {/* Mini chart */}
        <div className="mt-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Spend over time
          </p>
          <svg
            viewBox="0 0 280 56"
            className="w-full"
            aria-label="Cloud spend reduction chart"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2F80ED" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path
              d="M0,8 L30,10 L60,15 L90,22 L120,30 L150,38 L180,42 L210,44 L240,46 L280,48 L280,56 L0,56 Z"
              fill="url(#areaGrad)"
            />
            {/* Line */}
            <path
              d="M0,8 L30,10 L60,15 L90,22 L120,30 L150,38 L180,42 L210,44 L240,46 L280,48"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dot at end */}
            <circle cx="280" cy="48" r="3.5" fill="#2F80ED" />
            <circle cx="280" cy="48" r="6" fill="#2F80ED" fillOpacity="0.2" />
          </svg>
        </div>
      </div>

      {/* Floating badge: expert assigned */}
      <motion.div
        initial={{ opacity: 0, y: 12, x: 12 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 shadow-glass flex items-center gap-2.5"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4DA3FF, #2F80ED)' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1a3 3 0 100 6 3 3 0 000-6zM2 12c0-2.21 2.24-4 5-4s5 1.79 5 4"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-800 leading-none mb-0.5">
            Expert assigned
          </p>
          <p className="text-[10px] text-gray-400">FinOps certified</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
