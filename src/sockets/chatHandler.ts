import { WebSocket, WebSocketServer } from "ws";
import { userExists } from "../prisma/userExists";
import { mapSocketToUser, mapUserToSocket } from "../server/ws";
import { getPrismaClient } from "../services/prisma";
import { MessageHandlerMap } from "../types/handlerTypes";
import { IncomingMessage } from "../types/messageTypes";
import { WsResponse } from "../utils/wsResponse";
import {
  createGroupChatHandler,
  getGroupChatHistoryHandler,
  groupChatHandler,
  joinGroupChatHandler,
} from "./handlers/groupChatHandlers";
import {
  getOneToOneChatHistoryHandler,
  newOnetoOneChatHandler,
  oneToOneChatHandler,
} from "./handlers/oneToOneChatHandlers";

export function chatHandler(ws: WebSocket, wss: WebSocketServer): void {
  initChatHandler(ws);

  const messageHandler: MessageHandlerMap = {
    NEW_ONE_TO_ONE_CHAT: newOnetoOneChatHandler,
    GET_ONE_TO_ONE_HISTORY: getOneToOneChatHistoryHandler,
    ONE_TO_ONE_CHAT: oneToOneChatHandler,
    CREATE_GROUP_CHAT: createGroupChatHandler,
    JOIN_GROUP_CHAT: joinGroupChatHandler,
    GET_GROUP_CHAT_HISTORY: getGroupChatHistoryHandler,
    GROUP_CHAT: groupChatHandler,
    DISCONNECT: disconnectHandler,
  };

  ws.on("message", (data: string) => {
    try {
      const parsed = JSON.parse(data) as IncomingMessage;
      const handler = messageHandler[parsed.type as keyof MessageHandlerMap];

      if (handler) {
        handler(ws, parsed as any); // Type assertion needed due to union type complexity
      } else {
        WsResponse.error(ws, `Unknown message type: ${parsed.type}`);
        console.error("Unknown message type:", parsed.type);
      }
    } catch (error) {
      WsResponse.error(ws, "Invalid message format.");
      console.error("Error parsing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
}

async function initChatHandler(ws: WebSocket): Promise<void> {
  const username = mapSocketToUser.get(ws);
  if (!username) {
    WsResponse.error(ws, "You must be logged in to use the chat.");
    return;
  }
  if (!(await userExists(username))) {
    WsResponse.error(ws, `User ${username} does not exist.`);
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
    WsResponse.custom(ws, {
      type: "INIT_DATA",
      chatIds: user?.friendships.map((friendship) => friendship.friend) || [],
      groups: user?.groupMembership.map((group) => group.id) || [],
    });
  } catch (error) {
    console.error("Error fetching chat IDs for user:", username, error);
    WsResponse.error(ws, "Failed to load chat data.");
  }
}

function disconnectHandler(ws: WebSocket): void {
  const username = mapSocketToUser.get(ws);
  if (username) {
    mapUserToSocket.delete(username);
    mapSocketToUser.delete(ws);
    WsResponse.info(ws, "You have been disconnected.");
  }
}
