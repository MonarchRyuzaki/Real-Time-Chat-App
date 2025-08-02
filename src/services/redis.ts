import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function connectToRedis() {
  if (client) return client;
  if (
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
  ) {
    throw new Error(
      "Redis connection parameters are not set in environment variables"
    );
  }
  client = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  });
  await client.connect();
  console.log("Connected to Redis");
  return client;
}

export async function getClient() {
  if (!client) {
    await connectToRedis();
  }
  return client;
}

export function disconnectFromRedis() {
  if (client) {
    client.destroy();
    console.log("Disconnected from Redis");
    client = null;
  }
}
