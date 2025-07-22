import { getCassandraClient } from "../services/cassandra";

export async function seedData() {
  const client = getCassandraClient();
  //   const queries = [
  //     {
  //       query: "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)",
  //       params: ["alice_bob_chat", "msg_001", "alice", "Hey Bob!", "bob"],
  //     },
  //     {
  //       query: "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)",
  //       params: ["alice_bob_chat", "msg_002", "bob", "Hi Alice!", "alice"],
  //     },
  //     {
  //       query: "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)",
  //       params: ["alice_charlie_chat", "msg_003", "alice", "Yo Charlie!", "charlie"],
  //     },
  //     {
  //       query: "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)",
  //       params: ["eve_frank_chat", "msg_004", "eve", "How's it going, Frank?", "frank"],
  //     },
  //     {
  //       query: "INSERT INTO one_to_one_message_by_chat_id (chat_id, message_id, message_from, message_text, message_to) VALUES (?, ?, ?, ?, ?)",
  //       params: ["charlie_alice_chat", "msg_005", "charlie", "Thanks for reaching out!", "alice"],
  //     },
  //   ];
  const queries = [
    {
      query:
        "INSERT INTO group_message_by_group_id (group_id, message_id, message_from, message_text) VALUES (?, ?, ?, ?)",
      params: [
        "group1",
        "1234567890123456789",
        "alice",
        "Welcome to the main hub!",
      ],
    },
    {
      query:
        "INSERT INTO group_message_by_group_id (group_id, message_id, message_from, message_text) VALUES (?, ?, ?, ?)",
      params: [
        "group1",
        "1234567890123456790",
        "bob",
        "Great to be here with everyone!",
      ],
    },
    {
      query:
        "INSERT INTO group_message_by_group_id (group_id, message_id, message_from, message_text) VALUES (?, ?, ?, ?)",
      params: [
        "group2",
        "1234567890123456791",
        "charlie",
        "Ready for today's sprint?",
      ],
    },
    {
      query:
        "INSERT INTO group_message_by_group_id (group_id, message_id, message_from, message_text) VALUES (?, ?, ?, ?)",
      params: [
        "group2",
        "1234567890123456792",
        "alice",
        "Let's build something amazing! 🚀",
      ],
    },
    {
      query:
        "INSERT INTO group_message_by_group_id (group_id, message_id, message_from, message_text) VALUES (?, ?, ?, ?)",
      params: [
        "group3",
        "1234567890123456793",
        "eve",
        "Share your creative ideas here!",
      ],
    },
  ];

  await client.batch(queries, { prepare: true });
  console.log("Data updated on cluster");
}
