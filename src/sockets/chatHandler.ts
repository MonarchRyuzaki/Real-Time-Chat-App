import { WebSocket, WebSocketServer } from "ws";
import { userExists } from "../prisma/userExists";
import { mapSocketToUser, mapUserToSocket } from "../server/ws";
import { getPrismaClient } from "../services/prisma";
import { getOneToOneChatHistoryHandler, newOnetoOneChatHandler, oneToOneChatHandler } from "./handlers/oneToOneChatHandlers";
import { createGroupChatHandler, getGroupChatHistoryHandler, groupChatHandler, joinGroupChatHandler } from "./handlers/groupChatHandlers";

export function chatHandler(ws: WebSocket, wss: WebSocketServer) {
  initChatHandler(ws);
  ws.on("message", (data: string) => {
    const parsed = JSON.parse(data);
    switch (parsed.type) {
      case "NEW_ONE_TO_ONE_CHAT":
        newOnetoOneChatHandler(ws, parsed);
        break;
      case "GET_ONE_TO_ONE_HISTORY":
        getOneToOneChatHistoryHandler(ws, parsed);
        break;
      case "ONE_TO_ONE_CHAT":
        oneToOneChatHandler(ws, parsed);
        break;
      case "CREATE_GROUP_CHAT":
        createGroupChatHandler(ws, parsed);
        break;
      case "JOIN_GROUP_CHAT":
        joinGroupChatHandler(ws, parsed);
        break;
      case "GET_GROUP_CHAT_HISTORY":
        getGroupChatHistoryHandler(ws, parsed);
        break;
      case "GROUP_CHAT":
        groupChatHandler(ws, parsed);
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

async function initChatHandler(ws: WebSocket): Promise<void> {
  const username = mapSocketToUser.get(ws);
  if (!username) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: "You must be logged in to use the chat.",
      })
    );
    return;
  }
  if (!userExists(username)) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `User ${username} does not exist.`,
      })
    );
    return;
  }
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      groupMembership: true,
      friendships: true,
    },
  });

  try {
    ws.send(
      JSON.stringify({
        type: "INIT_DATA",
        chatIds: user?.friendships.map((friendship) => friendship.friend) || [],
        groups: user?.groupMembership.map((group) => group.id) || [],
      })
    );
  } catch (error) {
    console.error("Error fetching chat IDs for user:", username, error);
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: "Failed to load chat data.",
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

