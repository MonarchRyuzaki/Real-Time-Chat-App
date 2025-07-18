import readline from "readline";
import WebSocket from "ws";

let username = "";
let friends: string[] = [];
let groups: Array<{ groupId: string; groupName: string }> = [];
let isInitialized = false;

// Create readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initialize the client
async function init() {
  username = await question("Enter your username: ");
  const ws = new WebSocket(`ws://localhost:4000?username=${username}`);

  ws.on("open", () => {
    console.log("Connected to group chat server!");
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    switch (message.type) {
      case "INIT_DATA":
        console.log(
          `👥 Friends List: ${message.friends.join(", ") || "No friends yet"}`
        );
        console.log(
          `📋 Groups: ${
            message.groups?.map((g: any) => g.groupName).join(", ") ||
            "No groups yet"
          }`
        );
        friends = message.friends;
        groups = message.groups || [];
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
        rl.prompt();
        break;

      case "GROUP_CHAT_CREATED":
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`\n🎉 Group chat created with ID: ${message.groupChatId}`);
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

      case "ONE_TO_ONE_CHAT_HISTORY":
        console.log(`\n📜 Chat History:`);
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

  console.log("\n=== Group Chat Menu ===");
  console.log("1. Send Direct Message");
  console.log("2. View Direct Chat History");
  console.log("3. Create Group Chat");
  console.log("4. Join Group Chat");
  console.log("5. Send Group Message");
  console.log("6. View Group Chat History");
  console.log("7. List My Groups");
  console.log("8. Exit");

  const choice = await question("Choose an option: ");

  switch (choice) {
    case "1":
      if (friends.length === 0) {
        console.log("You have no friends yet 😢");
      } else {
        console.log("Your Friends:", friends.join(", "));
        const recipient = await question("Enter friend's username: ");
        const msg = await question("Enter message: ");
        ws.send(
          JSON.stringify({
            type: "ONE_TO_ONE_CHAT",
            from: username,
            to: recipient,
            content: msg,
          })
        );
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "2":
      if (friends.length === 0) {
        console.log("You have no friends yet 😢");
      } else {
        console.log("Your Friends:", friends.join(", "));
        const friendName = await question(
          "Enter friend's username to view history: "
        );
        ws.send(
          JSON.stringify({
            type: "GET_ONE_TO_ONE_HOSTORY",
            from: username,
            to: friendName,
          })
        );
      }
      setImmediate(() => mainMenu(ws));
      break;

    case "3":
      const groupName = await question("Enter group name: ");
      ws.send(
        JSON.stringify({
          type: "CREATE_GROUP_CHAT",
          groupName: groupName,
        })
      );
      setImmediate(() => mainMenu(ws));
      break;

    case "4":
      const groupId = await question("Enter group ID to join: ");
      ws.send(
        JSON.stringify({
          type: "JOIN_GROUP_CHAT",
          groupId: groupId,
        })
      );
      setImmediate(() => mainMenu(ws));
      break;

    case "5":
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

    case "6":
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

    case "7":
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

    case "8":
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
init().catch(console.error);
