'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes } from 'react'

interface FadeUpProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
  as?: 'div' | 'section' | 'article' | 'span'
}

export default function FadeUp({
  delay = 0,
  duration = 0.55,
  as: Tag = 'div',
  className = '',
  children,
  ...props
}: FadeUpProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...(props as object)}
    >
      {children}
    </MotionTag>
  )
}
