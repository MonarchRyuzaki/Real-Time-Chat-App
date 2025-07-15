import { WebSocket, WebSocketServer } from "ws";

export function chatHandler(ws: WebSocket, wss: WebSocketServer) {
  ws.on("message", (data: string) => {
    const parsed = JSON.parse(data);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
}
