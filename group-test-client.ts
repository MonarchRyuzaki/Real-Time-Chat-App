import readline from "readline";
import WebSocket from "ws";

// Type definitions for API responses
interface AuthResponse {
  message?: string;
  username?: string;
  token?: string;
  error?: string;
}

// WebSocket message types based on backend
interface BaseMessage {
  type: string;
}

interface InitDataMessage extends BaseMessage {
  type: "INIT_DATA";
  chatIds: string[];
  groups: string[]; // Changed from number[] to string[] to match backend
}

interface GroupChatCreatedResponse extends BaseMessage {
  type: "GROUP_CHAT_CREATED";
  groupId: string;
}

interface GroupMemberJoinedResponse extends BaseMessage {
  type: "GROUP_MEMBER_JOINED";
  groupId: string;
  username: string;
}

interface GroupChatResponse extends BaseMessage {
  type: "GROUP_CHAT";
  from: string;
  groupId: string;
  content: string;
}

interface GroupChatHistoryResponse extends BaseMessage {
  type: "GROUP_CHAT_HISTORY";
  messages: Array<{
    messageId: string;
    from: string;
    text: string;
    timestamp: string;
  }>;
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
let groups: Array<{ groupId: string; groupName: string }> = [];
let chatIds: string[] = [];
let friendsMap: Map<string, string> = new Map();
let isInitialized = false;
let isConnecting = false;
let awaitingInput = false; // Add flag to prevent clearing output
let pendingGroupJoin: string | null = null; // Track group ID we're trying to join

// Create readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Clear screen and show header
function showHeader() {
  // Don't clear the screen - let messages stay visible
  console.log("\n🏷️ Real-Time Group Chat Application");
  console.log("=".repeat(50));
  if (username) {
    console.log(`👤 Logged in as: ${username}`);
    console.log(`🏷️ Member of ${groups.length} group(s)`);
    console.log("=".repeat(50));
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

// Enhanced authentication functions with better error handling
async function register(): Promise<boolean> {
  try {
    const username = await question("Enter username (min 3 characters): ");
    const password = await question("Enter password (min 6 characters): ");

    if (!username.trim() || username.trim().length < 3) {
      console.log("❌ Username must be at least 3 characters long!");
      return false;
    }

    if (!password || password.length < 6) {
      console.log("❌ Password must be at least 6 characters long!");
      return false;
    }

    console.log("⏳ Registering user...");

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username.trim(), password }),
    });

    const data = (await response.json()) as AuthResponse;

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

async function login(): Promise<boolean> {
  try {
    const usernameInput = await question("Enter username: ");
    const password = await question("Enter password: ");

    if (!usernameInput.trim() || !password) {
      console.log("❌ Username and password are required!");
      return false;
    }

    console.log("⏳ Logging in...");

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameInput.trim(), password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok) {
      username = data.username!;
      authToken = data.token!;
      console.log(`✅ Login successful! Welcome back ${username}!`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } else {
      console.log(`❌ Login failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    console.error(
      "❌ Login error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.log(
      "Please check if the server is running on http://localhost:3000"
    );
    return false;
  }
}

async function authMenu(): Promise<void> {
  showHeader();
  console.log("\n=== Authentication Required ===");
  console.log("1. Login");
  console.log("2. Register");
  console.log("3. Exit");

  const choice = await question("\nChoose an option (1-3): ");

  switch (choice) {
    case "1":
      const loginSuccess = await login();
      if (loginSuccess) {
        await connectToWebSocket();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await authMenu();
      }
      break;

    case "2":
      const registerSuccess = await register();
      if (registerSuccess) {
        console.log("✅ Registration complete! Now please login.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await authMenu();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await authMenu();
      }
      break;

    case "3":
      console.log("👋 Goodbye!");
      rl.close();
      process.exit();

    default:
      console.log("❌ Invalid option. Please try again.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await authMenu();
  }
}

// Enhanced WebSocket connection with better error handling
async function connectToWebSocket(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("📡 Connecting to group chat server...");
    isConnecting = true;

    const ws = new WebSocket(`ws://localhost:4000?username=${username}`, {
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
      console.log("✅ Connected to group chat server!");
      resolve();
    });

    ws.on("message", (data) => {
      handleIncomingMessage(ws, data.toString());
    });

    ws.on("close", () => {
      console.log("\n📴 Connection closed");
      rl.close();
      process.exit();
    });

    ws.on("error", (error) => {
      clearTimeout(connectionTimeout);
      isConnecting = false;
      console.error("❌ WebSocket error:", error.message);

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

      rl.close();
      process.exit(1);
    });
  });
}

// Enhanced message handlers
function handleIncomingMessage(ws: WebSocket, data: string) {
  try {
    const message = JSON.parse(data);

    switch (message.type) {
      case "INIT_DATA":
        handleInitData(message as InitDataMessage, ws);
        break;

      case "GROUP_CHAT_CREATED":
        handleGroupChatCreated(message as GroupChatCreatedResponse);
        break;

      case "SUCCESS":
        handleSuccess(message as SuccessResponse);
        break;

      case "GROUP_MEMBER_JOINED":
        handleGroupMemberJoined(message as GroupMemberJoinedResponse);
        break;

      case "GROUP_CHAT":
        handleGroupChat(message as GroupChatResponse);
        break;

      case "GROUP_CHAT_HISTORY":
        handleGroupChatHistory(message as GroupChatHistoryResponse);
        break;

      case "INFO":
        handleInfo(message as InfoResponse);
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

function handleInitData(message: InitDataMessage, ws: WebSocket) {
  // Handle groups data - server sends array of group IDs as strings
  if (message.groups && Array.isArray(message.groups)) {
    console.log(
      `📋 Group memberships: ${
        message.groups.length > 0 ? message.groups.length : "None"
      }`
    );

    // Store group IDs - backend sends them as strings (snowflake IDs)
    groups = message.groups.map((groupId: string) => ({
      groupId: groupId,
      groupName: `Group ${groupId}`, // Placeholder name
    }));
  }

  // Handle friend chat IDs
  if (message.chatIds && Array.isArray(message.chatIds)) {
    chatIds = [...message.chatIds];
    friendsMap.clear();

    // Extract friend usernames from chat IDs
    message.chatIds.forEach((chatId: string) => {
      const parts = chatId.split("-");
      if (parts.length === 2) {
        const friend = parts[0] === username ? parts[1] : parts[0];
        friendsMap.set(friend, chatId);
      }
    });

    console.log(
      `👥 Friends: ${
        friendsMap.size > 0 ? Array.from(friendsMap.keys()).join(", ") : "None"
      }`
    );
  }

  if (!isInitialized) {
    isInitialized = true;
    console.log("\n✅ Group chat session initialized!");
    setTimeout(() => mainMenu(ws), 1000);
  }
}

function handleGroupChatCreated(message: GroupChatCreatedResponse) {
  console.log(`\n🎉 Group chat created with ID: ${message.groupId}`);
  console.log(
    `💡 To join this group, use option 2 and enter the group ID: ${message.groupId}`
  );
}

function handleSuccess(message: SuccessResponse) {
  console.log(`\n✅ ${message.msg}`);

  // Check if this is a group join success message and we have a pending join
  if (message.msg.includes("has joined the group") && pendingGroupJoin) {
    const match = message.msg.match(/User (\w+) has joined the group/);
    if (match && match[1] === username) {
      // Add the group to our local list immediately
      if (!groups.find((g) => g.groupId === pendingGroupJoin)) {
        groups.push({
          groupId: pendingGroupJoin!,
          groupName: `Group ${pendingGroupJoin}`,
        });
        console.log(`✅ You are now a member of group ${pendingGroupJoin}`);
        console.log(
          `💬 You can now send messages to this group using option 3!`
        );
      }
      pendingGroupJoin = null; // Clear the pending join
    }
  }
}

function handleGroupMemberJoined(message: GroupMemberJoinedResponse) {
  console.log(`\n👥 ${message.username} joined group: ${message.groupId}`);

  // Add group to our list if we just joined it
  if (
    message.username === username &&
    !groups.find((g) => g.groupId === message.groupId)
  ) {
    groups.push({
      groupId: message.groupId,
      groupName: `Group ${message.groupId}`,
    });
    console.log(`✅ You are now a member of group ${message.groupId}`);
    console.log(`💬 You can now send messages to this group using option 3!`);
  }
}

function handleGroupChat(message: GroupChatResponse) {
  console.log(
    `\n📩 Group [${message.groupId}] ${message.from}: ${message.content}`
  );
}

function handleGroupChatHistory(message: GroupChatHistoryResponse) {
  console.log(`\n📜 Group Chat History:`);
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

function handleInfo(message: InfoResponse) {
  console.log(`\nℹ️ ${message.msg}`);
}

function handleError(message: ErrorResponse) {
  console.log(`\n❌ Error: ${message.msg}`);
}

function showMainMenu() {
  showHeader();
  console.log("\n=== Group Chat Menu ===");
  console.log("1. 🎉 Create Group Chat");
  console.log("2. 🚪 Join Group Chat");
  console.log("3. 💬 Send Group Message");
  console.log("4. 📜 View Group Chat History");
  console.log("5. 📋 List My Groups");
  console.log("6. 👤 Account Info");
  console.log("7. 🚪 Exit");
}

async function mainMenu(ws: WebSocket): Promise<void> {
  if (!isInitialized) {
    console.log("⏳ Waiting for server initialization...");
    return;
  }

  showMainMenu();
  awaitingInput = true;
  const choice = await question("\nChoose an option (1-7): ");
  awaitingInput = false;

  switch (choice) {
    case "1":
      await handleCreateGroup(ws);
      break;

    case "2":
      await handleJoinGroup(ws);
      break;

    case "3":
      await handleSendGroupMessage(ws);
      break;

    case "4":
      await handleViewGroupHistory(ws);
      break;

    case "5":
      await handleListGroups();
      break;

    case "6":
      await handleAccountInfo();
      break;

    case "7":
      console.log("👋 Goodbye!");
      ws.send(JSON.stringify({ type: "DISCONNECT" }));
      ws.close();
      rl.close();
      process.exit();

    default:
      console.log("❌ Invalid option. Please try again.");
      await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Continue menu loop
  setImmediate(() => mainMenu(ws));
}

async function handleCreateGroup(ws: WebSocket) {
  const groupName = await question("Enter group name: ");

  if (!groupName.trim()) {
    console.log("❌ Group name cannot be empty!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return;
  }

  ws.send(
    JSON.stringify({
      type: "CREATE_GROUP_CHAT",
      groupName: groupName.trim(),
      by: username,
    })
  );

  console.log(`🔄 Creating group "${groupName.trim()}"...`);
  console.log(
    "💡 Note: Creating a group doesn't automatically join you to it."
  );
  console.log(
    "   You'll need to join the group manually using the group ID provided."
  );
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Give time to see the message
}

async function handleJoinGroup(ws: WebSocket) {
  const groupId = await question("Enter group ID to join: ");

  if (!groupId.trim()) {
    console.log("❌ Group ID cannot be empty!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return;
  }

  if (groups.find((g) => g.groupId === groupId.trim())) {
    console.log(`❌ You are already a member of group ${groupId.trim()}!`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return;
  }

  // Track the group we're trying to join
  pendingGroupJoin = groupId.trim();

  ws.send(
    JSON.stringify({
      type: "JOIN_GROUP_CHAT",
      groupId: groupId.trim(),
      username: username,
    })
  );

  console.log(`🔄 Joining group ${groupId.trim()}...`);
  console.log("⏳ Waiting for confirmation...");
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Give time for response
}

async function handleSendGroupMessage(ws: WebSocket) {
  if (groups.length === 0) {
    console.log("\n😢 You are not in any groups yet!");
    console.log("💡 Use option 2 to join a group or option 1 to create one!");
    console.log("🔍 Available groups to join: group1, group2, group3");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return;
  }

  console.log("\n🏷️ Your Groups:");
  groups.forEach((group, index) => {
    console.log(`  ${index + 1}. ${group.groupName} (ID: ${group.groupId})`);
  });

  const groupIndex = await question(`\nSelect group (1-${groups.length}): `);
  const index = parseInt(groupIndex) - 1;

  if (index < 0 || index >= groups.length) {
    console.log("❌ Invalid selection!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  const selectedGroup = groups[index];
  const message = await question("Enter your message: ");

  if (!message.trim()) {
    console.log("❌ Message cannot be empty!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  ws.send(
    JSON.stringify({
      type: "GROUP_CHAT",
      from: username,
      to: selectedGroup.groupId,
      content: message.trim(),
    })
  );

  console.log(`✅ Message sent to ${selectedGroup.groupName}!`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

async function handleViewGroupHistory(ws: WebSocket) {
  if (groups.length === 0) {
    console.log("\n😢 You are not in any groups yet!");
    console.log("💡 Use option 2 to join a group or option 1 to create one!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return;
  }

  console.log("\n🏷️ Your Groups:");
  groups.forEach((group, index) => {
    console.log(`  ${index + 1}. ${group.groupName} (ID: ${group.groupId})`);
  });

  const groupIndex = await question(
    `\nSelect group to view history (1-${groups.length}): `
  );
  const index = parseInt(groupIndex) - 1;

  if (index < 0 || index >= groups.length) {
    console.log("❌ Invalid selection!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  const selectedGroup = groups[index];

  ws.send(
    JSON.stringify({
      type: "GET_GROUP_CHAT_HISTORY",
      groupId: selectedGroup.groupId,
    })
  );

  console.log(`🔄 Loading history for ${selectedGroup.groupName}...`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

async function handleListGroups() {
  console.log("\n📋 Your Groups:");
  console.log("=".repeat(40));

  if (groups.length === 0) {
    console.log("  You are not in any groups yet 😢");
    console.log("  💡 Use option 1 to create a group or option 2 to join one!");
    console.log("  🔍 Available groups to join: group1, group2, group3");
  } else {
    groups.forEach((group, index) => {
      console.log(`  ${index + 1}. ${group.groupName} (ID: ${group.groupId})`);
    });
  }

  console.log("=".repeat(40));
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

async function handleAccountInfo() {
  console.log("\n👤 Account Information:");
  console.log("=".repeat(30));
  console.log(`Username: ${username}`);
  console.log(`Groups Joined: ${groups.length}`);
  console.log(`Friends: ${friendsMap.size}`);
  console.log(`Active Chats: ${chatIds.length}`);
  console.log("=".repeat(30));
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n👋 Goodbye!");
  rl.close();
  process.exit();
});

// Start the application
console.log("🚀 Starting Group Chat Client...");
authMenu().catch((error) => {
  console.error("❌ Fatal error:", error);
  rl.close();
  process.exit(1);
});
