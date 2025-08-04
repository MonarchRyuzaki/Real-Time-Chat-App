import { Queue } from "bullmq";
import { getIoClient } from "../services/ioredis";

let offlineQueue: Queue | null = null;

async function getOfflineQueue(): Promise<Queue> {
  if (!offlineQueue) {
    const ioredis = await getIoClient();
    offlineQueue = new Queue("offline-messages", {
      connection: ioredis,
    });
  }
  return offlineQueue;
}

export async function enqueueOfflineMessages(data: {
  username: string;
  messageId: string;
  partitionKey: string;
  messageType: "ONE_TO_ONE" | "GROUP";
}) {
  if (!offlineQueue) {
    throw new Error("Offline Queue not available");
  }
  console.log(`Putting ${data} in queue`);
  await offlineQueue.add("store-offline-messages", data, {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: false,
  });
}
