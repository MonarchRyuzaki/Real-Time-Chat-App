import readline from "readline";
import WebSocket from "ws";

// Type definitions for API responses
interface AuthResponse {
  message?: string;
  token?: string;
  username?: string;
  error?: string;
}

interface RegisterResponse {
  message?: string;
  username?: string;
  error?: string;
}

// WebSocket message types based on backend
interface BaseMessage {
  type: string;
}

interface InitDataMessage extends BaseMessage {
  type: "INIT_DATA";
  chatIds: string[];
  groups: number[];
}

interface MessageResponse extends BaseMessage {
  type: "MESSAGE";
  from: string;
  content: string;
  chatId: string;
}

interface OneToOneChatHistoryResponse extends BaseMessage {
  type: "ONE_TO_ONE_CHAT_HISTORY";
  messages: Array<{
    messageId: string;
    from: string;
    to: string;
    text: string;
    timestamp: string;
  }>;
}

interface NewOneToOneChatApprovalResponse extends BaseMessage {
  type: "NEW_ONE_TO_ONE_CHAT_AP";
  from?: string;
  to?: string;
  msg?: string;
  chatId?: string;
}

interface ErrorResponse extends BaseMessage {
  type: "ERROR";
  msg: string;
}

interface InfoResponse extends BaseMessage {
  type: "INFO";
  msg: string;
}

interface SuccessResponse extends BaseMessage {
  type: "SUCCESS";
  msg: string;
}

// Global state
let username = "";
let authToken = "";
let chatIds: string[] = [];
let friendsMap: Map<string, string> = new Map(); // Maps friend username to chat ID
let isInitialized = false;
let isConnecting = false;

// Create readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to generate chat ID matching backend logic
function generateChatId(user1: string, user2: string): string {
  if (!user1 || !user2) {
    throw new Error("Both users are required to generate a chat ID");
  }
  // Sort the usernames to ensure consistent chat ID generation (matches backend)
  const sortedUsers = [user1, user2].sort();
  return `${sortedUsers[0]}-${sortedUsers[1]}`;
}

// Clear screen and show header
function showHeader() {
  console.clear();
  console.log("🚀 Real-Time Chat Application");
  console.log("=".repeat(50));
  if (username) {
    console.log(`👤 Logged in as: ${username}`);
    console.log("=".repeat(50));
  }
}

// Enhanced authentication functions with better error handling
async function registerUser(
  username: string,
  password: string
): Promise<boolean> {
  try {
    console.log("⏳ Registering user...");

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as RegisterResponse;

    if (response.ok) {
      console.log(
        `✅ Registration successful! Welcome ${data.username || username}!`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } else {
      console.log(`❌ Registration failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    console.error(
      "❌ Registration error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.log(
      "Please check if the server is running on http://localhost:3000"
    );
    return false;
  }
}

async function loginUser(
  username: string,
  password: string
): Promise<string | null> {
  try {
    console.log("⏳ Logging in...");

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok) {
      console.log(
        `✅ Login successful! Welcome back ${data.username || username}!`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data.token || null;
    } else {
      console.log(`❌ Login failed: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error(
      "❌ Login error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.log(
      "Please check if the server is running on http://localhost:3000"
    );
    return null;
  }
}

async function authenticateUser(): Promise<void> {
  showHeader();
  console.log("\n=== Authentication Required ===");
  console.log("1. Login");
  console.log("2. Register");
  console.log("3. Exit");

  const choice = await question("\nChoose an option (1-3): ");

  switch (choice) {
    case "1":
      const loginUsername = await question("Enter username: ");
      const loginPassword = await question("Enter password: ");

      if (!loginUsername.trim() || !loginPassword) {
        console.log("❌ Username and password are required!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await authenticateUser();
        return;
      }

      const token = await loginUser(loginUsername.trim(), loginPassword);
      if (token) {
        username = loginUsername.trim();
        authToken = token;
        return;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await authenticateUser();
      }
      break;

    case "2":
      const regUsername = await question("Enter username (min 3 characters): ");
      const regPassword = await question("Enter password (min 6 characters): ");

      if (!regUsername.trim() || regUsername.trim().length < 3) {
        console.log("❌ Username must be at least 3 characters long!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await authenticateUser();
        return;
      }

      if (!regPassword || regPassword.length < 6) {
        console.log("❌ Password must be at least 6 characters long!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await authenticateUser();
        return;
      }

      const success = await registerUser(regUsername.trim(), regPassword);
      if (success) {
        console.log("✅ Registration complete! Now please login.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await authenticateUser();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await authenticateUser();
      }
      break;

    case "3":
      console.log("👋 Goodbye!");
      rl.close();
      process.exit(0);

    default:
      console.log("❌ Invalid choice. Please try again.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await authenticateUser();
  }
}

// Enhanced WebSocket connection with better error handling
async function connectToWebSocket(): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    console.log("📡 Connecting to WebSocket server...");
    isConnecting = true;

    const ws = new WebSocket(`ws://localhost:4000/?username=${username}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const connectionTimeout = setTimeout(() => {
      if (isConnecting) {
        ws.close();
        reject(new Error("Connection timeout"));
      }
    }, 10000);

    ws.on("open", () => {
      clearTimeout(connectionTimeout);
      isConnecting = false;
      console.log("✅ Connected to chat server!");
      resolve(ws);
    });

    ws.on("error", (error) => {
      clearTimeout(connectionTimeout);
      isConnecting = false;
      console.error("❌ WebSocket connection error:", error.message);

      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        console.log("Authentication failed. Please login again.");
      } else {
        console.log(
          "Please check if the WebSocket server is running on ws://localhost:4000"
        );
      }

      reject(error);
    });
  });
}

// Enhanced message handlers
function handleIncomingMessage(ws: WebSocket, data: string) {
  try {
    const message = JSON.parse(data);

    switch (message.type) {
      case "INIT_DATA":
        handleInitData(message as InitDataMessage);
        break;

      case "MESSAGE":
        handleMessage(message as MessageResponse);
        break;

      case "ONE_TO_ONE_CHAT_HISTORY":
        handleChatHistory(message as OneToOneChatHistoryResponse);
        break;

      case "NEW_ONE_TO_ONE_CHAT_AP":
        handleNewChatApproval(message as NewOneToOneChatApprovalResponse);
        break;

      case "INFO":
        handleInfo(message as InfoResponse);
        break;

      case "SUCCESS":
        handleSuccess(message as SuccessResponse);
        break;

      case "ERROR":
        handleError(message as ErrorResponse);
        break;

      default:
        console.log(`⚠️ Unknown message type: ${message.type}`);
    }
  } catch (error) {
    console.error("❌ Error parsing message:", error);
  }
}

function handleInitData(message: InitDataMessage) {
  // Handle friend chat IDs from server
  if (message.chatIds && Array.isArray(message.chatIds)) {
    friendsMap.clear();
    chatIds = [...message.chatIds];

    // Extract friend usernames from chat IDs
    message.chatIds.forEach((chatId: string) => {
      const parts = chatId.split("-");
      if (parts.length === 2) {
        const friend = parts[0] === username ? parts[1] : parts[0];
        friendsMap.set(friend, chatId);
      }
    });

    console.log(
      `💬 Active Chats: ${chatIds.length > 0 ? chatIds.length : "None"}`
    );
    console.log(
      `👥 Friends: ${
        friendsMap.size > 0 ? Array.from(friendsMap.keys()).join(", ") : "None"
      }`
    );
  }

  // Handle groups data
  if (message.groups && Array.isArray(message.groups)) {
    console.log(
      `🏷️ Groups: ${message.groups.length > 0 ? message.groups.length : "None"}`
    );
  }

  if (!isInitialized) {
    isInitialized = true;
    console.log("\n✅ Chat session initialized!");
    setTimeout(() => showMainMenu(), 1000);
  }
}

function handleMessage(message: MessageResponse) {
  // Clear current line and display message, then restore prompt
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  console.log(`\n📩 ${message.from}: ${message.content}`);
  console.log(`   Chat ID: ${message.chatId}`);
  rl.prompt();
}

function handleChatHistory(message: OneToOneChatHistoryResponse) {
  console.log(`\n📜 Chat History:`);
  console.log("=".repeat(50));

  if (message.messages && message.messages.length > 0) {
    message.messages.forEach((msg) => {
      const timestamp = new Date(msg.timestamp).toLocaleString();
      console.log(`[${timestamp}] ${msg.from}: ${msg.text}`);
    });
  } else {
    console.log("  No previous messages");
  }
  console.log("=".repeat(50));
}

function handleNewChatApproval(message: NewOneToOneChatApprovalResponse) {
  if (message.from) {
    // Incoming chat request
    console.log(`\n🤝 ${message.from} wants to start a chat with you!`);
    console.log(`✅ Chat established with ${message.from}`);

    if (message.chatId) {
      friendsMap.set(message.from, message.chatId);
      if (!chatIds.includes(message.chatId)) {
        chatIds.push(message.chatId);
      }
    }
  } else if (message.to) {
    // Outgoing chat confirmation
    console.log(`\n✅ Chat established with ${message.to}`);

    if (message.chatId) {
      friendsMap.set(message.to, message.chatId);
      if (!chatIds.includes(message.chatId)) {
        chatIds.push(message.chatId);
      }
    }
  } else if (message.msg) {
    console.log(`\n✅ ${message.msg}`);
  }
  rl.prompt();
}

function handleInfo(message: InfoResponse) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  console.log(`\nℹ️ ${message.msg}`);
  rl.prompt();
}

function handleSuccess(message: SuccessResponse) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  console.log(`\n✅ ${message.msg}`);
  rl.prompt();
}

function handleError(message: ErrorResponse) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  console.log(`\n❌ Error: ${message.msg}`);
  rl.prompt();
}

// Initialize the client
async function init() {
  try {
    showHeader();
    console.log("Welcome to Real-Time Chat App!");

    // Authenticate user first
    await authenticateUser();

    if (!authToken) {
      console.log("❌ Authentication failed. Exiting...");
      process.exit(1);
    }

    // Connect to WebSocket
    const ws = await connectToWebSocket();

    // Set up message handler
    ws.on("message", (data) => handleIncomingMessage(ws, data.toString()));

    ws.on("close", () => {
      console.log("\n📴 Connection closed");
      rl.close();
      process.exit();
    });

    ws.on("error", (error) => {
      console.error("\n💥 WebSocket error:", error.message);
      rl.close();
      process.exit(1);
    });

    // Wait for initialization
    await new Promise((resolve) => {
      const checkInit = () => {
        if (isInitialized) {
          resolve(undefined);
        } else {
          setTimeout(checkInit, 100);
        }
      };
      checkInit();
    });

    // Start main menu
    await mainMenu(ws);
  } catch (error) {
    console.error(
      "❌ Failed to initialize client:",
      error instanceof Error ? error.message : "Unknown error"
    );
    rl.close();
    process.exit(1);
  }
}

// Helper function to promisify readline question
function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

function showMainMenu() {
  showHeader();
  console.log("\n=== Main Menu ===");
  console.log("1. 💬 Message a Friend");
  console.log("2. 📜 View Chat History");
  console.log("3. 🤝 Start New Chat");
  console.log("4. 📋 List Active Chats");
  console.log("5. 👤 Account Info");
  console.log("6. 🚪 Exit");
}

async function mainMenu(ws: WebSocket): Promise<void> {
  if (!isInitialized) {
    console.log("⏳ Waiting for server initialization...");
    return;
  }

  showMainMenu();
  const choice = await question("\nChoose an option (1-6): ");

  switch (choice) {
    case "1":
      await handleSendMessage(ws);
      break;

    case "2":
      await handleViewHistory(ws);
      break;

    case "3":
      await handleStartNewChat(ws);
      break;

    case "4":
      await handleListChats();
      break;

    case "5":
      await handleAccountInfo();
      break;

    case "6":
      console.log("👋 Goodbye!");
      ws.send(JSON.stringify({ type: "DISCONNECT" }));
      ws.close();
      rl.close();
      process.exit();

    default:
      console.log("❌ Invalid option. Please try again.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  // Continue menu loop
  setImmediate(() => mainMenu(ws));
}

async function handleSendMessage(ws: WebSocket) {
  if (friendsMap.size === 0) {
    console.log("\n😢 You have no active chats yet!");
    console.log("💡 Use option 3 to start a new chat!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return;
  }

  console.log("\n👥 Your Friends:");
  const friends = Array.from(friendsMap.keys());
  friends.forEach((friend, index) => {
    console.log(`  ${index + 1}. ${friend}`);
  });

  const friendIndex = await question(`\nSelect friend (1-${friends.length}): `);
  const index = parseInt(friendIndex) - 1;

  if (index < 0 || index >= friends.length) {
    console.log("❌ Invalid selection!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  const recipient = friends[index];
  const message = await question("Enter your message: ");

  if (!message.trim()) {
    console.log("❌ Message cannot be empty!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  const chatId = friendsMap.get(recipient)!;

  ws.send(
    JSON.stringify({
      type: "ONE_TO_ONE_CHAT",
      from: username,
      to: recipient,
      content: message.trim(),
      chatId: chatId,
    })
  );

  console.log(`✅ Message sent to ${recipient}!`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

async function handleViewHistory(ws: WebSocket) {
  if (friendsMap.size === 0) {
    console.log("\n😢 You have no active chats yet!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return;
  }

  console.log("\n👥 Your Friends:");
  const friends = Array.from(friendsMap.keys());
  friends.forEach((friend, index) => {
    console.log(`  ${index + 1}. ${friend}`);
  });

  const friendIndex = await question(
    `\nSelect friend to view history (1-${friends.length}): `
  );
  const index = parseInt(friendIndex) - 1;

  if (index < 0 || index >= friends.length) {
    console.log("❌ Invalid selection!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  const friend = friends[index];
  const chatId = friendsMap.get(friend)!;

  ws.send(
    JSON.stringify({
      type: "GET_ONE_TO_ONE_HISTORY",
      from: username,
      to: friend,
      chatId: chatId,
    })
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));
}

async function handleStartNewChat(ws: WebSocket) {
  const newFriend = await question("Enter username to start new chat with: ");

  if (!newFriend.trim()) {
    console.log("❌ Username cannot be empty!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  if (newFriend.trim() === username) {
    console.log("❌ You cannot start a chat with yourself!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  if (friendsMap.has(newFriend.trim())) {
    console.log(`❌ You already have an active chat with ${newFriend.trim()}!`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  ws.send(
    JSON.stringify({
      type: "NEW_ONE_TO_ONE_CHAT",
      from: username,
      to: newFriend.trim(),
    })
  );

  console.log(`🔄 Sending chat request to ${newFriend.trim()}...`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

async function handleListChats() {
  console.log("\n📋 Active Chats:");
  console.log("=".repeat(30));

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

  console.log("=".repeat(30));
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

async function handleAccountInfo() {
  console.log("\n👤 Account Information:");
  console.log("=".repeat(30));
  console.log(`Username: ${username}`);
  console.log(`Active Chats: ${chatIds.length}`);
  console.log(`Friends: ${friendsMap.size}`);
  console.log("=".repeat(30));
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n👋 Goodbye!");
  rl.close();
  process.exit();
});

// Start the application
init().catch((error) => {
  console.error("❌ Fatal error:", error);
  rl.close();
  process.exit(1);
});
