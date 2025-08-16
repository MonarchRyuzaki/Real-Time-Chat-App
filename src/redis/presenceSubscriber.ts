import { createClient } from "redis";
import { presenceConnectionManager } from "../services/connectionService";
import { prisma } from "../services/prisma";
import { WsResponse } from "../utils/wsResponse";

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

  await subscriber.subscribe(
    ["online", "offline"],
    async (message, channel) => {
      console.log(`Received ${message} from ${channel}`);
      const username = message;
      if (!username) return;
      let messageToFriends;
      if (channel === "online") {
        messageToFriends = {
          username,
          status: "ONLINE" as const,
        };
      } else if (channel === "offline") {
        messageToFriends = {
          username,
          status: "OFFLINE" as const,
        };
      }

      if (!messageToFriends) return;
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          friendships1: true,
          friendships2: true,
        },
      });
      if (!user) return;
      for (const friendship of user.friendships1) {
        const { user1, user2 } = friendship;
        const friendUsername = user1 === username ? user2 : user1;
        const presenceSocket =
          presenceConnectionManager.getSocket(friendUsername);
        if (presenceSocket) {
          WsResponse.custom(presenceSocket, {
            type: "STATUS_CHANGE",
            ...messageToFriends,
          });
        }
      }
      for (const friendship of user.friendships2) {
        const { user1, user2 } = friendship;
        const friendUsername = user1 === username ? user2 : user1;
        const presenceSocket =
          presenceConnectionManager.getSocket(friendUsername);
        if (presenceSocket) {
          WsResponse.custom(presenceSocket, {
            type: "STATUS_CHANGE",
            ...messageToFriends,
          });
        }
      }
    }
  );

  console.log("Subscribed successfully to online and offline channels");
}
