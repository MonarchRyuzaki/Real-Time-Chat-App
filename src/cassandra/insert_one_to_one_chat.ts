import { getCassandraClient } from "../services/cassandra";

export async function insertOneToOneChat(
  chatId: string,
  from: string,
  to: string,
  content: string,
  messageId: string
): Promise<void> {
  if (!chatId || !from || !to || !content || !messageId) {
    const missingFields = [];
    if (!chatId) missingFields.push("chatId");
    if (!from) missingFields.push("from");
    if (!to) missingFields.push("to");
    if (!content) missingFields.push("content");
    if (!messageId) missingFields.push("messageId");
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }

  const query =
    "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)";

  try {
    await cassandraClient.execute(
      query,
      [chatId, messageId, from, content, to],
      {
        prepare: true,
      }
    );

    console.log(
      `Message inserted into Cassandra: ${from} -> ${to} in chat ${chatId}`
    );
  } catch (error) {
    console.error("Cassandra query error in insertOneToOneChat:", {
      chatId,
      from,
      to,
      error,
    });
    throw new Error("Failed to store message in database");
  }
}
