'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteCandidateButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this candidate? This cannot be undone.')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/candidates/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      router.refresh()
    } catch {
      alert('Failed to delete candidate.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      {loading ? '…' : 'Delete'}
    </button>
  )
}
