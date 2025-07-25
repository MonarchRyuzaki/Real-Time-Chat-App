import readline from "readline";
import WebSocket from "ws";

interface TestClient {
  username: string;
  ws: WebSocket;
  friends: string[];
}

const clients: TestClient[] = [];

// Create readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to generate chat ID from two usernames
function generateChatId(user1: string, user2: string): string {
  // Sort usernames to ensure consistent chat ID regardless of order
  const sortedUsers = [user1, user2].sort();
  return `${sortedUsers[0]}_${sortedUsers[1]}_chat`;
}

// Helper function to promisify readline question
function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// Create a client connection
function createClient(username: string): Promise<TestClient> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:4000?username=${username}`);
    const client: TestClient = { username, ws, friends: [] };

    ws.on("open", () => {
      console.log(`✅ ${username} connected to chat server!`);
    });

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case "INIT_DATA":
          // Handle friend usernames from server (not formatted chat IDs)
          if (message.chatIds && Array.isArray(message.chatIds)) {
            // chatIds actually contains friend usernames from the server
            client.friends = message.chatIds;
            console.log(
              `👥 ${username} Friends: ${
                client.friends.length > 0
                  ? client.friends.join(", ")
                  : "No friends yet"
              }`
            );
          }

          // Handle groups data
          if (message.groups && Array.isArray(message.groups)) {
            console.log(
              `🏷️ ${username} Groups: ${
                message.groups.length > 0
                  ? message.groups.join(", ")
                  : "No groups yet"
              }`
            );
          }

          resolve(client);
          break;

        case "MESSAGE":
          console.log(
            `📩 [${username}] received from ${message.from}: ${message.content}`
          );
          break;

        case "ONE_TO_ONE_CHAT_HISTORY":
          console.log(`📜 [${username}] Chat History:`);
          if (message.messages && message.messages.length > 0) {
            message.messages.forEach((msg: any) => {
              console.log(
                `  ${msg.from}: ${msg.text} (${new Date(
                  msg.timestamp
                ).toLocaleString()})`
              );
            });
          } else {
            console.log("  No previous messages");
          }
          break;

        case "NEW_ONE_TO_ONE_CHAT_AP":
          if (message.from) {
            console.log(
              `🤝 [${username}] Chat established with ${message.from}`
            );
            if (!client.friends.includes(message.from)) {
              client.friends.push(message.from);
            }
          } else if (message.msg) {
            console.log(`✅ [${username}] ${message.msg}`);
          }
          break;

        case "INFO":
          console.log(`ℹ️ [${username}] ${message.msg}`);
          break;

        default:
          console.log(`⚠️ [${username}] Unknown message type:`, message);
      }
    });

    ws.on("close", () => {
      console.log(`❌ ${username} disconnected`);
      const index = clients.findIndex((c) => c.username === username);
      if (index > -1) clients.splice(index, 1);
    });

    ws.on("error", (error) => {
      console.error(`💥 ${username} WebSocket error:`, error);
      reject(error);
    });
  });
}

async function testMenu() {
  console.log("\n=== Real-Time Chat App Test Client ===");
  console.log("1. Connect a new user");
  console.log("2. Send message");
  console.log("3. View chat history");
  console.log("4. List connected users");
  console.log("5. Disconnect user");
  console.log("6. Test scenario (Alice & Bob chat)");
  console.log("7. Exit");

  const choice = await question("Choose an option: ");

  switch (choice) {
    case "1":
      const username = await question("Enter username to connect: ");
      try {
        const client = await createClient(username);
        clients.push(client);
        console.log(`🎉 ${username} is now connected!`);
      } catch (error) {
        console.error(`Failed to connect ${username}`);
      }
      break;

    case "2":
      if (clients.length === 0) {
        console.log("No users connected");
        break;
      }
      console.log(
        "Connected users:",
        clients.map((c) => c.username).join(", ")
      );
      const sender = await question("Enter sender username: ");
      const recipient = await question("Enter recipient username: ");
      const message = await question("Enter message: ");

      const senderClient = clients.find((c) => c.username === sender);
      if (senderClient) {
        const chatId = generateChatId(sender, recipient);
        senderClient.ws.send(
          JSON.stringify({
            type: "ONE_TO_ONE_CHAT",
            from: sender,
            to: recipient,
            content: message,
            chatId: chatId,
          })
        );
        console.log(`📤 Message sent from ${sender} to ${recipient}`);
      } else {
        console.log(`❌ User ${sender} not found`);
      }
      break;

    case "3":
      if (clients.length === 0) {
        console.log("No users connected");
        break;
      }
      console.log(
        "Connected users:",
        clients.map((c) => c.username).join(", ")
      );
      const requester = await question("Enter username to view history for: ");
      const friendName = await question("Enter friend's username: ");

      const requesterClient = clients.find((c) => c.username === requester);
      if (requesterClient) {
        const chatId = generateChatId(requester, friendName);
        requesterClient.ws.send(
          JSON.stringify({
            type: "GET_ONE_TO_ONE_HISTORY",
            from: requester,
            to: friendName,
            chatId: chatId,
          })
        );
      } else {
        console.log(`❌ User ${requester} not found`);
      }
      break;

    case "4":
      console.log("\n📋 Connected Users:");
      if (clients.length === 0) {
        console.log("  No users connected");
      } else {
        clients.forEach((client) => {
          console.log(
            `  • ${client.username} (Friends: ${
              client.friends.join(", ") || "none"
            })`
          );
        });
      }
      break;

    case "5":
      if (clients.length === 0) {
        console.log("No users connected");
        break;
      }
      console.log(
        "Connected users:",
        clients.map((c) => c.username).join(", ")
      );
      const userToDisconnect = await question("Enter username to disconnect: ");

      const clientToDisconnect = clients.find(
        (c) => c.username === userToDisconnect
      );
      if (clientToDisconnect) {
        clientToDisconnect.ws.send(JSON.stringify({ type: "DISCONNECT" }));
        clientToDisconnect.ws.close();
        console.log(`👋 ${userToDisconnect} disconnected`);
      } else {
        console.log(`❌ User ${userToDisconnect} not found`);
      }
      break;

    case "6":
      console.log("🧪 Running test scenario: Alice and Bob chat");

      // Connect Alice
      try {
        const alice = await createClient("alice");
        clients.push(alice);

        // Connect Bob
        const bob = await createClient("bob");
        clients.push(bob);

        // Wait a moment
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Alice sends message to Bob
        const chatId = generateChatId("alice", "bob");
        alice.ws.send(
          JSON.stringify({
            type: "ONE_TO_ONE_CHAT",
            from: "alice",
            to: "bob",
            content: "Hey Bob! This is a test message from the test client!",
            chatId: chatId,
          })
        );

        console.log("✅ Test scenario completed. Alice sent a message to Bob.");

        // Get chat history
        await new Promise((resolve) => setTimeout(resolve, 500));
        alice.ws.send(
          JSON.stringify({
            type: "GET_ONE_TO_ONE_HISTORY",
            from: "alice",
            to: "bob",
            chatId: chatId,
          })
        );
      } catch (error) {
        console.error("Test scenario failed:", error);
      }
      break;

    case "7":
      console.log("👋 Closing all connections and exiting...");
      clients.forEach((client) => {
        client.ws.send(JSON.stringify({ type: "DISCONNECT" }));
        client.ws.close();
      });
      rl.close();
      process.exit();

    default:
      console.log("❌ Invalid option");
  }

  // Continue the menu loop
  setImmediate(() => testMenu());
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n👋 Closing all connections...");
  clients.forEach((client) => {
    client.ws.close();
  });
  rl.close();
  process.exit();
});

// Start the test application
console.log("🚀 Starting Real-Time Chat App Test Client...");
testMenu().catch(console.error);
