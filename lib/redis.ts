import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is required");
}

const globalForRedis = globalThis as unknown as {
    redis?: Redis;
}

export const redis = globalForRedis.redis ?? new Redis(redisUrl, { maxRetriesPerRequest: 1, enableReadyCheck: true });

globalForRedis.redis = redis;