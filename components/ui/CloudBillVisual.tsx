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

/* ─── Panel 2: AI Agents Deployed ────────────────────────────────────────────── */

// Node positions for the agent network graph
const NODES = [
  { id: 'orchestrator', x: 140, y: 52, label: 'Orchestrator', color: '#4DA3FF', r: 18 },
  { id: 'research',     x: 52,  y: 130, label: 'Research',    color: '#7C3AED', r: 13 },
  { id: 'coder',        x: 228, y: 130, label: 'Coder',       color: '#2F80ED', r: 13 },
  { id: 'analyst',      x: 80,  y: 210, label: 'Analyst',     color: '#06B6D4', r: 13 },
  { id: 'writer',       x: 200, y: 210, label: 'Writer',      color: '#10B981', r: 13 },
  { id: 'reviewer',     x: 140, y: 265, label: 'Reviewer',    color: '#F59E0B', r: 11 },
]

const EDGES = [
  ['orchestrator', 'research'],
  ['orchestrator', 'coder'],
  ['research', 'analyst'],
  ['coder', 'writer'],
  ['analyst', 'reviewer'],
  ['writer', 'reviewer'],
]

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!
}

function AgentNetworkPanel({ active }: { active: boolean }) {
  const [deployed, setDeployed] = useState(0)
  const [tasks, setTasks] = useState(0)
  const [pulse, setPulse] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  // Animate counters when panel becomes active
  useEffect(() => {
    if (!active || started) return
    setStarted(true)
    const t = setTimeout(() => {
      const start = performance.now()
      const dur = 1800
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        setDeployed(Math.round(lerp(0, 6, ease(p))))
        setTasks(Math.round(lerp(0, 247, ease(p))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 300)
    return () => clearTimeout(t)
  }, [active, started])

  // Pulse edges one by one
  useEffect(() => {
    if (!active) return
    let i = 0
    const id = setInterval(() => {
      setPulse(EDGES[i % EDGES.length][0] + '-' + EDGES[i % EDGES.length][1])
      i++
    }, 700)
    return () => clearInterval(id)
  }, [active])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            AI Agents Deployed
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-gray-900 tabular-nums">{deployed}</span>
            <span className="text-sm text-gray-400 mb-1">active agents</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={tasks > 0 ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className="flex flex-col items-center px-4 py-2.5 rounded-2xl"
          style={{ background: 'rgba(77,163,255,0.08)', border: '1px solid rgba(77,163,255,0.2)' }}
        >
          <span className="text-2xl font-extrabold text-primary tabular-nums">{tasks}</span>
          <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Tasks done</span>
        </motion.div>
      </div>

      {/* Agent network SVG */}
      <div className="rounded-2xl overflow-hidden mb-4"
        style={{ background: 'rgba(77,163,255,0.03)', border: '1px solid rgba(77,163,255,0.1)' }}>
        <svg viewBox="0 0 280 300" className="w-full" style={{ height: 188 }} aria-label="AI agent network diagram">
          <defs>
            <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Edges */}
          {EDGES.map(([a, b]) => {
            const na = getNode(a)
            const nb = getNode(b)
            const edgeId = `${a}-${b}`
            const isActive = pulse === edgeId
            return (
              <g key={edgeId}>
                <line
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={isActive ? na.color : '#E5E7EB'}
                  strokeWidth={isActive ? 1.8 : 1}
                  strokeDasharray={isActive ? '0' : '4 4'}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
                {/* Travelling dot */}
                {isActive && (
                  <circle r="3" fill={na.color}>
                    <animateMotion
                      dur="0.6s"
                      path={`M${na.x},${na.y} L${nb.x},${nb.y}`}
                      fill="freeze"
                    />
                  </circle>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {NODES.map((node) => (
            <g key={node.id}>
              {/* Glow ring on orchestrator */}
              {node.id === 'orchestrator' && (
                <circle cx={node.x} cy={node.y} r={node.r + 10} fill="url(#glowBlue)" />
              )}
              {/* Node circle */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r}
                fill={node.color}
                fillOpacity={0.15}
                stroke={node.color}
                strokeWidth={1.8}
                animate={active ? { r: [node.r, node.r + 1.5, node.r] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 1.5 }}
              />
              {/* Agent icon — small person silhouette */}
              <circle cx={node.x} cy={node.y - 3} r={node.r * 0.28} fill={node.color} />
              <path
                d={`M${node.x - node.r * 0.3},${node.y + node.r * 0.15} Q${node.x},${node.y + node.r * 0.55} ${node.x + node.r * 0.3},${node.y + node.r * 0.15}`}
                stroke={node.color} strokeWidth="1.2" fill="none" strokeLinecap="round"
              />
              {/* Label */}
              <text
                x={node.x} y={node.y + node.r + 10}
                textAnchor="middle"
                fontSize={node.id === 'orchestrator' ? 8.5 : 7.5}
                fontWeight="600"
                fill={node.color}
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Status row */}
      <div className="rounded-xl p-3.5 flex items-center justify-between"
        style={{ background: 'rgba(77,163,255,0.05)', border: '1px solid rgba(77,163,255,0.12)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-gray-500">Multi-agent pipeline running</span>
        </div>
        <span className="text-xs font-semibold text-primary">Live</span>
      </div>
    </div>
  )
}

/* ─── Cycling wrapper ─────────────────────────────────────────────────────────── */
const PANELS = ['cloud', 'agents'] as const

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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === panelIdx ? 'bg-primary w-4' : 'bg-gray-200 w-1.5'
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
              key="agents"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <AgentNetworkPanel active={panelIdx === 1} />
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
