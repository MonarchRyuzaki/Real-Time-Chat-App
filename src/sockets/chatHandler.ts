import { WebSocket, WebSocketServer } from "ws";
import { mockUsers } from "../mockData";
import { mapSocketToUser, mapUserToSocket } from "../server/ws";

export function chatHandler(ws: WebSocket, wss: WebSocketServer) {
  initChatHandler(ws);
  ws.on("message", (data: string) => {
    const parsed = JSON.parse(data);
    switch (parsed.type) {
      case "GET_ONE_TO_ONE_HOSTORY":
        getOneToOneChatHistoryHandler(ws, parsed);
        break;
      case "ONE_TO_ONE_CHAT":
        oneToOneChatHandler(ws, parsed);
        break;
      case "DISCONNECT":
        disconnectHandler(ws);
        break;
      default:
        console.error("Unknown message type:", parsed.type);
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
}

function initChatHandler(ws: WebSocket): void {
  const username = mapSocketToUser.get(ws);
  ws.send(
    JSON.stringify({
      type: "INIT_DATA",
      friends: username
        ? mockUsers[username as keyof typeof mockUsers]?.friends || []
        : [],
    })
  );
}

function getOneToOneChatHistoryHandler(
  ws: WebSocket,
  parsed: { from: string; to: string }
): void {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  ws.send(
    JSON.stringify({
      type: "ONE_TO_ONE_CHAT_HISTORY",
      messages:
        mockUsers[fromUsername as keyof typeof mockUsers]?.messages[
          toUsername as keyof (typeof mockUsers)[keyof typeof mockUsers]["messages"]
        ] || [],
    })
  );
}

function oneToOneChatHandler(
  ws: WebSocket,
  parsed: { from: string; to: string; content: string }
): void {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  const messageContent = parsed.content;

  if (mapUserToSocket.has(toUsername)) {
    const recipientSocket = mapUserToSocket.get(toUsername);
    if (recipientSocket) {
      recipientSocket.send(
        JSON.stringify({
          type: "MESSAGE",
          from: fromUsername,
          content: messageContent,
        })
      );
    }
  } else {
    ws.send(
      JSON.stringify({
        type: "INFO",
        msg: `User ${toUsername} is not online.`,
      })
    );
  }
}

function disconnectHandler(ws: WebSocket): void {
  const username = mapSocketToUser.get(ws);
  if (username) {
    mapUserToSocket.delete(username);
    mapSocketToUser.delete(ws);
    ws.send(
      JSON.stringify({ type: "INFO", msg: "You have been disconnected." })
    );
  }
}
