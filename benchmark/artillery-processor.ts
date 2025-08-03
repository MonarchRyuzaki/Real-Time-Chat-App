import { generateChatId } from "../src/utils/chatId";

// Type definitions for API responses
interface AuthResponse {
  message?: string;
  token?: string;
  username?: string;
  error?: string;
}

const allUsers = Array.from({ length: 100 }, (_, i) => ({
  [`user${i + 1}`]: {
    username: `user${i + 1}`,
    password: `password`,
    token: null as string | null, // Allow both string and null types
  },
})).reduce((acc, user) => ({ ...acc, ...user }), {});

let userIdx = 0;
let targetFriendIdx = 1; // Start at 1 instead of userIdx + 1

const groups = [
  "2412992431915008",
  "2412994571010048",
  "2412996034822144",
  "2412998224248832",
  "2413000279457792",
  "2413003676844032",
  "2413004465373184",
  "2413006570913792",
  "2413008743563264",
  "2413011344031744",
  "2413012862369792",
  "2413015043407872",
];
let groupIdx = 0;

// Authentication cache to avoid repeated logins
const authCache = new Map<string, string>();

// Function to fetch JWT token for a user
async function getAuthToken(username: string, password: string): Promise<string | null> {
  // Check cache first
  if (authCache.has(username)) {
    return authCache.get(username)!;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as AuthResponse;

    if (response.ok && data.token) {
      // Cache the token
      authCache.set(username, data.token);
      return data.token;
    } else {
      console.error(`Authentication failed for ${username}: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error(`Authentication error for ${username}:`, error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

module.exports = {
  async connectHandler(params: any, context: any, next: any) {
    const user = allUsers[`user${(userIdx % 100) + 1}`];
    userIdx++;

    context.vars.username = user.username;

    // Get or fetch JWT token
    let token = user.token;
    if (!token) {
      token = await getAuthToken(user.username, user.password);
      if (token) {
        user.token = token; // Store for future use
      } else {
        console.error(`Failed to authenticate ${user.username}`);
        // Continue anyway to test error handling
      }
    }

    context.vars.authToken = token;

    params.target = `${params.target}/?username=${context.vars.username}&authToken=${context.vars.authToken}`;
    context.vars.connectStart = performance.now();
    next();
  },
  postConnectionHandler(context: any, events: any, next: any) {
    const endTime = performance.now();
    const duration = endTime - context.vars.connectStart;
    events.emit("histogram", "handshake_latency", duration);
    next();
  },
  handleOneToOne(context: any, events: any, next: any) {
    const targetFriend =
      allUsers[`user${(targetFriendIdx % 100) + 1}`]; // Fixed: ensure we stay within bounds
    targetFriendIdx++;
    context.vars.targetFriend = targetFriend.username;
    context.vars.chatId = generateChatId(
      context.vars.username,
      targetFriend.username
    );
    // console.log(
    //   `${context.vars.username} is sending message to ${context.vars.targetFriend}`
    // );
    next();
  },
  handleGroups(context: any, events: any, next: any) {
    context.vars.groupId = groups[groupIdx % groups.length];
    // console.log(
    //   `${context.vars.username} is sending message to ${context.vars.groupId}`
    // );
    groupIdx++;
    next();
  },
  preMessageSend(context: any, events: any, next: any) {
    context.vars.startTime = performance.now();
    // console.log(`Preparing to send message from ${context.vars.username} to ${context.vars.targetFriend}`);
    next();
  },
  postMessageSend(context: any, events: any, next: any) {
    const endTime = performance.now();
    const duration = endTime - context.vars.startTime;
    // console.log(
    //   `Message sent from ${context.vars.username} to ${context.vars.targetFriend} in ${duration}ms`
    // );
    events.emit("histogram", "latency", duration);
    events.emit("counter", "messages_sent", 1);
    events.emit("rate", "messages_sent_rate");
    next();
  },
};
