import { createClient } from "redis";
import { getClient } from "../services/redis";
import { getOtherUser } from "../utils/chatId";
import { deliverMessageToLocalUser } from "./chatMessagesStreams";

interface MessageDataType {
  type: string;
  from: string;
  content: string;
  chatId: string;
  messageId: string;
}

export async function subscribeToChatMessages() {
  if (
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
  ) {
    throw new Error(
      "Redis connection parameters are not set in environment variables"
    );
  }

  const myServerId = process.env.SERVER_ID || "default-server";

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

  // Subscribe to this server's mailbox and acknowledgment channels
  await subscriber.pSubscribe(
    [`server-mail:${myServerId}`, `ack-channel:*`],
    async (message, channel) => {
      console.log(`Received message on channel ${channel}`);

      // Handle forwarded messages to this server
      if (channel === `server-mail:${myServerId}`) {
        try {
          const messageData = JSON.parse(message) as MessageDataType;
          const ackChannel = `ack-channel:${messageData.messageId}`;

          // Get the recipient from the chatId
          const recipient = getOtherUser(messageData.chatId, messageData.from);

          // Deliver the message to the local user via WebSocket
          await deliverMessageToLocalUser(recipient!, messageData);

          // Send the ACK back to the original worker
          const redisClient = await getClient();
          if (redisClient) {
            await redisClient.publish(ackChannel, "OK");
            console.log(`Sent ACK for message ${messageData.messageId}`);
          }
        } catch (error) {
          console.error("Error processing forwarded message:", error);
        }
      }
    }
  );

  console.log(`Subscribed to chat messages for server ${myServerId}`);
}
