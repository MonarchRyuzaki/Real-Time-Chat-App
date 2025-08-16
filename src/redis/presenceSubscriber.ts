import { createClient } from "redis";

export async function subscribeToPresenceUpdates() {
  if (
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
  ) {
    throw new Error(
      "Redis connection parameters are not set in environment variables"
    );
  }

  // Create a separate client for subscribing
  const subscriber = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  });

  await subscriber.connect();

  await subscriber.subscribe(["online", "offline"], (message, channel) => {

    console.log(`Received ${message} from ${channel}`);
  });

  console.log("Subscribed successfully to online and offline channels");
}