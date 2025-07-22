import { getCassandraClient } from "../services/cassandra";

export async function getOneToOneChatHistory(
  chatId: string
): Promise<{ messageId: string; from: string; to: string }[]> {
  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }
  if (!chatId) {
    throw new Error("Chat ID is required to fetch chat history");
  }
  try {
    const query =
      "SELECT message_id, message_from, message_to FROM one_to_one_message_by_chat_id WHERE chat_id = ?";
    const result = await cassandraClient.execute(query, [chatId], {
      prepare: true,
    });
    if (result.rowLength === 0) {
      return [];
    }
    return (
      result.rows.map((row) => ({
        messageId: row.message_id,
        from: row.message_from,
        to: row.message_to,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching friends from Cassandra:", error);
    throw new Error("Failed to fetch friends");
  }
}
