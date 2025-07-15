import { WebSocket, WebSocketServer } from "ws";

export function presenceHandler(ws: WebSocket, wss: WebSocketServer) {
  ws.on("message", (data: string) => {
    const parsed = JSON.parse(data);
    // Handle presence updates here
    console.log("Presence update received:", parsed);
  });

  ws.on("close", () => {
    console.log("Client disconnected from presence handler");
  });
}
