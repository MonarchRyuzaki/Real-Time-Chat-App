import { WebSocket, WebSocketServer } from "ws";

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
