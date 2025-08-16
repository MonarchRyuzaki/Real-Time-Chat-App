import { WebSocket, WebSocketServer } from "ws";
import {
  chatConnectionManager,
  presenceConnectionManager,
} from "../services/connectionService";
import { getClient } from "../services/redis";

interface PresenceWebSocket extends WebSocket {
  isAlive?: boolean;
  pingInterval?: NodeJS.Timeout;
  username?: string
}

export async function presenceHandler(
  ws: PresenceWebSocket,
  wss: WebSocketServer
) {
  ws.isAlive = true;
  const client = await getClient();
  const username = presenceConnectionManager.getUsername(ws);
  if (client && username) {
    ws.username = username;
    await client.publish("online", username);
  }
  ws.on("pong", async () => {
    const username = ws.username;
    console.log(`Responding to ping ${username}`);
    const client = await getClient();
    if (client) {
      await client
        .multi()
        .set(`online_users:${username}`, "1", {
          EX: 60,
        })
        .set(`last_seen:${username}`, new Date().toISOString())
        .exec();
    }
    ws.isAlive = true;
  });
  ws.pingInterval = setInterval(() => {
    const username = presenceConnectionManager.getUsername(ws);
    if (ws.isAlive === false) {
      console.log(`${username} is dead`);
      cleanupConnection(ws);
      return;
    }
    ws.isAlive = false;
    console.log(`Pinging ${username}`);
    ws.ping();
  }, 30000);

  ws.on("close", () => {
    cleanupConnection(ws);
    console.log("Client disconnected from presence handler");
  });

  ws.on("error", (error) => {
    console.error("Presence WebSocket error:", error);
    cleanupConnection(ws);
  });
}

async function cleanupConnection(ws: PresenceWebSocket): Promise<void> {
  try {
    if (ws.pingInterval) {
      clearInterval(ws.pingInterval);
      ws.pingInterval = undefined;
    }
    const client = await getClient();
    const username = ws.username;
    if (client) {
      if (username) {
        await client.publish("offline", username);
        await client.del(`online_users:${username}`);
        console.log(`Removed online status for ${username}`);
      }
    }
    console.log(`${username} is getting clean up`);
    presenceConnectionManager.removeConnection(ws);
  } catch (error) {
    console.error("Error during presence connection cleanup:", error);
  }
}
