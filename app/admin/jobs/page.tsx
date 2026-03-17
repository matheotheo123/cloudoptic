import { requireAdmin } from '@/lib/require-admin'
import { supabaseAdmin } from '@/lib/supabase'
import JobsClient from './_components/JobsClient'

export const dynamic = 'force-dynamic'

export default async function JobsPage() {
  await requireAdmin()

  const { data: jobs } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <p className="text-sm text-gray-400 mt-1">{(jobs ?? []).length} job{(jobs ?? []).length !== 1 ? 's' : ''}</p>
      </div>

      <JobsClient jobs={jobs ?? []} />
    </div>
  )
}
