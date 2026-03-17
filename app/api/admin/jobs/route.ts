import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { title?: string; platforms?: string[]; description?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const title = (body.title ?? '').trim().slice(0, 200)
  const platforms = Array.isArray(body.platforms) ? body.platforms : []
  const description = (body.description ?? '').trim().slice(0, 2000)

  if (!title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 422 })
  }
  if (!platforms.length) {
    return NextResponse.json({ error: 'At least one platform is required.' }, { status: 422 })
  }

  const { data, error } = await supabaseAdmin
    .from('jobs')
    .insert({ title, platforms, description, status: 'open' })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to create job.' }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
