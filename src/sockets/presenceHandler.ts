import { WebSocket, WebSocketServer } from "ws";
import {
  chatConnectionManager,
  presenceConnectionManager,
} from "../services/connectionService";
import { redisService } from "../services/redis";

interface PresenceWebSocket extends WebSocket {
  isAlive?: boolean;
  pingInterval?: NodeJS.Timeout;
}

export function presenceHandler(ws: PresenceWebSocket, wss: WebSocketServer) {
  ws.isAlive = true;

  ws.on("pong", async () => {
    const username = presenceConnectionManager.getUsername(ws);
    console.log(`Responding to ping ${username}`);
    await redisService.set(`online_users:${username}`, "1");
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

function cleanupConnection(ws: PresenceWebSocket): void {
  try {
    if (ws.pingInterval) {
      clearInterval(ws.pingInterval);
      ws.pingInterval = undefined;
    }
    const username = presenceConnectionManager.getUsername(ws);
    console.log(`${username} is getting clean up`);
    if (username) {
      const chatWs = chatConnectionManager.getSocket(username);
      if (chatWs) chatConnectionManager.removeConnection(chatWs);
    }
    presenceConnectionManager.removeConnection(ws);
  } catch (error) {
    console.error("Error during presence connection cleanup:", error);
  }
}
