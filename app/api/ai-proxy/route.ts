/**
 * AI Proxy — Architecture stub for future AI features.
 *
 * PRD specifies: "Never call AI APIs directly from frontend."
 * All AI API calls must flow through this server-side proxy which:
 *  1. Authenticates the user
 *  2. Enforces rate limits
 *  3. Calls AI APIs server-side with keys from env vars
 *
 * This route is intentionally unimplemented until AI features are built.
 * The structure is in place to enforce backend isolation from day one.
 */

import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST() {
  // TODO: Implement when AI features are added
  // 1. Authenticate user (session / JWT)
  // 2. Enforce per-user rate limit via Upstash
  // 3. Call AI API server-side using process.env.OPENAI_API_KEY (or ANTHROPIC_API_KEY)
  // 4. Return sanitized response — never expose raw API responses

  return NextResponse.json(
    { error: 'AI proxy not yet implemented.' },
    { status: 501 }
  )
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
