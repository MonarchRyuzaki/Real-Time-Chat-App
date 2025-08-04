import { getIoClient } from "../services/ioredis";
import { prisma } from "../services/prisma";
import { getOfflineQueue } from "./offlineQueue";

export const MAX_BATCH_SIZE = 100;
export const FLUSH_INTERVAL = 30 * 1000;

export async function flushOfflineMessages() {
  const offlineQueue = await getOfflineQueue();

  const jobs = await offlineQueue.getJobs(["waiting"], 0, MAX_BATCH_SIZE - 1);

  if (jobs.length === 0) {
    console.log("Nothing to flush in DB");
    return;
  }

  const messages = jobs.map((job) => ({
    username: job.data.username,
    messageId: job.data.messageId,
    partitionKey: job.data.partitionKey,
    messageType: job.data.messageType,
  }));

  try {
    await prisma.offlineMessages.createMany({ data: messages });
    await Promise.all(jobs.map((job) => job.remove()));
    console.log(`[Worker] Flushed ${messages.length} offline messages.`);
  } catch (error) {
    console.error("❌ Failed to flush messages:", error);
  }
}
