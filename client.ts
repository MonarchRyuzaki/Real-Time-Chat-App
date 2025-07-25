import readline from "readline";
import WebSocket from "ws";

// Type definitions for API responses
interface AuthResponse {
  token?: string;
  error?: string;
}

interface RegisterResponse {
  message?: string;
  error?: string;
}

let username = "";
let authToken = "";
let chatIds: string[] = [];
let friendsMap: Map<string, string> = new Map(); // Maps friend username to chat ID
let isInitialized = false;

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

// Authentication functions
async function registerUser(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as RegisterResponse;

    if (response.ok) {
      console.log("✅ Registration successful!");
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

async function loginUser(
  username: string,
  password: string
): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok) {
      console.log("✅ Login successful!");
      return data.token || null;
    } else {
      console.log(`❌ Login failed: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    return null;
  }
}

async function authenticateUser(): Promise<void> {
  console.log("\n=== Authentication Required ===");
  console.log("1. Login");
  console.log("2. Register");

  const choice = await question("Choose an option (1 or 2): ");

  const inputUsername = await question("Enter username: ");
  const password = await question("Enter password: ");

  if (choice === "1") {
    // Login
    const token = await loginUser(inputUsername, password);
    if (token) {
      username = inputUsername;
      authToken = token;
    } else {
      console.log("❌ Login failed. Please try again.");
      await authenticateUser();
    }
  } else if (choice === "2") {
    // Register
    const success = await registerUser(inputUsername, password);
    if (success) {
      console.log("✅ Registration complete! Now please login.");
      await authenticateUser();
    } else {
      console.log("❌ Registration failed. Please try again.");
      await authenticateUser();
    }
  } else {
    console.log("❌ Invalid choice. Please try again.");
    await authenticateUser();
  }
}

// Initialize the client
async function init() {
  console.log("🚀 Welcome to Real-Time Chat App!");

  // Authenticate user first
  await authenticateUser();

  if (!authToken) {
    console.log("❌ Authentication failed. Exiting...");
    process.exit(1);
  }

  console.log(`\n📡 Connecting to WebSocket server as ${username}...`);

  // Connect to WebSocket with JWT token
  const ws = new WebSocket(`ws://localhost:4000/?username=${username}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  ws.on("open", () => {
    console.log("✅ Connected to chat server!");
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    switch (message.type) {
      case "INIT_DATA":
        // Handle chat IDs from Cassandra
        if (message.chatIds && Array.isArray(message.chatIds)) {
          chatIds = message.chatIds;
          console.log(
            `💬 Active Chats: ${
              chatIds.length > 0 ? chatIds.join(", ") : "No active chats yet"
            }`
          );

          // Extract friend usernames from chat IDs
          friendsMap.clear();
          chatIds.forEach((chatId) => {
            // Extract the other user's name from chat_id format: "user1_user2_chat"
            if (chatId.includes("_chat")) {
              const parts = chatId.replace("_chat", "").split("_");
              const otherUser = parts.find((part) => part !== username);
              if (otherUser) {
                friendsMap.set(otherUser, chatId);
              }
            }
          });

          const friendsList = Array.from(friendsMap.keys());
          console.log(
            `👥 Friends: ${
              friendsList.length > 0 ? friendsList.join(", ") : "No friends yet"
            }`
          );
        }

        if (!isInitialized) {
          isInitialized = true;
          // Start the menu after receiving initial data
          setImmediate(() => mainMenu(ws));
        }
        break;

      case "MESSAGE":
        // Clear current line and display message, then restore prompt
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(
          `\n📩 [ONE_TO_ONE_CHAT] ${message.from}: ${message.content}`
        );
        // If we're currently in a prompt, redisplay it
        rl.prompt();
        break;

      case "ONE_TO_ONE_CHAT_HISTORY":
        console.log(`\n📜 [GET_ONE_TO_ONE_HISTORY] Chat History:`);
        if (message.messages && message.messages.length > 0) {
          message.messages.forEach((msg: any) => {
            console.log(
              `  ${msg.message_from}: ${msg.message_text} (${new Date(
                Number(msg.message_id)
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
            `\n🤝 [NEW_ONE_TO_ONE_CHAT] ${message.from} wants to start a chat with you!`
          );
          console.log(`✅ Chat established with ${message.from}`);

          // Generate chat ID and add to local maps
          const chatId = generateChatId(username, message.from);
          friendsMap.set(message.from, chatId);
          if (!chatIds.includes(chatId)) {
            chatIds.push(chatId);
          }
        } else if (message.msg) {
          console.log(`\n✅ [NEW_ONE_TO_ONE_CHAT] ${message.msg}`);
        }
        rl.prompt();
        break;

      case "INFO":
        // Clear current line and display info, then restore prompt
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`ℹ️ [INFO] ${message.msg}`);
        rl.prompt();
        break;

      case "ERROR":
        // Clear current line and display error, then restore prompt
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`❌ [ERROR] ${message.msg}`);
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
    if (
      error.message.includes("401") ||
      error.message.includes("Unauthorized")
    ) {
      console.log("❌ Authentication failed. Please check your credentials.");
    }
    rl.close();
    process.exit(1);
  });
}

// Helper function to promisify readline question
function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function mainMenu(ws: WebSocket) {
  if (!isInitialized) {
    console.log("Waiting for server initialization...");
    return;
  }

  console.log("\n=== Menu ===");
  console.log("1. Message a Friend");
  console.log("2. View Chat History");
  console.log("3. Start New Chat");
  console.log("4. List Active Chats");
  console.log("5. Exit");

  const choice = await question("Choose an option: ");

  switch (choice) {
    case "1":
      if (friendsMap.size === 0) {
        console.log("You have no active chats yet 😢");
        console.log("Use option 3 to start a new chat!");
      } else {
        const friends = Array.from(friendsMap.keys());
        console.log("Your Friends:", friends.join(", "));
        const recipient = await question("Enter friend's username: ");

        if (friendsMap.has(recipient)) {
          const chatId = friendsMap.get(recipient)!;
          const msg = await question("Enter message: ");
          ws.send(
            JSON.stringify({
              type: "ONE_TO_ONE_CHAT",
              from: username,
              to: recipient,
              content: msg,
              chatId: chatId,
            })
          );
        } else {
          console.log(
            `❌ No active chat found with ${recipient}. Use option 3 to start a new chat.`
          );
        }
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "2":
      if (friendsMap.size === 0) {
        console.log("You have no active chats yet 😢");
      } else {
        const friends = Array.from(friendsMap.keys());
        console.log("Your Friends:", friends.join(", "));
        const friendName = await question(
          "Enter friend's username to view history: "
        );

        if (friendsMap.has(friendName)) {
          const chatId = friendsMap.get(friendName)!;
          ws.send(
            JSON.stringify({
              type: "GET_ONE_TO_ONE_HISTORY",
              from: username,
              to: friendName,
              chatId: chatId,
            })
          );
        } else {
          console.log(`❌ No active chat found with ${friendName}.`);
        }
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "3":
      const newFriend = await question("Enter username to start new chat: ");

      // First establish the friendship/chat relationship
      ws.send(
        JSON.stringify({
          type: "NEW_ONE_TO_ONE_CHAT",
          from: username,
          to: newFriend,
        })
      );

      console.log(`🔄 Sending chat request to ${newFriend}...`);
      setImmediate(() => mainMenu(ws));
      break;

    case "4":
      console.log("\n📋 Active Chats:");
      if (chatIds.length === 0) {
        console.log("  No active chats");
      } else {
        chatIds.forEach((chatId, index) => {
          const friend = Array.from(friendsMap.entries()).find(
            ([_, id]) => id === chatId
          )?.[0];
          console.log(
            `  ${index + 1}. ${chatId}${friend ? ` (with ${friend})` : ""}`
          );
        });
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "5":
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
init().catch(console.error);
