import dotenv from "dotenv";
import WebSocket from "ws";

dotenv.config();

interface TestClient {
  username: string;
  ws: WebSocket;
  isReady: boolean;
  authToken: string;
}

interface AuthResponse {
  token?: string;
  username?: string;
  error?: string;
  message?: string;
}

// Authentication helper function
async function authenticateUser(
  username: string,
  password: string = "password"
): Promise<string | null> {
  try {
    console.log(`🔐 Authenticating ${username}...`);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok && data.token) {
      console.log(`✅ Authentication successful for ${username}`);
      return data.token;
    } else {
      console.log(
        `❌ Authentication failed for ${username}: ${
          data.error || "Unknown error"
        }`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `❌ Authentication error for ${username}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
}

async function createOneToOneChatsViaWebSocket() {
  try {
    console.log("🚀 Starting one-to-one chat creation via WebSocket...");

    const clients: TestClient[] = [];
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Create user pairs for testing - ALL possible combinations
    // This creates chats between every user and every other user
    const userPairs: [string, string][] = [];

    // Create ALL possible friendships between user1-user100
    for (let i = 1; i <= 100; i++) {
      for (let j = i + 1; j <= 100; j++) {
        userPairs.push([`new_user${i}`, `new_user${j}`]);
      }
    }

    console.log(
      `📝 Creating ${userPairs.length} one-to-one chats (ALL possible combinations)...`
    );

    // Function to create authenticated WebSocket client
    const createClient = (
      username: string,
      authToken: string
    ): Promise<TestClient> => {
      return new Promise((resolve, reject) => {
        // Create WebSocket connection with JWT token in Authorization header
        const ws = new WebSocket(`ws://localhost:4000`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const client: TestClient = { username, ws, isReady: false, authToken };

        ws.on("open", () => {
          console.log(`✅ ${username} connected with authentication`);

          // Send INIT_DATA message to trigger server initialization
          ws.send(JSON.stringify({ type: "INIT_DATA" }));
        });

        ws.on("message", (data) => {
          const message = JSON.parse(data.toString());

          if (message.type === "INIT_DATA") {
            client.isReady = true;
            console.log(`🔄 ${username} initialized and ready`);
            resolve(client);
          } else if (message.type === "NEW_ONE_TO_ONE_CHAT_AP") {
            if (message.to) {
              successCount++;
              console.log(`✅ Chat created: ${username} ↔ ${message.to}`);
            }
          } else if (message.type === "ERROR") {
            if (message.msg && message.msg.includes("already exists")) {
              skipCount++;
              console.log(`⏭️  Chat already exists: ${username} ↔ (friend)`);
            } else {
              errorCount++;
              console.log(`❌ Error for ${username}: ${message.msg}`);
            }
          }
        });

        ws.on("error", (error) => {
          console.error(`❌ WebSocket error for ${username}:`, error);
          reject(error);
        });

        ws.on("close", (code, reason) => {
          if (code === 1008) {
            reject(
              new Error(`Authentication failed for ${username}: ${reason}`)
            );
          }
        });
      });
    };

    // Create clients for users in batches to avoid overwhelming the server
    const batchSize = 15;
    const usernames = Array.from(
      new Set([
        ...userPairs.map(([user1]) => user1),
        ...userPairs.map(([, user2]) => user2),
      ])
    );

    console.log(`🔐 Authenticating ${usernames.length} users...`);

    // Authenticate all users first
    const authPromises = usernames.map(async (username) => {
      const token = await authenticateUser(username);
      return { username, token };
    });

    const authResults = await Promise.allSettled(authPromises);
    const authenticatedUsers: { username: string; token: string }[] = [];

    authResults.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.token) {
        authenticatedUsers.push({
          username: result.value.username,
          token: result.value.token,
        });
      } else {
        console.log(`❌ Failed to authenticate ${usernames[index]}`);
      }
    });

    console.log(
      `✅ Successfully authenticated ${authenticatedUsers.length}/${usernames.length} users`
    );

    console.log(
      `🔌 Connecting ${authenticatedUsers.length} users in batches...`
    );

    // Connect authenticated users in batches
    for (let i = 0; i < authenticatedUsers.length; i += batchSize) {
      const batch = authenticatedUsers.slice(i, i + batchSize);
      const batchClients = await Promise.allSettled(
        batch.map(({ username, token }) => createClient(username, token))
      );

      batchClients.forEach((result, index) => {
        if (result.status === "fulfilled") {
          clients.push(result.value);
        } else {
          console.log(
            `❌ Failed to connect ${batch[index].username}: ${result.reason.message}`
          );
        }
      });

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(
      `🎯 Connected ${clients.length}/${authenticatedUsers.length} users`
    );

    // Wait for all clients to be ready
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create chats using NEW_ONE_TO_ONE_CHAT messages
    console.log("💬 Creating one-to-one chats...");

    for (const [user1, user2] of userPairs) {
      const client1 = clients.find((c) => c.username === user1);

      if (!client1 || !client1.isReady) {
        errorCount++;
        console.log(`❌ Client ${user1} not ready or not found`);
        continue;
      }

      try {
        client1.ws.send(
          JSON.stringify({
            type: "NEW_ONE_TO_ONE_CHAT",
            from: user1,
            to: user2,
          })
        );

        // Small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        errorCount++;
        console.log(
          `❌ Failed to send chat request ${user1} → ${user2}:`,
          error
        );
      }
    }

    // Wait for all responses
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Close all connections
    clients.forEach((client) => {
      try {
        client.ws.send(JSON.stringify({ type: "DISCONNECT" }));
        client.ws.close();
      } catch (error) {
        // Ignore close errors
      }
    });

    console.log("\n📊 One-to-One Chat Creation Summary:");
    console.log(`✅ Successfully created: ${successCount} chats`);
    console.log(`⏭️  Skipped (already exist): ${skipCount} chats`);
    console.log(`❌ Failed: ${errorCount} chats`);
    console.log(
      `🎯 Total processed: ${successCount + skipCount + errorCount}/${
        userPairs.length
      }`
    );
  } catch (error) {
    console.error("❌ Error creating one-to-one chats:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createOneToOneChatsViaWebSocket()
    .then(() => {
      console.log("🎉 One-to-one chat creation completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Script failed:", error);
      process.exit(1);
    });
}

export { createOneToOneChatsViaWebSocket };
