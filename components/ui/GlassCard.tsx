'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  blue?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export default function GlassCard({
  hover = false,
  blue = false,
  padding = 'md',
  className = '',
  children,
  ...props
}: GlassCardProps) {
  const paddings = { sm: 'p-5', md: 'p-7', lg: 'p-10' }

  const base = blue ? 'glass-blue' : 'glass'

  return (
    <motion.div
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: '0 8px 40px rgba(77, 163, 255, 0.14), 0 2px 8px rgba(0,0,0,0.06)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`${base} rounded-2xl shadow-glass ${paddings[padding]} ${className}`}
      {...(props as object)}
    >
      {children}
    </motion.div>
  )
}
