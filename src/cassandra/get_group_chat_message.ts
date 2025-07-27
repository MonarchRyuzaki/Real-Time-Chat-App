import { getCassandraClient } from "../services/cassandra";
import { getTimestampFromSnowflake } from "../utils/timestampFromSnowflake";

export async function getGroupChatMessage(groupId: string): Promise<
  {
    messageId: string;
    from: string;
    text: string;
    timestamp: string;
  }[]
> {
  if (!groupId) {
    throw new Error("Group ID is required to fetch chat history");
  }

  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }

  const query =
    "SELECT message_id, message_from, message_text FROM group_message_by_group_id WHERE group_id = ? ORDER BY message_id ASC";

  try {
    const result = await cassandraClient.execute(query, [groupId], {
      prepare: true,
    });

    const messages = result.rows.map((row) => ({
      messageId: row.message_id?.toString() || "",
      from: row.message_from || "",
      text: row.message_text || "",
      timestamp: getTimestampFromSnowflake(
        row.message_id?.toString() || ""
      ).toString(),
    }));

    console.log(`Retrieved ${messages.length} messages for chat ${groupId}`);
    return messages;
  } catch (error) {
    console.error("Cassandra query error in getGroupChatMessage:", {
      groupId,
      error,
    });
    throw new Error("Failed to retrieve chat history from database");
  }
}
