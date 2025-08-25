import { getOfflineQueue } from "../queue/offlineQueue";
import { getIoClient } from "../services/ioredis";
import { prisma } from "../services/prisma";
import { getClient } from "../services/redis";

export async function clearOfflineQueue() {
  try {
    const queue = await getOfflineQueue();

    // Remove all jobs from the queue
    await queue.obliterate({ force: true });
    console.log("✅ Offline queue cleared successfully");

    // Also clear the database
    const deletedCount = await prisma.offlineMessages.deleteMany({});
    console.log(
      `✅ Cleared ${deletedCount.count} offline messages from database`
    );
  } catch (error) {
    console.error("❌ Error clearing offline queue:", error);
  }
}

export async function clearRedisStreams() {
  try {
    const redisClient = await getClient();
    if (!redisClient) {
      throw new Error("Redis client not available");
    }

    // Clear the main chat messages stream
    const streamDeleted = await redisClient.del("chat-messages");
    console.log(
      `✅ Cleared Redis chat messages stream (${streamDeleted} keys deleted)`
    );

    // Clear consumer group (it will be recreated automatically)
    try {
      await redisClient.xGroupDestroy("chat-messages", "chat-workers");
      console.log("✅ Destroyed consumer group 'chat-workers'");
    } catch (error) {
      console.log(
        "ℹ️ Consumer group 'chat-workers' didn't exist or already destroyed"
      );
    }
  } catch (error) {
    console.error("❌ Error clearing Redis streams:", error);
  }
}
