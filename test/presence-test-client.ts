import readline from "readline";
import WebSocket from "ws";

interface ClientData {
  username: string;
  ws: WebSocket;
  isConnected: boolean;
  pingReceived: number;
  authToken: string;
}

interface AuthResponse {
  token?: string;
  error?: string;
}

class BasicPresenceTestClient {
  private client: ClientData;

  constructor(username: string, authToken: string) {
    this.client = {
      username,
      ws: new WebSocket(`ws://localhost:4001?username=${username}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      isConnected: false,
      pingReceived: 0,
      authToken,
    };

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    const { ws, username } = this.client;

    ws.on("open", () => {
      this.client.isConnected = true;
      console.log(`✅ [${username}] Connected to presence server`);
    });

    ws.on("ping", () => {
      this.client.pingReceived++;
      console.log(
        `🏓 [${username}] Received ping #${this.client.pingReceived} from server - responding with pong`
      );
      // WebSocket automatically responds with pong, but we can also manually respond
      ws.pong();
    });

    ws.on("message", (data) => {
      console.log(`📨 [${username}] Received message:`, data.toString());
    });

    ws.on("close", (code, reason) => {
      this.client.isConnected = false;
      console.log(
        `❌ [${username}] Connection closed - Code: ${code}, Reason: ${
          reason || "No reason"
        }`
      );
    });

    ws.on("error", (error) => {
      console.error(`💥 [${username}] WebSocket error:`, error.message);
    });
  }

  public getStats() {
    return {
      username: this.client.username,
      isConnected: this.client.isConnected,
      pingReceived: this.client.pingReceived,
      readyState: this.client.ws.readyState,
    };
  }

  public disconnect() {
    console.log(`👋 [${this.client.username}] Disconnecting...`);
    this.client.ws.close();
  }

  public stopRespondingToPings() {
    console.log(
      `⚠️ [${this.client.username}] Removing pong listeners - will not respond to pings anymore`
    );
    this.client.ws.removeAllListeners("ping");
  }

  public forceTerminate() {
    console.log(`⚡ [${this.client.username}] Force terminating connection`);
    this.client.ws.terminate();
  }
}

// Authentication helper
async function authenticateUser(username: string): Promise<string | null> {
  try {
    console.log(`🔐 Authenticating ${username}...`);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: "password",
      }),
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

// Interactive test menu
async function runInteractiveTest() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let client: BasicPresenceTestClient | null = null;

  function question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  function showMenu() {
    console.log("\n=== Basic Presence Test Client ===");
    console.log("1. Connect client (with auth)");
    console.log("2. Show client stats");
    console.log("3. Stop responding to pings (test server disconnect logic)");
    console.log("4. Normal disconnect");
    console.log("5. Force terminate");
    console.log("6. Exit");
    console.log("\n💡 Server sends pings every 30 seconds");
    console.log(
      "💡 If client doesn't respond to ping, server will terminate connection"
    );
  }

  async function handleChoice() {
    showMenu();
    const choice = await question("\nChoose option: ");

    switch (choice) {
      case "1":
        if (client) {
          console.log("❌ Client already connected. Disconnect first.");
          break;
        }
        const username = await question("Enter username: ");
        const token = await authenticateUser(username);
        if (token) {
          client = new BasicPresenceTestClient(username, token);
          console.log("✅ Client created and connecting...");
        }
        break;

      case "2":
        if (!client) {
          console.log("❌ No client connected");
          break;
        }
        console.log("📊 Client Stats:", client.getStats());
        break;

      case "3":
        if (!client) {
          console.log("❌ No client connected");
          break;
        }
        client.stopRespondingToPings();
        console.log("⚠️ Client will no longer respond to server pings");
        console.log(
          "⏰ Wait for next server ping (every 30s) to see disconnection"
        );
        break;

      case "4":
        if (!client) {
          console.log("❌ No client connected");
          break;
        }
        client.disconnect();
        client = null;
        break;

      case "5":
        if (!client) {
          console.log("❌ No client connected");
          break;
        }
        client.forceTerminate();
        client = null;
        break;

      case "6":
        if (client) {
          client.disconnect();
        }
        rl.close();
        console.log("👋 Goodbye!");
        process.exit(0);

      default:
        console.log("❌ Invalid option");
    }

    // Continue the loop
    setTimeout(handleChoice, 1000);
  }

  console.log("🚀 Basic Presence Test Client");
  console.log("=============================");
  console.log("📍 Connects to presence server on port 4001");
  console.log("🔐 Requires authentication");
  console.log("🏓 Tests ping-pong and disconnection logic");

  handleChoice();
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n👋 Exiting gracefully...");
  process.exit(0);
});

runInteractiveTest();
