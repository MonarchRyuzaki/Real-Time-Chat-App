import { WebSocket, WebSocketServer } from "ws";
import {
  chatConnectionManager,
  presenceConnectionManager,
} from "../services/connectionService";

interface PresenceWebSocket extends WebSocket {
  isAlive?: boolean;
  pingInterval?: NodeJS.Timeout;
}

export function presenceHandler(ws: PresenceWebSocket, wss: WebSocketServer) {
  ws.isAlive = true;

  ws.on("pong", () => {
    ws.isAlive = true;
  });
  ws.pingInterval = setInterval(() => {
    if (ws.isAlive === false) {
      cleanupConnection(ws);
      return;
    }
    ws.isAlive = false;
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
    if (username) {
      const chatWs = chatConnectionManager.getSocket(username);
      if (chatWs) chatConnectionManager.removeConnection(chatWs);
    }
    presenceConnectionManager.removeConnection(ws);
  } catch (error) {
    console.error("Error during presence connection cleanup:", error);
  }
}
