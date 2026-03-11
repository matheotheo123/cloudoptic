import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate limiter: 10 requests per 60 seconds per IP.
 * Used in API route handlers on the server — never exposed to client.
 */
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: false,
  prefix: 'anthropi:contact',
})

/**
 * Extract a safe IP identifier from the request.
 * Falls back to 'anonymous' if headers are unavailable.
 */
export function getIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // Take the first IP in the chain (client IP)
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') ?? 'anonymous'
}
