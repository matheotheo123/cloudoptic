import { NextRequest, NextResponse } from 'next/server'
import { ratelimit, getIp } from '@/lib/ratelimit'
import { verifyTurnstile } from '@/lib/turnstile'
import { supabaseAdmin } from '@/lib/supabase'

// Allow only POST
export const runtime = 'edge'

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 2000)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  // ── 1. Rate limiting ────────────────────────────────────────────────────────
  const ip = getIp(req)
  const { success: rateLimitOk } = await ratelimit.limit(ip)

  if (!rateLimitOk) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    )
  }

  // ── 2. Parse body ───────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = sanitize(body.name)
  const email = sanitize(body.email)
  const company = sanitize(body.company)
  const cloud_spend = sanitize(body.cloud_spend)
  const message = sanitize(body.message)
  const turnstileToken = sanitize(body.turnstileToken)

  // ── 3. Input validation ─────────────────────────────────────────────────────
  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Please provide your full name.' }, { status: 422 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 422 })
  }
  if (!company) {
    return NextResponse.json({ error: 'Please provide your company name.' }, { status: 422 })
  }
  if (!cloud_spend) {
    return NextResponse.json({ error: 'Please select your monthly cloud spend.' }, { status: 422 })
  }
  if (!turnstileToken) {
    return NextResponse.json({ error: 'Security check required.' }, { status: 422 })
  }

  // ── 4. Verify Turnstile ─────────────────────────────────────────────────────
  const turnstileValid = await verifyTurnstile(turnstileToken, ip)
  if (!turnstileValid) {
    return NextResponse.json(
      { error: 'Security check failed. Please refresh and try again.' },
      { status: 403 }
    )
  }

  // ── 5. Persist to Supabase (server-side only, service role) ─────────────────
  const { error: dbError } = await supabaseAdmin.from('leads').insert({
    name,
    email,
    company,
    cloud_spend,
    message: message || null,
    created_at: new Date().toISOString(),
  })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json(
      { error: 'Failed to save your request. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
