const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Verify a Cloudflare Turnstile token server-side.
 * The secret key is only accessible here — never in client code.
 *
 * @param token  — token from the client Turnstile widget
 * @param ip     — optional client IP for additional verification
 * @returns      true if the token is valid
 */
export async function verifyTurnstile(
  token: string,
  ip?: string
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not set')
    // In development with the test site key, allow through
    if (process.env.NODE_ENV === 'development') return true
    return false
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
    ...(ip ? { remoteip: ip } : {}),
  })

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    if (!res.ok) return false

    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch {
    console.error('Turnstile verification request failed')
    return false
  }
}
