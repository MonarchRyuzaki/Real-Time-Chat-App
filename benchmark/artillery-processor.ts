import { createClient, RedisClientType } from "redis";
import { generateChatId } from "../src/utils/chatId";
import * as dotenv from "dotenv";

dotenv.config();

interface AuthResponse {
  message?: string;
  token?: string;
  username?: string;
  error?: string;
}

const allUsers = Array.from({ length: 100 }, (_, i) => ({
  [`user${i + 1}`]: {
    username: `new_user${i + 1}`,
    password: `password`,
    token: null as string | null,
  },
})).reduce((acc, user) => ({ ...acc, ...user }), {});
const len = Object.keys(allUsers).length;

// const groups = [
//   "2412992431915008",
//   "2412994571010048",
//   "2412996034822144",
//   "2412998224248832",
//   "2413000279457792",
//   "2413003676844032",
//   "2413004465373184",
//   "2413006570913792",
//   "2413008743563264",
//   "2413011344031744",
//   "2413012862369792",
//   "2413015043407872",
// ];
// let groupIdx = 0;

const authCache = new Map<string, string>();

let redisClient: RedisClientType | null = null;

async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }
  if (
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
  ) {
    throw new Error(
      "Redis connection parameters are not set in environment variables"
    );
  }
  const client = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  });
  await client.connect();
  redisClient = client as RedisClientType;
  return redisClient;
}

async function getAuthToken(
  username: string,
  password: string
): Promise<string | null> {
  if (authCache.has(username)) {
    return authCache.get(username)!;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok && data.token) {
      authCache.set(username, data.token);
      return data.token;
    } else {
      console.error(`Authentication failed for ${username}: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error(
      `Authentication error for ${username}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
}
module.exports = {
  async connectHandler(params: any, context: any, next: any) {
    try {
      const redis = await getRedisClient();
      const idx = await redis.incr("new_user_idx");
      if (!idx) {
        console.error("Failed to get user index from Redis");
        return;
      }
      const user = allUsers[`user${(idx % len) + 1}`];
      const targetFriend = allUsers[`user${((idx + 1) % len) + 1}`];

      context.vars.targetFriend = targetFriend.username;
      context.vars.chatId = generateChatId(
        user.username,
        targetFriend.username
      );
      context.vars.username = user.username;

      let token = user.token;
      if (!token) {
        token = await getAuthToken(user.username, user.password);
        if (token) {
          user.token = token;
        } else {
          console.error(`Failed to authenticate ${user.username}`);
          // Stop the scenario if authentication fails
          return next(new Error(`Authentication failed for ${user.username}`));
        }
      }

      context.vars.authToken = token;

      params.target = `${params.target}/?username=${context.vars.username}&authToken=${context.vars.authToken}`;
      context.vars.connectStart = performance.now();
      return next();
    } catch (error) {
      console.error("Error in connectHandler:", error);
      return next(error as Error);
    }
  },
  postConnectionHandler(context: any, events: any, next: any) {
    const endTime = performance.now();
    const duration = endTime - context.vars.connectStart;
    events.emit("histogram", "handshake_latency", duration);
    next();
  },
  // handleGroups(context: any, events: any, next: any) {
  //   context.vars.groupId = groups[groupIdx % groups.length];

  //   groupIdx++;
  //   next();
  // },
  preMessageSend(context: any, events: any, next: any) {
    context.vars.startTime = performance.now();

    next();
  },
  postMessageSend(context: any, events: any, next: any) {
    const endTime = performance.now();
    const duration = endTime - context.vars.startTime;

    events.emit("histogram", "latency", duration);
    events.emit("counter", "messages_sent", 1);
    events.emit("rate", "messages_sent_rate");
    next();
  },
};
