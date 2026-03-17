import { supabaseAdmin } from '@/lib/supabase'
import ForExpertsClient from './ForExpertsClient'

export const dynamic = 'force-dynamic'

export default async function ForExpertsPage() {
  const { data: jobs } = await supabaseAdmin
    .from('jobs')
    .select('id, title, platforms, description, created_at')
    .eq('status', 'open')
    .order('created_at', { ascending: false })

  return <ForExpertsClient jobs={jobs ?? []} />
}
