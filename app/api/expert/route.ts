import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Inline service-role client — no module-level throw, no shared state
function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const name = String(formData.get('name') ?? '').trim().slice(0, 200)
  const email = String(formData.get('email') ?? '').trim().slice(0, 200)
  const jobId = String(formData.get('jobId') ?? '').trim() || null
  const resumeFile = formData.get('resume') as File | null

  let supabase
  try {
    supabase = getAdmin()
  } catch (err) {
    console.error('Supabase init error:', err)
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  // Upload resume to storage
  let resumeUrl: string | null = null
  if (resumeFile && resumeFile.size > 0) {
    try {
      const ext = (resumeFile.name.split('.').pop() ?? 'pdf').toLowerCase()
      const safeName = (name || 'applicant').replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)
      const path = `${Date.now()}-${safeName}.${ext}`
      const bytes = await resumeFile.arrayBuffer()

      const { error: uploadErr } = await supabase.storage
        .from('expert-resumes')
        .upload(path, Buffer.from(bytes), {
          contentType: resumeFile.type || 'application/octet-stream',
          upsert: false,
        })

      if (uploadErr) {
        console.error('Storage upload error:', uploadErr.message)
      } else {
        resumeUrl = path
      }
    } catch (err) {
      console.error('File processing error:', err)
    }
  }

  // Insert candidate row
  const { error: dbErr } = await supabase.from('candidates').insert({
    name: name || null,
    email: email || null,
    resume_url: resumeUrl,
    job_id: jobId,
  })

  if (dbErr) {
    console.error('DB insert error:', dbErr.message, dbErr.details, dbErr.hint)
    return NextResponse.json({ error: 'Failed to save application.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
