import { getCassandraClient } from "../services/cassandra";
import { snowflakeIdGenerator } from "../utils/snowflake";

export async function insertGroupChatMessage(
  groupId: string,
  from: string,
  content: string
): Promise<void> {
  if (!groupId || !from || !content) {
    const missingFields = [];
    if (!groupId) missingFields.push("groupId");
    if (!from) missingFields.push("from");
    if (!content) missingFields.push("content");
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const cassandraClient = getCassandraClient();
  if (!cassandraClient) {
    throw new Error("Cassandra client is not available");
  }

  const query =
    "INSERT INTO group_message_by_group_id (group_id, message_id, message_from, message_text) VALUES (?, ?, ?, ?)";
  const messageId = snowflakeIdGenerator();

  try {
    await cassandraClient.execute(
      query,
      [groupId, messageId, from, content],
      {
        prepare: true,
      }
    );

    console.log(
      `Message inserted into Cassandra: ${from} in group ${groupId}`
    );
  } catch (error) {
    console.error("Cassandra query error in insertGroupChatMessage:", {
      groupId,
      from,
      error,
    });
    throw new Error("Failed to store message in database");
  }
}
