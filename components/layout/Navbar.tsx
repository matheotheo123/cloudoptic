'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'For Companies', href: '/#solutions' },
  { label: 'For FinOps & AI Experts', href: '/for-experts' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-white/60 shadow-glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none"
            aria-label="Anthropi home"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {/* Cloud */}
                <path d="M14.5 9.8a2 2 0 00-1.3-1.8l-.1-.1A3.2 3.2 0 005.3 8a2 2 0 00-1.8 2 2 2 0 002 2h7a2 2 0 002-2.2z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="0.9" strokeLinejoin="round" />
                {/* Head */}
                <circle cx="9" cy="6.8" r="1.5" fill="white" />
                {/* Shoulders */}
                <path d="M6.4 11.6c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span className="font-bold text-[17px] text-gray-900 tracking-tight">
              Anthro<span className="text-primary">pi</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/80 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Primary CTA */}
          <div className="hidden md:flex">
            <Button size="sm" onClick={handleCTA}>
              Book a Strategy Call
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-gray-700 rounded block origin-center"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-full bg-gray-700 rounded block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-gray-700 rounded block origin-center"
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-4 right-4 z-40 glass rounded-2xl shadow-glass-hover p-4"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-1 border-t border-gray-100">
                <Button size="sm" className="w-full" onClick={handleCTA}>
                  Book a Strategy Call
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
