'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── Panel 1: Cloud Spend ──────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
const BEFORE = 120000
const AFTER = 68000

function CloudSpendPanel() {
  const [bill, setBill] = useState(BEFORE)
  const [savings, setSavings] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    if (!isInView || started) return
    setStarted(true)
    const timeout = setTimeout(() => {
      const startTime = performance.now()
      const duration = 2400
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        setBill(Math.round(lerp(BEFORE, AFTER, ease(progress))))
        setSavings(Math.round(lerp(0, 43, ease(progress))))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, 400)
    return () => clearTimeout(timeout)
  }, [isInView, started])

  const barProgress = ((BEFORE - bill) / (BEFORE - AFTER)) * 100

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Monthly Cloud Spend
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-gray-900 tabular-nums">
              ${bill.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 mb-1">/mo</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={savings > 0 ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className="flex flex-col items-center px-4 py-2.5 rounded-2xl"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <span className="text-2xl font-extrabold text-green-600 tabular-nums">{savings}%</span>
          <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">Saved</span>
        </motion.div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-400">Before</span>
            <span className="text-xs font-semibold text-gray-500">$120,000</span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full w-full rounded-full bg-gray-300" />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-400">After</span>
            <span className="text-xs font-semibold text-primary">${bill.toLocaleString()}</span>
          </div>
          <div className="h-2.5 rounded-full bg-primary-light overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #4DA3FF, #2F80ED)' }}
              initial={{ width: '100%' }}
              animate={{ width: `${100 - barProgress * 0.43}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4 flex items-center justify-between mb-5"
        style={{ background: 'rgba(77,163,255,0.06)', border: '1px solid rgba(77,163,255,0.12)' }}>
        <div>
          <p className="text-xs text-gray-400 font-medium mb-0.5">Annual savings</p>
          <p className="text-lg font-bold text-primary tabular-nums">
            ${((BEFORE - bill) * 12).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-500">Optimization active</span>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Spend over time</p>
        <svg viewBox="0 0 280 56" className="w-full" aria-label="Cloud spend reduction chart">
          <defs>
            <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2F80ED" />
            </linearGradient>
            <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,8 L30,10 L60,15 L90,22 L120,30 L150,38 L180,42 L210,44 L240,46 L280,48 L280,56 L0,56 Z" fill="url(#areaGrad1)" />
          <path d="M0,8 L30,10 L60,15 L90,22 L120,30 L150,38 L180,42 L210,44 L240,46 L280,48" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="280" cy="48" r="3.5" fill="#2F80ED" />
          <circle cx="280" cy="48" r="6" fill="#2F80ED" fillOpacity="0.2" />
        </svg>
      </div>
    </div>
  )
}

/* ─── Panel 2: AI Infrastructure ─────────────────────────────────────────────── */
const GPU_FROM = 18
const GPU_TO = 84

function AIInfraPanel({ active }: { active: boolean }) {
  const [gpuUtil, setGpuUtil] = useState(GPU_FROM)
  const [cost, setCost] = useState(45200)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active || started) return
    setStarted(true)
    const timeout = setTimeout(() => {
      const startTime = performance.now()
      const duration = 2200
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        setGpuUtil(Math.round(lerp(GPU_FROM, GPU_TO, ease(progress))))
        setCost(Math.round(lerp(45200, 26400, ease(progress))))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, 400)
    return () => clearTimeout(timeout)
  }, [active, started])

  const agents = [
    { name: 'Inference API', util: Math.min(gpuUtil + 8, 100), color: '#4DA3FF' },
    { name: 'Training jobs', util: Math.max(gpuUtil - 12, 0), color: '#2F80ED' },
    { name: 'Agent workers', util: Math.min(gpuUtil + 2, 100), color: '#7C3AED' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Monthly AI Spend
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-gray-900 tabular-nums">
              ${cost.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 mb-1">/mo</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={gpuUtil > GPU_FROM + 5 ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className="flex flex-col items-center px-4 py-2.5 rounded-2xl"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
        >
          <span className="text-2xl font-extrabold text-violet-600 tabular-nums">{gpuUtil}%</span>
          <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-wider">GPU util</span>
        </motion.div>
      </div>

      {/* GPU workload bars */}
      <div className="space-y-3.5 mb-6">
        {agents.map((agent) => (
          <div key={agent.name}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-gray-400">{agent.name}</span>
              <span className="text-xs font-semibold tabular-nums" style={{ color: agent.color }}>
                {agent.util}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: agent.color }}
                initial={{ width: `${GPU_FROM}%` }}
                animate={{ width: `${agent.util}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Status row */}
      <div className="rounded-xl p-4 flex items-center justify-between mb-5"
        style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.12)' }}>
        <div>
          <p className="text-xs text-gray-400 font-medium mb-0.5">Annual savings</p>
          <p className="text-lg font-bold text-violet-600 tabular-nums">
            ${((45200 - cost) * 12).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-500">Agentic workflows active</span>
        </div>
      </div>

      {/* Mini chart */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">AI spend over time</p>
        <svg viewBox="0 0 280 56" className="w-full" aria-label="AI spend reduction chart">
          <defs>
            <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,10 L40,12 L80,18 L120,26 L160,36 L200,44 L240,47 L280,49 L280,56 L0,56 Z" fill="url(#areaGrad2)" />
          <path d="M0,10 L40,12 L80,18 L120,26 L160,36 L200,44 L240,47 L280,49" fill="none" stroke="url(#lineGrad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="280" cy="49" r="3.5" fill="#7C3AED" />
          <circle cx="280" cy="49" r="6" fill="#7C3AED" fillOpacity="0.2" />
        </svg>
      </div>
    </div>
  )
}

/* ─── Cycling wrapper ─────────────────────────────────────────────────────────── */
const PANELS = ['cloud', 'ai'] as const

export default function CloudBillVisual() {
  const [panelIdx, setPanelIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPanelIdx((p) => (p + 1) % 2), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-[420px]"
      aria-label="Infrastructure cost optimization dashboard"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4DA3FF, transparent)' }} aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2F80ED, transparent)' }} aria-hidden="true" />

      {/* Main card */}
      <div className="glass rounded-3xl shadow-glass p-7 relative overflow-hidden" style={{ minHeight: 380 }}>

        {/* Panel indicator dots */}
        <div className="absolute top-4 right-4 flex gap-1.5" aria-hidden="true">
          {PANELS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPanelIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === panelIdx ? 'bg-primary w-4' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {panelIdx === 0 ? (
            <motion.div
              key="cloud"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <CloudSpendPanel />
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <AIInfraPanel active={panelIdx === 1} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 12, x: 12 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 shadow-glass flex items-center gap-2.5"
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4DA3FF, #2F80ED)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1a3 3 0 100 6 3 3 0 000-6zM2 12c0-2.21 2.24-4 5-4s5 1.79 5 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-800 leading-none mb-0.5">Expert assigned</p>
          <p className="text-[10px] text-gray-400">AI & FinOps certified</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
