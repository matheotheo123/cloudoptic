import { requireAdmin } from '@/lib/require-admin'
import { supabaseAdmin } from '@/lib/supabase'
import DeleteCandidateButton from '@/app/admin/_components/DeleteCandidateButton'

export const dynamic = 'force-dynamic'

interface Candidate {
  id: string
  name: string
  email: string
  linkedin: string
  platforms: string[]
  experience: string
  resume_url: string | null
  job_id: string | null
  created_at: string
  jobs?: { title: string } | null
}

export default async function AppliedPage() {
  await requireAdmin()

  const { data: candidates } = await supabaseAdmin
    .from('candidates')
    .select('*, jobs(title)')
    .order('created_at', { ascending: false })

  const rows = (candidates ?? []) as Candidate[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applied</h1>
        <p className="text-sm text-gray-400 mt-1">{rows.length} candidate{rows.length !== 1 ? 's' : ''}</p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-gray-400 text-sm">No candidates yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Platforms</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Exp</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Job</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50/40 transition-colors ${i === rows.length - 1 ? 'border-none' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <a
                      href={c.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#4DA3FF] hover:underline"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{c.email}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {c.platforms.map((p) => (
                        <span key={p} className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{c.experience}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {c.jobs?.title ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                    <div>{new Date(c.created_at).toLocaleDateString()}</div>
                    {c.resume_url && (
                      <a
                        href={c.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4DA3FF] hover:underline"
                      >
                        Resume ↗
                      </a>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <DeleteCandidateButton id={c.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
