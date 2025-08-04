import { Redis } from "ioredis";

let client: Redis | null = null;

export async function connectToIoRedis() {
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
  client = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    username: "default",
    password: process.env.REDIS_PASSWORD,
  });
  await client.connect();
  console.log("Connected to Redis");
  return client;
}

export async function getIoClient() {
  if (!client) {
    await connectToIoRedis();
  }
  return client as Redis;
}

export function disconnectFromIoRedis() {
  if (client) {
    client.disconnect();
    console.log("Disconnected from Redis");
    client = null;
  }
}
