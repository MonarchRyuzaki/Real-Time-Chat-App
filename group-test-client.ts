import readline from "readline";
import WebSocket from "ws";

let username = "";
let authToken = "";
let groups: Array<{ groupId: string; groupName: string }> = [];
let isInitialized = false;

// Create readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to promisify readline question
function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// Authentication response types
interface AuthResponse {
  message: string;
  username?: string;
  token?: string;
  error?: string;
}

// Authentication functions
async function register(): Promise<boolean> {
  try {
    const username = await question("Enter username: ");
    const password = await question("Enter password: ");

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok) {
      console.log(`✅ Registration successful! Welcome ${data.username}`);
      return true;
    } else {
      console.log(`❌ Registration failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    console.error("❌ Registration error:", error);
    return false;
  }
}

async function login(): Promise<boolean> {
  try {
    const usernameInput = await question("Enter username: ");
    const password = await question("Enter password: ");

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameInput, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok) {
      username = data.username!;
      authToken = data.token!;
      console.log(`✅ Login successful! Welcome back ${username}`);
      return true;
    } else {
      console.log(`❌ Login failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    return false;
  }
}

async function authMenu(): Promise<void> {
  console.log("\n=== Authentication ===");
  console.log("1. Login");
  console.log("2. Register");
  console.log("3. Exit");

  const choice = await question("Choose an option: ");

  switch (choice) {
    case "1":
      const loginSuccess = await login();
      if (loginSuccess) {
        await connectToWebSocket();
      } else {
        await authMenu();
      }
      break;
    case "2":
      const registerSuccess = await register();
      if (registerSuccess) {
        console.log("Please login with your new account:");
        await authMenu();
      } else {
        await authMenu();
      }
      break;
    case "3":
      console.log("Goodbye!");
      rl.close();
      process.exit();
    default:
      console.log("Invalid option");
      await authMenu();
  }
}

// WebSocket connection function
async function connectToWebSocket(): Promise<void> {
  const ws = new WebSocket(`ws://localhost:4000?username=${username}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  ws.on("open", () => {
    console.log("Connected to group chat server!");
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    switch (message.type) {
      case "INIT_DATA":
        // Handle groups data - server sends array of group IDs
        if (message.groups && Array.isArray(message.groups)) {
          console.log(
            `📋 Group IDs: ${
              message.groups.length > 0
                ? message.groups.join(", ")
                : "No groups yet"
            }`
          );
          // For now, store group IDs as simple objects
          // In a real implementation, you'd fetch group details from the server
          groups = message.groups.map((groupId: string) => ({
            groupId: groupId,
            groupName: `Group ${groupId}`, // Placeholder name
          }));
        }

        // Handle friend usernames
        if (message.chatIds && Array.isArray(message.chatIds)) {
          console.log(
            `👥 Friends: ${
              message.chatIds.length > 0
                ? message.chatIds.join(", ")
                : "No friends yet"
            }`
          );
        }

        if (!isInitialized) {
          isInitialized = true;
          // Start the menu after receiving initial data
          setImmediate(() => mainMenu(ws));
        }
        break;

      case "GROUP_CHAT_CREATED":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`\n🎉 Group chat created with ID: ${message.groupChatId}`);
        rl.prompt();
        break;

      case "SUCCESS":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`\n✅ ${message.msg}`);
        rl.prompt();
        break;

      case "GROUP_CHAT_JOINED":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(
          `\n✅ Joined group: ${message.groupName} (ID: ${message.groupId})`
        );
        if (!groups.find((g) => g.groupId === message.groupId)) {
          groups.push({
            groupId: message.groupId,
            groupName: message.groupName,
          });
        }
        rl.prompt();
        break;

      case "GROUP_MEMBER_JOINED":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(
          `\n👥 ${message.username} joined group: ${message.groupId}`
        );
        rl.prompt();
        break;

      case "GROUP_CHAT":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(
          `\n📩 Group [${message.groupId}] ${message.from}: ${message.content}`
        );
        rl.prompt();
        break;

      case "GROUP_CHAT_HISTORY":
        console.log(`\n📜 Group Chat History:`);
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

      case "INFO":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`\nℹ️ ${message.msg}`);
        rl.prompt();
        break;

      case "ERROR":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`\n❌ Error: ${message.msg}`);
        rl.prompt();
        break;

      default:
        console.log(`⚠️ Unknown message type:`, message);
    }
  });

  ws.on("close", () => {
    console.log("Connection closed");
    rl.close();
    process.exit();
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    rl.close();
    process.exit(1);
  });
}

async function mainMenu(ws: WebSocket) {
  if (!isInitialized) {
    console.log("Waiting for server initialization...");
    return;
  }

  console.log("\n=== Group Chat Menu ===");
  console.log("1. Create Group Chat");
  console.log("2. Join Group Chat");
  console.log("3. Send Group Message");
  console.log("4. View Group Chat History");
  console.log("5. List My Groups");
  console.log("6. Exit");

  const choice = await question("Choose an option: ");

  switch (choice) {
    case "1":
      const groupName = await question("Enter group name: ");
      ws.send(
        JSON.stringify({
          type: "CREATE_GROUP_CHAT",
          groupName: groupName,
          by: username,
        })
      );
      setImmediate(() => mainMenu(ws));
      break;

    case "2":
      const groupId = await question("Enter group ID to join: ");
      ws.send(
        JSON.stringify({
          type: "JOIN_GROUP_CHAT",
          groupId: groupId,
          username: username,
        })
      );
      setImmediate(() => mainMenu(ws));
      break;

    case "3":
      if (groups.length === 0) {
        console.log("You are not in any groups yet 😢");
        console.log("Available groups to join: group1, group2, group3");
      } else {
        console.log("Your Groups:");
        groups.forEach((group) => {
          console.log(`  • ${group.groupName} (ID: ${group.groupId})`);
        });
        const targetGroupId = await question("Enter group ID: ");
        const message = await question("Enter message: ");
        ws.send(
          JSON.stringify({
            type: "GROUP_CHAT",
            from: username,
            to: targetGroupId,
            content: message,
          })
        );
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "4":
      if (groups.length === 0) {
        console.log("You are not in any groups yet 😢");
        console.log("Available groups to join: group1, group2, group3");
      } else {
        console.log("Your Groups:");
        groups.forEach((group) => {
          console.log(`  • ${group.groupName} (ID: ${group.groupId})`);
        });
        const historyGroupId = await question("Enter group ID: ");
        ws.send(
          JSON.stringify({
            type: "GET_GROUP_CHAT_HISTORY",
            groupId: historyGroupId,
          })
        );
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "5":
      console.log("\n📋 Your Groups:");
      if (groups.length === 0) {
        console.log("  You are not in any groups yet 😢");
        console.log("  Available groups to join: group1, group2, group3");
      } else {
        groups.forEach((group) => {
          console.log(`  • ${group.groupName} (ID: ${group.groupId})`);
        });
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "6":
      console.log("Goodbye!");
      ws.send(JSON.stringify({ type: "DISCONNECT", username }));
      ws.close();
      rl.close();
      process.exit();

    default:
      console.log("Invalid option");
      setImmediate(() => mainMenu(ws));
  }
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\nGoodbye!");
  rl.close();
  process.exit();
});

// Start the application
console.log("🚀 Starting Group Chat Client...");
authMenu().catch(console.error);
