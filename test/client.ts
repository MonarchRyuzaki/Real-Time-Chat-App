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
  offlineMessages?: Array<{
    partitionKey: string;
    count: number;
    messageType: "ONE_TO_ONE" | "GROUP";
    from?: string; // For ONE_TO_ONE messages
    groupName?: string; // For GROUP messages
  }>;
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
  isOnline: boolean;
  lastSeenTime?: string; // Optional, for displaying last seen time
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

// WebSocket connections
let chatWebSocket: WebSocket | null = null;
let presenceWebSocket: WebSocket | null = null;
let presenceConnected = false;
let shouldRespondToPings = true; // Flag to simulate presence disconnection

let portNumber = 4000;

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

    const response = await fetch(
      "http://localhost/api/auth/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

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
      "Please check if the server is running on http://localhost/api/auth"
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

    const response = await fetch("http://localhost/api/auth/api/auth/login", {
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
      "Please check if the server is running on http://localhost/api/auth"
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
async function connectToChatWebSocket(): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    console.log("📡 Connecting to Chat WebSocket server...");
    isConnecting = true;

    const ws = new WebSocket(`ws://localhost:${portNumber}/?username=${username}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const connectionTimeout = setTimeout(() => {
      if (isConnecting) {
        ws.close();
        reject(new Error("Chat WebSocket connection timeout"));
      }
    }, 10000);

    ws.on("open", () => {
      clearTimeout(connectionTimeout);
      isConnecting = false;
      console.log("✅ Connected to chat server!");

      // Send INIT_DATA message to trigger server initialization
      console.log("📤 Sending initialization request...");
      ws.send(JSON.stringify({ type: "INIT_DATA" }));

      resolve(ws);
    });

    ws.on("error", (error) => {
      clearTimeout(connectionTimeout);
      isConnecting = false;
      console.error("❌ Chat WebSocket connection error:", error.message);

      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        console.log("Authentication failed. Please login again.");
      } else {
        console.log(
          "Please check if the Chat WebSocket server is running on ws://localhost/ws/chat"
        );
      }

      reject(error);
    });
  });
}

async function connectToPresenceWebSocket(): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    console.log("📡 Connecting to Presence WebSocket server...");

    const ws = new WebSocket(
      `ws://localhost/ws/presence/?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const connectionTimeout = setTimeout(() => {
      ws.close();
      reject(new Error("Presence WebSocket connection timeout"));
    }, 10000);

    ws.on("open", () => {
      clearTimeout(connectionTimeout);
      presenceConnected = true;
      console.log("✅ Connected to presence server!");
      resolve(ws);
    });

    ws.on("ping", () => {
      if (shouldRespondToPings) {
        console.log(
          "🏓 Received ping from presence server - responding with pong"
        );
      } else {
        console.log(
          "⚠️ Received ping from presence server - NOT responding (simulating disconnection)"
        );
      }
    });

    ws.on("message", (data) => {
      console.log("📨 Presence server message:", data.toString());
    });

    ws.on("close", (code, reason) => {
      presenceConnected = false;
      console.log(
        `❌ Presence connection closed - Code: ${code}, Reason: ${
          reason.toString() || "No reason"
        }`
      );
    });

    ws.on("error", (error) => {
      clearTimeout(connectionTimeout);
      presenceConnected = false;
      console.error("❌ Presence WebSocket connection error:", error.message);

      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        console.log("Presence authentication failed. Please login again.");
      } else {
        console.log(
          "Please check if the Presence WebSocket server is running on ws://localhost/ws/presence/"
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

  // Handle offline messages
  if (message.offlineMessages && Array.isArray(message.offlineMessages)) {
    console.log(
      `📥 You have offline messages from ${message.offlineMessages.length} conversation(s):`
    );
    message.offlineMessages.forEach((msg) => {
      if (msg.messageType === "ONE_TO_ONE") {
        console.log(
          `  - 💬 ${msg.count} message(s) from ${msg.from} (Chat: ${msg.partitionKey})`
        );
      } else if (msg.messageType === "GROUP") {
        console.log(
          `  - 👥 ${msg.count} message(s) from group "${msg.groupName}" (ID: ${msg.partitionKey})`
        );
      }
    });

    // Automatically acknowledge offline messages
    if (message.offlineMessages.length > 0) {
      setTimeout(() => {
        const ws = getCurrentWebSocket();
        if (ws) {
          ws.send(JSON.stringify({ type: "OFFLINE_MESSAGES_ACK" }));
          console.log("📤 Offline messages acknowledged");
        }
      }, 1000);
    }
  }

  if (!isInitialized) {
    isInitialized = true;
    console.log("\n✅ Chat session initialized!");
    setTimeout(() => showMainMenu(), 1000);
  }
}

// Store current websocket reference for offline message acknowledgment
function getCurrentWebSocket(): WebSocket | null {
  return chatWebSocket;
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
  const chatPartner =
    message.messages && message.messages.length > 0
      ? message.messages[0].from === username
        ? message.messages[0].to
        : message.messages[0].from
      : "Unknown";

  console.log(`\n📜 Chat History with ${chatPartner}:`);
  console.log("=".repeat(50));

  // Display online status and last seen time
  if (message.isOnline) {
    console.log(`🟢 ${chatPartner} is currently online`);
  } else {
    console.log(`🔴 ${chatPartner} is offline`);
    if (message.lastSeenTime) {
      const lastSeen = new Date(message.lastSeenTime).toLocaleString();
      console.log(`👁️ Last seen: ${lastSeen}`);
    } else {
      console.log(`👁️ Last seen: Unknown`);
    }
  }
  console.log("-".repeat(50));

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

    // Choose connection mode
    console.log("\n=== Connection Mode ===");
    console.log("1. Port 4000");
    console.log("2. Port 4001");

    const modeChoice = await question("Choose connection mode (1-2): ");

    if (modeChoice === "2") {
      portNumber = 4001;
    } else {
      portNumber = 4000;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Authenticate user first
    await authenticateUser();

    if (!authToken) {
      console.log("❌ Authentication failed. Exiting...");
      process.exit(1);
    }

    // Connect to Chat WebSocket
    const chatWs = await connectToChatWebSocket();
    chatWebSocket = chatWs;

    // Connect to Presence WebSocket
    try {
      const presenceWs = await connectToPresenceWebSocket();
      presenceWebSocket = presenceWs;
    } catch (error) {
      console.warn(
        "⚠️ Failed to connect to presence server:",
        error instanceof Error ? error.message : "Unknown error"
      );
      console.log("💡 Continuing without presence connection...");
    }

    // Set up message handler for chat
    chatWs.on("message", (data) =>
      handleIncomingMessage(chatWs, data.toString())
    );

    chatWs.on("close", () => {
      console.log("\n📴 Chat connection closed");
      if (presenceWebSocket) {
        presenceWebSocket.close();
      }
      rl.close();
      process.exit();
    });

    chatWs.on("error", (error) => {
      console.error("\n💥 Chat WebSocket error:", error.message);
      if (presenceWebSocket) {
        presenceWebSocket.close();
      }
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
    await mainMenu(chatWs);
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
  console.log("6. 🔌 Connection Status");
  console.log("7. 🧪 Test Disconnections");
  console.log("8. 🚪 Exit");
}

async function mainMenu(ws: WebSocket): Promise<void> {
  if (!isInitialized) {
    console.log("⏳ Waiting for server initialization...");
    return;
  }

  showMainMenu();
  const choice = await question("\nChoose an option (1-8): ");

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
      await handleConnectionStatus();
      break;

    case "7":
      await handleTestDisconnections();
      break;

    case "8":
      console.log("👋 Goodbye!");
      ws.send(JSON.stringify({ type: "DISCONNECT" }));
      ws.close();
      if (presenceWebSocket) {
        presenceWebSocket.close();
      }
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

async function handleConnectionStatus() {
  console.log("\n🔌 Connection Status:");
  console.log("=".repeat(40));
  console.log(
    `Chat Server (4000): ${
      chatWebSocket?.readyState === WebSocket.OPEN
        ? "✅ Connected"
        : "❌ Disconnected"
    }`
  );
  console.log(
    `Presence Server (4001): ${
      presenceConnected ? "✅ Connected" : "❌ Disconnected"
    }`
  );
  console.log(
    `Ping Response: ${
      shouldRespondToPings
        ? "✅ Enabled"
        : "⚠️ Disabled (simulating disconnection)"
    }`
  );
  console.log("=".repeat(40));
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

async function handleTestDisconnections() {
  console.log("\n🧪 Test Disconnection Options:");
  console.log("=".repeat(40));
  console.log("1. 📞 Disconnect from Chat Server");
  console.log("2. 👥 Disconnect from Presence Server");
  console.log("3. 🏓 Stop responding to presence pings (simulate timeout)");
  console.log("4. 🔄 Resume responding to presence pings");
  console.log("5. ⚡ Force terminate presence connection");
  console.log("6. 🔌 Reconnect to presence server");
  console.log("7. ⬅️ Back to main menu");

  const choice = await question("\nChoose test option (1-7): ");

  switch (choice) {
    case "1":
      if (chatWebSocket) {
        console.log("📞 Disconnecting from chat server...");
        chatWebSocket.send(JSON.stringify({ type: "DISCONNECT" }));
        chatWebSocket.close();
        console.log("✅ Chat server disconnected");
      } else {
        console.log("❌ Chat server not connected");
      }
      break;

    case "2":
      if (presenceWebSocket) {
        console.log("👥 Disconnecting from presence server...");
        presenceWebSocket.close();
        console.log("✅ Presence server disconnected");
      } else {
        console.log("❌ Presence server not connected");
      }
      break;

    case "3":
      shouldRespondToPings = false;
      console.log("🏓 Stopped responding to presence pings");
      console.log(
        "⏰ Wait for next server ping (every 30s) to see disconnection"
      );
      break;

    case "4":
      shouldRespondToPings = true;
      console.log("🔄 Resumed responding to presence pings");
      break;

    case "5":
      if (presenceWebSocket) {
        console.log("⚡ Force terminating presence connection...");
        presenceWebSocket.terminate();
        console.log("✅ Presence connection force terminated");
      } else {
        console.log("❌ Presence server not connected");
      }
      break;

    case "6":
      if (!presenceConnected) {
        try {
          console.log("🔌 Reconnecting to presence server...");
          const presenceWs = await connectToPresenceWebSocket();
          presenceWebSocket = presenceWs;
          shouldRespondToPings = true;
          console.log("✅ Reconnected to presence server");
        } catch (error) {
          console.log(
            "❌ Failed to reconnect to presence server:",
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      } else {
        console.log("✅ Already connected to presence server");
      }
      break;

    case "7":
      return; // Return to main menu

    default:
      console.log("❌ Invalid option");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
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
