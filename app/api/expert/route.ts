import { NextRequest, NextResponse } from 'next/server'
import { ratelimit, getIp } from '@/lib/ratelimit'
import { verifyTurnstile } from '@/lib/turnstile'
import { supabaseAdmin } from '@/lib/supabase'
import { sendExpertNotification } from '@/lib/email'

function sanitize(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 2000)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidLinkedIn(url: string): boolean {
  return url.startsWith('https://linkedin.com') || url.startsWith('https://www.linkedin.com')
}

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
  const linkedin = sanitize(formData.get('linkedin'))
  const experience = sanitize(formData.get('experience'))
  const turnstileToken = sanitize(formData.get('turnstileToken'))
  const platformsRaw = formData.getAll('platforms').map((p) => String(p).trim())
  const resumeFile = formData.get('resume') as File | null

  // ── 3. Validation ───────────────────────────────────────────────────────────
  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Please provide your full name.' }, { status: 422 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 422 })
  }
  if (!linkedin || !isValidLinkedIn(linkedin)) {
    return NextResponse.json({ error: 'Please provide a valid LinkedIn URL.' }, { status: 422 })
  }
  if (!platformsRaw.length) {
    return NextResponse.json({ error: 'Please select at least one cloud platform.' }, { status: 422 })
  }
  if (!experience) {
    return NextResponse.json({ error: 'Please select your years of experience.' }, { status: 422 })
  }
  if (!turnstileToken) {
    return NextResponse.json({ error: 'Security check required.' }, { status: 422 })
  }
  if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Resume must be under 5MB.' }, { status: 422 })
  }

  // ── 4. Verify Turnstile ─────────────────────────────────────────────────────
  const turnstileValid = await verifyTurnstile(turnstileToken, ip)
  if (!turnstileValid) {
    return NextResponse.json(
      { error: 'Security check failed. Please refresh and try again.' },
      { status: 403 }
    )
  }

  // ── 5. Upload resume to Supabase Storage ────────────────────────────────────
  let resumeUrl: string | null = null
  if (resumeFile && resumeFile.size > 0) {
    try {
      const fileExt = resumeFile.name.split('.').pop() ?? 'pdf'
      const fileName = `${Date.now()}-${name.replace(/\s+/g, '-').toLowerCase()}.${fileExt}`
      const arrayBuffer = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabaseAdmin.storage
        .from('expert-resumes')
        .upload(fileName, buffer, {
          contentType: resumeFile.type || 'application/pdf',
          upsert: false,
        })

      if (uploadError) {
        console.error('Resume upload error:', uploadError)
        // Non-fatal — continue without resume URL
      } else {
        const { data: urlData } = supabaseAdmin.storage
          .from('expert-resumes')
          .getPublicUrl(fileName)
        resumeUrl = urlData.publicUrl
      }
    } catch (err) {
      console.error('Resume processing error:', err)
    }
  }

  // ── 6. Insert to Supabase ───────────────────────────────────────────────────
  const jobId = sanitize(formData.get('jobId')) || null
  const { error: dbError } = await supabaseAdmin.from('candidates').insert({
    name,
    email,
    linkedin,
    platforms: platformsRaw,
    experience,
    resume_url: resumeUrl,
    job_id: jobId || null,
    created_at: new Date().toISOString(),
  })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json(
      { error: 'Failed to save your application. Please try again.' },
      { status: 500 }
    )
  }

  // ── 7. Email notification ───────────────────────────────────────────────────
  await sendExpertNotification({
    name,
    email,
    linkedin,
    platforms: platformsRaw.join(', '),
    experience,
    resume_url: resumeUrl ?? undefined,
  })

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
