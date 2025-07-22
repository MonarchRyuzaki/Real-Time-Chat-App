import readline from "readline";
import WebSocket from "ws";

let username = "";
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

// Initialize the client
async function init() {
  username = await question("Enter your username: ");
  const ws = new WebSocket(`ws://localhost:4000/?username=${username}`);

  ws.on("open", () => {
    console.log("Connected to chat server!");
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
        console.log(`\n📩 ${message.from}: ${message.content}`);
        // If we're currently in a prompt, redisplay it
        rl.prompt();
        break;

      case "ONE_TO_ONE_CHAT_HISTORY":
        console.log(`\n📜 Chat History:`);
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

      case "INFO":
        // Clear current line and display info, then restore prompt
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`ℹ️ ${message.msg}`);
        rl.prompt();
        break;

      case "ERROR":
        // Clear current line and display error, then restore prompt
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`❌ Error: ${message.msg}`);
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
      const chatId = generateChatId(username, newFriend);
      const initialMsg = await question("Enter your first message: ");

      // Add to local friends map
      friendsMap.set(newFriend, chatId);
      chatIds.push(chatId);

      ws.send(
        JSON.stringify({
          type: "ONE_TO_ONE_CHAT",
          from: username,
          to: newFriend,
          content: initialMsg,
          chatId: chatId,
        })
      );
      console.log(`✅ Started new chat with ${newFriend}`);
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
