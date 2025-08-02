import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import WebSocket from "ws";

dotenv.config();

export const testGroups = [
  {
    name: "group1",
    creator: "user1",
    members: [
      "user1",
      "user2",
      "user3",
      "user4",
      "user5",
      "user6",
      "user7",
      "user8",
      "user9",
      "user10",
    ],
  },
  {
    name: "group2",
    creator: "user11",
    members: [
      "user11",
      "user12",
      "user13",
      "user14",
      "user15",
      "user16",
      "user17",
      "user18",
      "user19",
      "user20",
    ],
  },
  {
    name: "group3",
    creator: "user21",
    members: [
      "user21",
      "user22",
      "user23",
      "user24",
      "user25",
      "user26",
      "user27",
      "user28",
      "user29",
      "user30",
    ],
  },
  {
    name: "group4",
    creator: "user31",
    members: [
      "user31",
      "user32",
      "user33",
      "user34",
      "user35",
      "user36",
      "user37",
      "user38",
      "user39",
      "user40",
    ],
  },
  {
    name: "group5",
    creator: "user41",
    members: [
      "user41",
      "user42",
      "user43",
      "user44",
      "user45",
      "user46",
      "user47",
      "user48",
      "user49",
      "user50",
    ],
  },
  {
    name: "group6",
    creator: "user51",
    members: [
      "user51",
      "user52",
      "user53",
      "user54",
      "user55",
      "user56",
      "user57",
      "user58",
      "user59",
      "user60",
    ],
  },
  {
    name: "group7",
    creator: "user61",
    members: [
      "user61",
      "user62",
      "user63",
      "user64",
      "user65",
      "user66",
      "user67",
      "user68",
      "user69",
      "user70",
    ],
  },
  {
    name: "group8",
    creator: "user71",
    members: [
      "user71",
      "user72",
      "user73",
      "user74",
      "user75",
      "user76",
      "user77",
      "user78",
      "user79",
      "user80",
    ],
  },
  {
    name: "group9",
    creator: "user81",
    members: [
      "user81",
      "user82",
      "user83",
      "user84",
      "user85",
      "user86",
      "user87",
      "user88",
      "user89",
      "user90",
    ],
  },
  {
    name: "group10",
    creator: "user91",
    members: [
      "user91",
      "user92",
      "user93",
      "user94",
      "user95",
      "user96",
      "user97",
      "user98",
      "user99",
      "user100",
    ],
  },
  // Cross-team groups for more interaction
  {
    name: "group11",
    creator: "user1",
    members: [
      "user1",
      "user11",
      "user21",
      "user31",
      "user41",
      "user51",
      "user61",
      "user71",
      "user81",
      "user91",
    ],
  },
  {
    name: "group12",
    creator: "user2",
    members: [
      "user5",
      "user15",
      "user25",
      "user35",
      "user45",
      "user55",
      "user65",
      "user75",
      "user85",
      "user95",
    ],
  },
];
interface TestClient {
  username: string;
  ws: WebSocket;
  isReady: boolean;
  createdGroups: string[];
  joinedGroups: string[];
  authToken: string;
}

interface AuthResponse {
  token?: string;
  username?: string;
  error?: string;
  message?: string;
}

// Authentication helper function
async function authenticateUser(
  username: string,
  password: string = "password"
): Promise<string | null> {
  try {
    console.log(`🔐 Authenticating ${username}...`);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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

// Storage for created group IDs
const createdGroupIds: string[] = [];

async function createGroupsAndMembersViaWebSocket() {
  try {
    console.log("🚀 Starting group and membership creation via WebSocket...");

    const clients: TestClient[] = [];
    let groupSuccessCount = 0;
    let groupErrorCount = 0;
    let memberSuccessCount = 0;
    let memberSkipCount = 0;
    let memberErrorCount = 0;

    console.log(`📝 Creating ${testGroups.length} groups...`);

    // Function to create authenticated WebSocket client
    const createClient = (
      username: string,
      authToken: string
    ): Promise<TestClient> => {
      return new Promise((resolve, reject) => {
        // Create WebSocket connection with JWT token in Authorization header
        const ws = new WebSocket(`ws://localhost:4000`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const client: TestClient = {
          username,
          ws,
          isReady: false,
          createdGroups: [],
          joinedGroups: [],
          authToken,
        };

        const timeout = setTimeout(() => {
          reject(new Error(`Connection timeout for ${username}`));
        }, 10000);

        ws.on("open", () => {
          console.log(`✅ ${username} connected with authentication`);
        });

        ws.on("message", (data) => {
          const message = JSON.parse(data.toString());

          if (message.type === "INIT_DATA") {
            client.isReady = true;
            clearTimeout(timeout);
            resolve(client);
          } else if (message.type === "GROUP_CHAT_CREATED") {
            client.createdGroups.push(message.groupId);
            createdGroupIds.push(message.groupId); // Save to our global array
            groupSuccessCount++;
            console.log(`✅ Group created by ${username}: ${message.groupId}`);
          } else if (message.type === "SUCCESS") {
            if (message.msg && message.msg.includes("joined the group")) {
              memberSuccessCount++;
              console.log(`   ✅ ${username} joined group successfully`);
            }
          } else if (message.type === "GROUP_MEMBER_JOINED") {
            if (message.username === username) {
              client.joinedGroups.push(message.groupId);
            }
          } else if (message.type === "ERROR") {
            if (message.msg && message.msg.includes("already a member")) {
              memberSkipCount++;
              console.log(`   ⏭️  ${username} already in group`);
            } else if (message.msg && message.msg.includes("does not exist")) {
              memberErrorCount++;
              console.log(
                `   ❌ ${username} doesn't exist or group doesn't exist`
              );
            } else {
              console.log(`❌ Error for ${username}: ${message.msg}`);
            }
          }
        });

        ws.on("error", (error) => {
          clearTimeout(timeout);
          console.error(`❌ WebSocket error for ${username}:`, error);
          reject(error);
        });

        ws.on("close", (code, reason) => {
          clearTimeout(timeout);
          if (code === 1008) {
            reject(
              new Error(`Authentication failed for ${username}: ${reason}`)
            );
          }
        });
      });
    };

    // Get all unique users from groups
    const allUsers = new Set<string>();
    testGroups.forEach((group) => {
      allUsers.add(group.creator);
      group.members.forEach((member) => allUsers.add(member));
    });

    const usernames = Array.from(allUsers);
    console.log(`🔐 Authenticating ${usernames.length} users...`);

    // Authenticate all users first
    const authPromises = usernames.map(async (username) => {
      const token = await authenticateUser(username);
      return { username, token };
    });

    const authResults = await Promise.allSettled(authPromises);
    const authenticatedUsers: { username: string; token: string }[] = [];

    authResults.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.token) {
        authenticatedUsers.push({
          username: result.value.username,
          token: result.value.token,
        });
      } else {
        console.log(`❌ Failed to authenticate ${usernames[index]}`);
      }
    });

    console.log(
      `✅ Successfully authenticated ${authenticatedUsers.length}/${usernames.length} users`
    );
    console.log(`🔌 Connecting ${authenticatedUsers.length} users...`);

    // Connect authenticated users in batches
    const batchSize = 20;
    for (let i = 0; i < authenticatedUsers.length; i += batchSize) {
      const batch = authenticatedUsers.slice(i, i + batchSize);
      const batchClients = await Promise.allSettled(
        batch.map(({ username, token }) => createClient(username, token))
      );

      batchClients.forEach((result, index) => {
        if (result.status === "fulfilled") {
          clients.push(result.value);
        } else {
          console.log(
            `❌ Failed to connect ${batch[index].username}: ${result.reason.message}`
          );
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(
      `🎯 Connected ${clients.length}/${authenticatedUsers.length} users`
    );

    // Wait for all clients to be ready
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create groups
    console.log("\n👥 Creating groups...");

    for (const group of testGroups) {
      const creator = clients.find((c) => c.username === group.creator);

      if (!creator || !creator.isReady) {
        groupErrorCount++;
        console.log(`❌ Creator ${group.creator} not found or not ready`);
        continue;
      }

      try {
        creator.ws.send(
          JSON.stringify({
            type: "CREATE_GROUP_CHAT",
            groupName: group.name,
            by: group.creator,
          })
        );

        console.log(`🔄 Creating group: ${group.name} by ${group.creator}`);

        // Wait a bit between group creations
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        groupErrorCount++;
        console.log(`❌ Failed to create group ${group.name}:`, error);
      }
    }

    // Wait for group creation responses
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Add members to groups
    console.log("\n👥 Adding members to groups...");

    for (let i = 0; i < testGroups.length; i++) {
      const group = testGroups[i];
      const creator = clients.find((c) => c.username === group.creator);

      // Use the group ID from the creator's created groups (in order)
      const createdGroupId =
        creator?.createdGroups[
          creator.createdGroups.length - (testGroups.length - i)
        ] || creator?.createdGroups[0]; // fallback to first created group

      if (!createdGroupId) {
        console.log(
          `⏭️  Skipping members for ${group.name} - group not created`
        );
        continue;
      }

      console.log(
        `👥 Adding ${group.members.length} members to ${group.name}...`
      );

      for (const memberUsername of group.members) {
        const memberClient = clients.find((c) => c.username === memberUsername);

        if (!memberClient || !memberClient.isReady) {
          memberErrorCount++;
          console.log(`   ❌ Member ${memberUsername} not found or not ready`);
          continue;
        }

        try {
          memberClient.ws.send(
            JSON.stringify({
              type: "JOIN_GROUP_CHAT",
              groupId: createdGroupId,
              username: memberUsername,
            })
          );

          console.log(`   🔄 Adding ${memberUsername} to group`);

          // Small delay between member additions
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          memberErrorCount++;
          console.log(`   ❌ Failed to add ${memberUsername} to group:`, error);
        }
      }

      // Wait between groups
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Wait for all member join responses
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Close all connections
    clients.forEach((client) => {
      try {
        client.ws.send(JSON.stringify({ type: "DISCONNECT" }));
        client.ws.close();
      } catch (error) {
        // Ignore close errors
      }
    });

    // Save group IDs to file after all operations
    const groupIdsFilePath = path.join(
      __dirname,
      "..",
      "benchmark",
      "created-group-ids.json"
    );
    const groupIdsData = {
      groupIds: createdGroupIds,
      timestamp: new Date().toISOString(),
      totalGroups: createdGroupIds.length,
    };

    fs.writeFileSync(groupIdsFilePath, JSON.stringify(groupIdsData, null, 2));
    console.log(
      `💾 Saved ${createdGroupIds.length} group IDs to ${groupIdsFilePath}`
    );

    console.log("\n📊 Group Creation Summary:");
    console.log(`✅ Successfully created: ${groupSuccessCount} groups`);
    console.log(`❌ Failed: ${groupErrorCount} groups`);
    console.log(
      `🎯 Total groups processed: ${groupSuccessCount + groupErrorCount}/${
        testGroups.length
      }`
    );

    console.log("\n👥 Membership Creation Summary:");
    console.log(`✅ Successfully added: ${memberSuccessCount} memberships`);
    console.log(`⏭️  Skipped (already exist): ${memberSkipCount} memberships`);
    console.log(`❌ Failed: ${memberErrorCount} memberships`);
  } catch (error) {
    console.error("❌ Error creating groups and memberships:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createGroupsAndMembersViaWebSocket()
    .then(() => {
      console.log("🎉 Group and membership creation completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Script failed:", error);
      process.exit(1);
    });
}

export { createGroupsAndMembersViaWebSocket };
