import { WebSocket, WebSocketServer } from "ws";
import {
  chatConnectionManager,
  presenceConnectionManager,
} from "../services/connectionService";
interface PresenceWebSocket extends WebSocket {
  isAlive?: boolean;
}
export function presenceHandler(ws: PresenceWebSocket, wss: WebSocketServer) {
  ws.on("pong", () => {
    ws.isAlive = true;
  });
  ws.on("message", (data: string) => {
    const parsed = JSON.parse(data);
    // Handle presence updates here
    console.log("Presence update received:", parsed);
  });

  const interval = setInterval(() => {
    if (ws.isAlive === false) {
      chatConnectionManager.removeConnection(ws);
      presenceConnectionManager.removeConnection(ws);
      ws.terminate();
      return;
    }
    ws.isAlive = false;
    ws.ping();
  }, 30000);

  ws.on("close", () => {
    clearInterval(interval);
    chatConnectionManager.removeConnection(ws);
    presenceConnectionManager.removeConnection(ws);
    console.log("Client disconnected from presence handler");
  });
}
