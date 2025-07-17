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
  wss.on("connection", (ws: WebSocket, req: Request) => {
    console.log(`New conection`);
    const username = req.url?.split("?username=")[1];
    if (!username) {
      console.error("No username provided in the connection request.");
      ws.close();
      return;
    }
    mapUserToSocket.set(username, ws);
    mapSocketToUser.set(ws, username);
    // Take Care of authentication here
    try {
      handler(ws, wss);
    } catch (e) {
      ws.close();
    }
  });
  console.log(`WebSocket server is running on ws://localhost:${port}`);
  return wss;
}
