import { getCassandraClient } from "../services/cassandra";
import { getTimestampFromSnowflake } from "../utils/timestampFromSnowflake";

export async function getOneToOneChatHistory(chatId: string): Promise<
  {
    messageId: string;
    from: string;
    to: string;
    text: string;
    timestamp: string;
  }[]
> {
  if (!chatId) {
    throw new Error("Chat ID is required to fetch chat history");
  }

  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }

  const query =
    "SELECT message_id, message_from, message_text, message_to FROM one_to_one_message_by_chat_id WHERE chat_id = ? ORDER BY message_id ASC";

  try {
    const result = await cassandraClient.execute(query, [chatId], {
      prepare: true,
    });

    const messages = result.rows.map((row) => ({
      messageId: row.message_id?.toString() || "",
      from: row.message_from || "",
      to: row.message_to || "",
      text: row.message_text || "",
      timestamp: getTimestampFromSnowflake(
        row.message_id?.toString() || ""
      ).toString(),
    }));

    console.log(`Retrieved ${messages.length} messages for chat ${chatId}`);
    return messages;
  } catch (error) {
    console.error("Cassandra query error in getOneToOneChatHistory:", {
      chatId,
      error,
    });
    throw new Error("Failed to retrieve chat history from database");
  }
}
