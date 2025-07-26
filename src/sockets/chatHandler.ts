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
  try {
    initChatHandler(ws).catch((error) => {
      console.error("Error initializing chat handler:", error);
      WsResponse.error(ws, "Failed to initialize chat session.");
    });

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
          // Wrap handler execution in try-catch for async handlers
          Promise.resolve(handler(ws, parsed as any)).catch((error) => {
            console.error(`Error in ${parsed.type} handler:`, error);
            WsResponse.error(ws, `Failed to process ${parsed.type} request.`);
          });
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
      try {
        console.log("Client disconnected");
        // Clean up user mappings on disconnect
        const username = mapSocketToUser.get(ws);
        if (username) {
          mapUserToSocket.delete(username);
          mapSocketToUser.delete(ws);
        }
      } catch (error) {
        console.error("Error during client disconnect cleanup:", error);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      try {
        // Clean up user mappings on error
        const username = mapSocketToUser.get(ws);
        if (username) {
          mapUserToSocket.delete(username);
          mapSocketToUser.delete(ws);
        }
      } catch (cleanupError) {
        console.error("Error during error cleanup:", cleanupError);
      }
    });
  } catch (error) {
    console.error("Error setting up chat handler:", error);
    WsResponse.error(ws, "Failed to set up chat session.");
  }
}

async function initChatHandler(ws: WebSocket): Promise<void> {
  try {
    const username = mapSocketToUser.get(ws);
    if (!username) {
      WsResponse.error(ws, "You must be logged in to use the chat.");
      return;
    }

    // Check if user exists with error handling
    try {
      const userExistsResult = await userExists(username);
      if (!userExistsResult) {
        WsResponse.error(ws, `User ${username} does not exist.`);
        return;
      }
    } catch (error) {
      console.error("Error checking if user exists:", username, error);
      WsResponse.error(ws, "Failed to verify user credentials.");
      return;
    }

    // Database operations with error handling
    try {
      const prisma = getPrismaClient();
      const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
          groupMembership: true,
          friendships: true,
        },
      });

      if (!user) {
        WsResponse.error(ws, "User data not found.");
        return;
      }

      // Send initial data to client
      WsResponse.custom(ws, {
        type: "INIT_DATA",
        chatIds: user.friendships.map((friendship) => friendship.friend) || [],
        groups: user.groupMembership.map((group) => group.id) || [],
      });

      console.log(`Chat handler initialized for user: ${username}`);
    } catch (error) {
      console.error("Error fetching user data for chat initialization:", username, error);
      WsResponse.error(ws, "Failed to load chat data.");
    }
  } catch (error) {
    console.error("Error in initChatHandler:", error);
    WsResponse.error(ws, "Failed to initialize chat session.");
  }
}

function disconnectHandler(ws: WebSocket): void {
  try {
    const username = mapSocketToUser.get(ws);
    if (username) {
      try {
        mapUserToSocket.delete(username);
        mapSocketToUser.delete(ws);
        WsResponse.info(ws, "You have been disconnected.");
        console.log(`User ${username} disconnected gracefully`);
      } catch (cleanupError) {
        console.error("Error cleaning up user mappings during disconnect:", cleanupError);
        // Still try to send disconnect message even if cleanup fails
        WsResponse.info(ws, "You have been disconnected.");
      }
    } else {
      console.log("Disconnect handler called for unknown user");
      WsResponse.info(ws, "You have been disconnected.");
    }
  } catch (error) {
    console.error("Error in disconnectHandler:", error);
    // Don't send error response here as the client is disconnecting
  }
}
