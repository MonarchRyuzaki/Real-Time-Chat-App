import { prisma } from "../services/prisma";
import { getClient } from "../services/redis";
import { CacheLayer } from "./CacheLayer";

interface User {
  username: string;
}

let userCache: CacheLayer<User> | null = null;

export async function getUserCache() {
  if (!userCache) {
    const redis = await getClient();
    if (!redis) {
      throw new Error("Redis client is not available");
    }

    await redis.bf.reserve("user", 0.01, 1000).catch(() => {});

    userCache = new CacheLayer<User>(
      "user",
      (key: string) => redis.bf.exists("user", key),
      (key: string) =>
        redis.get(key).then((val) => (val ? JSON.parse(val) : null)),
      (username: string) => prisma.user.findUnique({ where: { username } }),
      (key: string) => redis.bf.add("user", key),
      (key: string, value: User) => redis.set(key, JSON.stringify(value))
    );
  }

  return userCache;
}
