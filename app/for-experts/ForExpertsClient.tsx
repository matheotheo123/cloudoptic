'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import ExpertModal from '@/components/ui/ExpertModal'

interface Job {
  id: string
  title: string
  description: string
  created_at: string
}

export default function ForExpertsClient({ jobs }: { jobs: Job[] }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeJobId, setActiveJobId] = useState<string | undefined>(undefined)
  const [activeJobTitle, setActiveJobTitle] = useState<string | undefined>(undefined)

  const openModal = (jobId?: string, jobTitle?: string) => {
    setActiveJobId(jobId)
    setActiveJobTitle(jobTitle)
    setModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />

        {/* Blue glow */}
        <div
          className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(77,163,255,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-6 w-full py-20">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium bg-primary-light text-primary-dark border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              FinOps Expert Network
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.08] tracking-tight text-gray-900 text-center mb-5">
            Open <span className="gradient-text">AI &amp; FinOps Positions</span>
          </h1>

          <p className="text-lg text-gray-500 text-center max-w-lg mx-auto mb-14">
            We match vetted FinOps/AI Engineers with companies optimizing their cloud and AI infrastructure.
          </p>

          {/* Jobs list */}
          <div className="glass rounded-2xl shadow-glass mb-10 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 px-6 py-3 border-b border-gray-100 bg-gray-50/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Action</span>
            </div>

            {jobs.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(77,163,255,0.07)', border: '1px solid rgba(77,163,255,0.15)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary" aria-hidden="true">
                    <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M11 7v4M11 15h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">No open positions right now</p>
                <p className="text-sm text-gray-400 max-w-xs">
                  Upload your resume and we&apos;ll match you when a relevant engagement opens up.
                </p>
              </div>
            ) : (
              /* Jobs rows */
              <div className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <div key={job.id} className="grid grid-cols-3 items-center px-6 py-4 hover:bg-gray-50/40 transition-colors">
                    <div>
                      <p className="text-[15px] font-semibold text-gray-800">{job.title}</p>
                      {job.description && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{job.description}</p>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-2">
                      {job.description || '—'}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => openModal(job.id, job.title)}
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer row */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
              <span className="text-xs text-gray-400">{jobs.length} open position{jobs.length !== 1 ? 's' : ''}</span>
              <span className="text-xs text-gray-400">Updated daily</span>
            </div>
          </div>

          {/* General CTA */}
          <div className="flex justify-center">
            <Button size="lg" onClick={() => openModal()}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <path d="M8.5 2v9M4 7l4.5-4.5L13 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 13h13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              Upload Resume
            </Button>
          </div>
        </div>
      </section>

      <ExpertModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        jobId={activeJobId}
        jobTitle={activeJobTitle}
      />
    </main>
  )
}
