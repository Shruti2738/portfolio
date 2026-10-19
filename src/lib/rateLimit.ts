interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  for (const [ip, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (record.timestamps.length === 0) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    rateLimitMap.set(ip, record);
    return { allowed: false, remaining: 0 };
  }

  record.timestamps.push(now);
  rateLimitMap.set(ip, record);

  return { allowed: true, remaining: limit - record.timestamps.length };
}
