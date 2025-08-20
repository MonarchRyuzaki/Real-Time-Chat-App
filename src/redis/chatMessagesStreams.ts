import { getClient } from "../services/redis";

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
      const stream = response[0];
      console.dir(stream.messages[0].message, { depth: null });
      // await processMessage(redisClient, messageId, messageData, myServerId);
    }
  } catch (error) {
    console.error("Error in streams worker:", error);
  }
}
