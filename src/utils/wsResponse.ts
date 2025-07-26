import { WebSocket } from "ws";
import { OutgoingResponse } from "../types/responseTypes";

export const WsResponse = {
  error: (ws: WebSocket, message: string): void => {
    ws.send(JSON.stringify({ type: "ERROR", msg: message }));
  },

  info: (ws: WebSocket, message: string): void => {
    ws.send(JSON.stringify({ type: "INFO", msg: message }));
  },

  success: (ws: WebSocket, message: string): void => {
    ws.send(JSON.stringify({ type: "SUCCESS", msg: message }));
  },

  custom: (ws: WebSocket, data: OutgoingResponse): void => {
    ws.send(JSON.stringify(data));
  },
};
