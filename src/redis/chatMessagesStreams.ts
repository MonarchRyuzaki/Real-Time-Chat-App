import { enqueueOfflineMessages } from "../queue/offlineQueue";
import { chatConnectionManager } from "../services/connectionService";
import { getClient } from "../services/redis";
import { getOtherUser } from "../utils/chatId";
import { WsResponse } from "../utils/wsResponse";

export async function addMessageToStream(messageData: {
  type: string;
  from: string;
  content: string;
  chatId: string;
  messageId: string;
}) {
  const streamKey = "chat-messages";
  const redisClient = await getClient();
  if (!redisClient) {
    throw new Error("Redis Client cant be found!!");
  }
  const messageId = await redisClient.xAdd(streamKey, "*", messageData);

  console.log(`Message ${messageId} added to the stream.`);
  return messageId;
}

export async function createConsumer() {
  const streamKey = "chat-messages";
  const groupName = "chat-workers";
  const myServerId = process.env.SERVER_ID;
  const consumerName = `worker-on-${myServerId}`;
  const redisClient = await getClient();
  if (!redisClient) {
    throw new Error("Redis Client cant be found!!");
  }
  try {
    await redisClient.xGroupCreate(streamKey, groupName, "$", {
      MKSTREAM: true,
    });
  } catch (error) {
    console.log("Consumer group already exists, which is fine.");
  }
  return { streamKey, groupName, consumerName };
}

export async function startWorker({
  streamKey,
  groupName,
  consumerName,
}: {
  streamKey: string;
  groupName: string;
  consumerName: string;
}) {
  const redisClient = await getClient();
  if (!redisClient) {
    throw new Error("Redis Client cant be found!!");
  }
  console.log(`Worker ${consumerName} started. Waiting for messages...`);
  try {
    const response = await redisClient.xReadGroup(
      groupName,
      consumerName,
      { key: streamKey, id: ">" },
      {
        BLOCK: 100,
        COUNT: 1,
      }
    );

    if (response) {
      const id = response[0].messages[0].id;
      const message = response[0].messages[0].message;
      const messageData: MessageDataType = {
        type: message.type,
        from: message.from,
        content: message.content,
        chatId: message.chatId,
        messageId: message.messageId,
      };
      await processMessage(id, messageData);
    }
  } catch (error) {
    console.error("Error in streams worker:", error);
  }
}

export interface MessageDataType {
  type: string;
  from: string;
  content: string;
  chatId: string;
  messageId: string;
}
async function processMessage(id: string, messageData: MessageDataType) {
  const recipient = getOtherUser(messageData.chatId, messageData.from);
  const myServerId = process.env.SERVER_ID;
  const redisClient = await getClient();
  if (!redisClient) {
    throw new Error("Redis Client cant be found!!");
  }

  // 1. LOOKUP: Find where the recipient is connected
  const recipientLocation = await redisClient.get(`user-location:${recipient}`);

  // 2. DECIDE: Is the recipient on my server?
  if (recipientLocation === myServerId) {
    // --- Case 1: Local Delivery ---
    console.log(
      `Recipient ${recipient} is on this server. Delivering locally.`
    );
    deliverMessageToLocalUser(recipient!, messageData); // Your function to send via WebSocket

    // The job is done, we can ACK the message immediately
    await redisClient.xAck("chat-messages", "chat-workers", id);
    console.log(`ACKed message ${id}.`);
  } else if (recipientLocation) {
    // --- Case 2: Forwarding ---
    console.log(
      `Recipient ${recipient} is on server ${recipientLocation}. Forwarding...`
    );

    // We need to wait for the other server to confirm delivery
    const success = await forwardMessageAndWaitForAck(
      recipientLocation,
      messageData
    );

    if (success) {
      await redisClient.xAck("chat-messages", "chat-workers", id);
      console.log(`ACKed message ${id} after successful forward.`);
    } else {
      console.error(
        `Failed to get ACK for forwarded message ${id}. It will be re-processed later.`
      );
    }
  } else {
    // --- Case 3: User is Offline ---
    console.log(`Recipient ${recipient} is offline. Storing for later.`);
    // Here you would add the message to an offline storage/queue
    handleOfflineMessages(messageData);
    // Since we've handled it, we ACK it.
    await redisClient.xAck("chat-messages", "chat-workers", id);
  }
}

// The worker on Server A calls this function
async function forwardMessageAndWaitForAck(
  targetServerId: string,
  messageData: MessageDataType
): Promise<boolean> {
  const forwardChannel = `server-mail:${targetServerId}`;
  const ackChannel = `ack-channel:${messageData.messageId}`;
  const redisClient = await getClient();
  if (!redisClient) {
    throw new Error("Redis Client cant be found!!");
  }

  let ackSubscriber;

  try {
    // Create a new Redis client for ACK subscription
    const { createClient } = await import("redis");
    ackSubscriber = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    });

    await ackSubscriber.connect();

    // Publish the message to the target server's private mailbox
    await redisClient.publish(forwardChannel, JSON.stringify(messageData));
    console.log(
      `Forwarded message ${messageData.messageId} to ${targetServerId}`
    );

    // Subscribe to the ACK channel BEFORE publishing the message
    console.log(`Subscribing to ACK channel: ${ackChannel}`);

    // Create the promise to wait for ACK
    const ackPromise = new Promise<boolean>((resolve) => {
      let isResolved = false;

      // Set a timeout. If we don't get an ACK in 5 seconds, assume it failed.
      const timeout = setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          console.log(`ACK timeout for message ${messageData.messageId}`);
          resolve(false); // Indicate failure
        }
      }, 5000);

      // Subscribe with callback-style subscription
      ackSubscriber!.subscribe(
        ackChannel,
        (channel: string, message: string) => {
          if (channel === ackChannel && message === "OK" && !isResolved) {
            isResolved = true;
            clearTimeout(timeout);
            console.log(`Received ACK for message ${messageData.messageId}`);
            resolve(true); // Indicate success
          }
        }
      );

      // Handle connection errors
      ackSubscriber!.on("error", (error: any) => {
        if (!isResolved) {
          isResolved = true;
          clearTimeout(timeout);
          console.error("ACK subscriber error:", error);
          resolve(false);
        }
      });
    });
    // Wait for the ACK
    const result = await ackPromise;

    return result;
  } catch (error) {
    console.error("Error in forwardMessageAndWaitForAck:", error);
    return false;
  } finally {
    // Clean up the subscriber connection
    if (ackSubscriber) {
      try {
        await ackSubscriber.unsubscribe(ackChannel);
        await ackSubscriber.quit();
        console.log(`Cleaned up ACK subscriber for ${ackChannel}`);
      } catch (error) {
        console.error("Error cleaning up ACK subscriber:", error);
      }
    }
  }
}

export async function handleOfflineMessages(messageData: MessageDataType) {
  const recipient = getOtherUser(messageData.chatId, messageData.from);
  await enqueueOfflineMessages({
    username: recipient!,
    messageId: messageData.messageId,
    partitionKey: messageData.chatId,
    messageType: "ONE_TO_ONE",
  });
}

export async function deliverMessageToLocalUser(
  receiver: string,
  messageData: MessageDataType
) {
  const recipientSocket = chatConnectionManager.getSocket(receiver);
  if (!recipientSocket) {
    handleOfflineMessages(messageData);
    return;
  }
  WsResponse.custom(recipientSocket, {
    type: "MESSAGE",
    from: messageData.from,
    content: messageData.content,
    chatId: messageData.chatId,
  });
}
