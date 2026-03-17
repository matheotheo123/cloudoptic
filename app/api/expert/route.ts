import { NextRequest, NextResponse } from 'next/server'
import { ratelimit, getIp } from '@/lib/ratelimit'
import { supabaseAdmin } from '@/lib/supabase'
import { sendExpertNotification } from '@/lib/email'

function sanitize(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 2000)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
]

export async function POST(req: NextRequest) {
  // ── 1. Rate limiting ────────────────────────────────────────────────────────
  const ip = getIp(req)
  const { success: rateLimitOk } = await ratelimit.limit(`expert:${ip}`)
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    )
  }

  // ── 2. Parse multipart form data ────────────────────────────────────────────
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const name = sanitize(formData.get('name'))
  const email = sanitize(formData.get('email'))
  const experience = sanitize(formData.get('experience'))
  const jobId = sanitize(formData.get('jobId')) || null
  const resumeFile = formData.get('resume') as File | null

  // ── 3. Validation ───────────────────────────────────────────────────────────
  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Please provide your full name.' }, { status: 422 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 422 })
  }
  if (!experience) {
    return NextResponse.json({ error: 'Please select your years of experience.' }, { status: 422 })
  }
  if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Resume must be under 5MB.' }, { status: 422 })
  }

  // ── 4. Upload resume to Supabase Storage ────────────────────────────────────
  let resumePath: string | null = null
  if (resumeFile && resumeFile.size > 0) {
    try {
      const fileExt = resumeFile.name.split('.').pop()?.toLowerCase() ?? 'pdf'
      const safeName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)
      const fileName = `${Date.now()}-${safeName}.${fileExt}`
      const contentType = ALLOWED_MIME_TYPES.includes(resumeFile.type)
        ? resumeFile.type
        : 'application/octet-stream'
      const arrayBuffer = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabaseAdmin.storage
        .from('expert-resumes')
        .upload(fileName, buffer, { contentType, upsert: false })

      if (uploadError) {
        console.error('Resume upload error:', uploadError)
      } else {
        resumePath = fileName
      }
    } catch (err) {
      console.error('Resume processing error:', err)
    }
  }

  // ── 5. Insert to Supabase ───────────────────────────────────────────────────
  const { error: dbError } = await supabaseAdmin.from('candidates').insert({
    name,
    email,
    linkedin: '',
    platforms: [],
    experience,
    resume_url: resumePath,
    job_id: jobId,
    created_at: new Date().toISOString(),
  })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json(
      { error: 'Failed to save your application. Please try again.' },
      { status: 500 }
    )
  }

  // ── 6. Email notification ───────────────────────────────────────────────────
  await sendExpertNotification({
    name,
    email,
    linkedin: '',
    platforms: '',
    experience,
    resume_url: resumePath ?? undefined,
  })

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
