'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const range = to - from

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      const current = from + range * easedProgress

      setValue(parseFloat(current.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setValue(to)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, from, to, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}
      {suffix}
    </span>
  )
}
