import { WebSocket } from "ws";

export const WsResponse = {
  error: (ws: WebSocket, message: string) => {
    ws.send(JSON.stringify({ type: "ERROR", msg: message }));
  },

  info: (ws: WebSocket, message: string) => {
    ws.send(JSON.stringify({ type: "INFO", msg: message }));
  },

  success: (ws: WebSocket, message: string) => {
    ws.send(JSON.stringify({ type: "SUCCESS", msg: message }));
  },

  custom: (ws: WebSocket, data: object) => {
    ws.send(JSON.stringify(data));
  },
};
