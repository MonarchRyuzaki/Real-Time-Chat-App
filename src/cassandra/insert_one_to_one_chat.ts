import { getCassandraClient } from "../services/cassandra";

export async function insertOneToOneChat(
  chatId: string,
  from: string,
  to: string,
  content: string
): Promise<void> {
  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }
  if (!chatId) {
    throw new Error("Chat ID is required to fetch chat history");
  }
  try {
    const query =
      "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)";
    const result = await cassandraClient.execute(
      query,
      [chatId, Date.now(), from, content, to],
      {
        prepare: true,
      }
    );
  } catch (error) {
    console.error("Error fetching friends from Cassandra:", error);
    throw new Error("Failed to fetch friends");
  }
}
