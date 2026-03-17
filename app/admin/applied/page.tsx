import { supabaseAdmin } from '@/lib/supabase'
import DeleteCandidateButton from '@/app/admin/_components/DeleteCandidateButton'

export const dynamic = 'force-dynamic'

interface Candidate {
  id: string
  name: string
  email: string
  experience: string
  resume_url: string | null
  job_id: string | null
  created_at: string
  jobs?: { title: string } | null
}

export default async function AppliedPage() {
  const { data: candidates } = await supabaseAdmin
    .from('candidates')
    .select('id, name, email, experience, resume_url, job_id, created_at, jobs(title)')
    .order('created_at', { ascending: false })

  const rows = (candidates ?? []) as unknown as Candidate[]

  // Generate signed URLs for all resumes (valid 1 hour)
  const signedUrls: Record<string, string> = {}
  await Promise.all(
    rows
      .filter((c) => c.resume_url)
      .map(async (c) => {
        const { data } = await supabaseAdmin.storage
          .from('expert-resumes')
          .createSignedUrl(c.resume_url!, 3600)
        if (data?.signedUrl) signedUrls[c.id] = data.signedUrl
      })
  )

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
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Exp</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Job</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Resume</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50/40 transition-colors ${i === rows.length - 1 ? 'border-none' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900">{c.name}</div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{c.email}</td>
                  <td className="px-5 py-3.5 text-gray-500">{c.experience}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {c.jobs?.title ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    {signedUrls[c.id] ? (
                      <a href={signedUrls[c.id]} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#4DA3FF] hover:text-[#2F80ED] transition-colors">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                          <path d="M6.5 1v7M3.5 5.5l3 3 3-3M2 11h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Download
                      </a>
                    ) : (
                      <span className="text-xs text-gray-300">No file</span>
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
