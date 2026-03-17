'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PLATFORMS = ['AWS', 'Azure', 'GCP']

interface Job {
  id: string
  title: string
  platforms: string[]
  description: string
  status: string
  created_at: string
}

export default function JobsClient({ jobs }: { jobs: Job[] }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const togglePlatform = (p: string) =>
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    if (!selectedPlatforms.length) {
      setError('Select at least one platform.')
      return
    }
    setCreating(true)
    setError('')
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), platforms: selectedPlatforms, description: description.trim() }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Failed to create job.')
      }
      setTitle('')
      setDescription('')
      setSelectedPlatforms([])
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create job.')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job? This cannot be undone.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      router.refresh()
    } catch {
      alert('Failed to delete job.')
    } finally {
      setDeletingId(null)
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all'

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
      {/* Jobs list */}
      <div>
        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-gray-400 text-sm">No jobs yet. Create one →</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Platforms</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => (
                  <tr key={job.id} className={`border-b border-gray-50 hover:bg-gray-50/40 transition-colors ${i === jobs.length - 1 ? 'border-none' : ''}`}>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{job.title}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {job.platforms.map((p) => (
                          <span key={p} className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        job.status === 'open' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deletingId === job.id}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        {deletingId === job.id ? '…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">New Job</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="e.g. FinOps Engineer"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Platforms *</p>
            <div className="flex gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedPlatforms.includes(p)
                      ? 'bg-[#4DA3FF] text-white border-[#4DA3FF]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Short description of the role…"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={creating}
            className="w-full py-2.5 rounded-xl bg-[#4DA3FF] text-white text-sm font-semibold hover:bg-[#2F80ED] disabled:opacity-60 transition-colors"
          >
            {creating ? 'Creating…' : 'Create Job'}
          </button>
        </form>
      </div>
    </div>
  )
}
