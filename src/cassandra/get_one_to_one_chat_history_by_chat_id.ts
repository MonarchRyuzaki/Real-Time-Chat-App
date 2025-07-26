import { getCassandraClient } from "../services/cassandra";

export async function getOneToOneChatHistory(
  chatId: string
): Promise<
  {
    messageId: string;
    from: string;
    to: string;
    text: string;
    timestamp: string;
  }[]
> {
  try {
    if (!chatId) {
      throw new Error("Chat ID is required to fetch chat history");
    }

    const cassandraClient = getCassandraClient();
    if (!cassandraClient) {
      throw new Error("Cassandra client is not available");
    }

    try {
      const query =
        "SELECT message_id, message_from, message_to, message_text, message_id FROM one_to_one_message_by_chat_id WHERE chat_id = ? ORDER BY message_id DESC";

      const result = await cassandraClient.execute(query, [chatId], {
        prepare: true,
      });

      if (result.rowLength === 0) {
        console.log(`No chat history found for chat ID: ${chatId}`);
        return [];
      }

      const messages = result.rows.map((row) => ({
        messageId: row.message_id?.toString() || "",
        from: row.message_from || "",
        to: row.message_to || "",
        text: row.message_text || "",
        timestamp: new Date(
          parseInt(row.message_id?.toString() || "0")
        ).toISOString(),
      }));

      console.log(`Retrieved ${messages.length} messages for chat ${chatId}`);
      return messages;
    } catch (cassandraError) {
      console.error("Cassandra query error in getOneToOneChatHistory:", {
        chatId,
        error: cassandraError,
      });
      throw new Error("Failed to retrieve chat history from database");
    }
  } catch (error) {
    console.error("Error in getOneToOneChatHistory:", error);
    throw error; // Re-throw to let caller handle it appropriately
  }
}
