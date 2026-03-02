// Shared dual-key rate limiter for Supabase Edge Functions
// Limits by both email and IP independently to prevent rotation attacks

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Email: 5 requests per hour
const EMAIL_LIMIT = 5;
// IP: 10 requests per hour
const IP_LIMIT = 10;
// Window: 1 hour in milliseconds
const WINDOW_MS = 3600000;
// Cleanup interval: 5 minutes
const CLEANUP_INTERVAL_MS = 300000;

// Periodic cleanup of stale entries to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, CLEANUP_INTERVAL_MS);

function checkKey(key: string, limit: number): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || record.resetTime < now) {
    rateLimitMap.set(key, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

/**
 * Check rate limits for both email and IP.
 * Returns not-allowed if either key exceeds its limit.
 */
export function checkRateLimit(
  email: string,
  ip: string,
): { allowed: boolean; retryAfter?: number } {
  const emailResult = checkKey(`email:${email}`, EMAIL_LIMIT);
  if (!emailResult.allowed) {
    return emailResult;
  }

  const ipResult = checkKey(`ip:${ip}`, IP_LIMIT);
  if (!ipResult.allowed) {
    return ipResult;
  }

  return { allowed: true };
}

/**
 * Extract client IP from request headers.
 * Priority: x-real-ip > cf-connecting-ip > x-forwarded-for (first) > "unknown"
 */
export function getClientIp(req: Request): string {
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;

  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }

  return 'unknown';
}
