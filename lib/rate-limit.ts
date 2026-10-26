import { createHash, randomUUID } from "node:crypto";
import { redis } from "@/lib/redis";

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

type RateLimitResult = {
    allowed: boolean;
    remaining: number;
    retryAfter: number;
}

export async function checkEnquiryRateLimit(ip: string): Promise<RateLimitResult> {
    const ipHash = createHash("sha256").update(ip).digest("hex");
    const key = `rate-limit:enquiry-form:${ip}`;
    
    const now = Date.now();
    const member = `${now}:${randomUUID()}`;
    
    const result = await redis
    .multi()
    .zremrangebyscore(key, "-inf", now - WINDOW_MS)
    .zadd(key, now, member)
    .zcard(key)
    .pexpire(key, WINDOW_MS)
    .exec();
    
    if (!result) {
        throw new Error("Redis rate-limit transaction failed");
    }
    
    const count = Number(result[2][1]);
    
    if (count > LIMIT) {
        await redis.zrem(key, member);
        
        const oldest = (await redis.call("ZRANGE", key, "0", "0", "WITHSCORES")) as string[];
        
        const oldestTimestamp = oldest.length >= 2 ? Number(oldest[1]) : now;
        
        const retryAfter = Math.max(1, Math.ceil((oldestTimestamp + WINDOW_MS - now) / 1000));
        
        return {
            allowed: false,
            remaining: 0,
            retryAfter,
        }
    }
    
    return {
        allowed: true,
        remaining: LIMIT - count,
        retryAfter: 0,
    }
}