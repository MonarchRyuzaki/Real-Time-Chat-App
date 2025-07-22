import { getCassandraClient } from "../services/cassandra";

export async function getChatIdByUser(userId: string): Promise<string[]> {
  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }
  if (!userId) {
    throw new Error("User ID is required to fetch friends");
  }
  try {
    const query =
      "SELECT chat_id FROM one_to_one_message_by_chat_id WHERE message_from = ? ALLOW FILTERING";
    const result = await cassandraClient.execute(query, [userId], {
      prepare: true,
    });
    if (result.rowLength === 0) {
      return [];
    }
    return result.rows.map((row) => row.chat_id) || [];
  } catch (error) {
    console.error("Error fetching chat IDs from Cassandra:", error);
    throw new Error("Failed to fetch chat IDs");
  }
}
