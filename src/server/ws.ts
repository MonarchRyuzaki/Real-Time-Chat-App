import { IncomingMessage } from "http";
import { URL } from "url";
import { WebSocket, WebSocketServer } from "ws";

export const mapUserToSocket = new Map<string, WebSocket>();
export const mapSocketToUser = new Map<WebSocket, string>();

export function createWebSocketServer({
  port,
  handler,
}: {
  port: number;
  handler: (ws: WebSocket, req: WebSocketServer) => void;
}) {
  const wss = new WebSocketServer({ port });
  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    console.log(`New connection`);
    console.log(`Request URL: ${req.url}`);
    // Parse URL properly to extract username
    let username: string | null = null;
    if (req.url) {
      try {
        const url = new URL(req.url, `ws://localhost:${port}`);
        username = url.searchParams.get("username");
        console.log(`Parsed username: ${username}`);
      } catch (e) {
        console.error("Error parsing URL:", e);
      }
    }

    if (!username) {
      console.error("No username provided in the connection request.");
      ws.close();
      return;
    }

    console.log(`User ${username} connected`);
    mapUserToSocket.set(username, ws);
    mapSocketToUser.set(ws, username);

    // Take Care of authentication here
    try {
      handler(ws, wss);
    } catch (e) {
      console.error("Error in WebSocket handler:", e);
      ws.close();
    }
  });
  console.log(`WebSocket server is running on ws://localhost:${port}`);
  return wss;
}
