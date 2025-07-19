import readline from "readline";
import WebSocket from "ws";

let username = "";
let friends: string[] = [];
let isInitialized = false;

// Create readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
        console.log(
          `👥 Friends List: ${message.friends.join(", ") || "No friends yet"}`
        );
        friends = message.friends;
        if (!isInitialized) {
          isInitialized = true;
          // Start the menu after receiving initial friends list
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
        // Clear current line and display info, then restore prompt
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`ℹ️ ${message.msg}`);
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
  console.log("3. Exit");

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
      // Continue the menu loop
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
            type: "GET_ONE_TO_ONE_HISTORY",
            from: username,
            to: friendName,
          })
        );
      }
      // Continue the menu loop
      setImmediate(() => mainMenu(ws));
      break;

    case "3":
      console.log("Goodbye!");
      ws.send(JSON.stringify({ type: "DISCONNECT", username }));
      ws.close();
      rl.close();
      process.exit();

    default:
      console.log("Invalid option");
      // Continue the menu loop
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
