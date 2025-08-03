import { WebSocket, WebSocketServer } from "ws";
import { chatConnectionManager } from "../services/connectionService";
import { prisma } from "../services/prisma";
import { MessageHandlerMap } from "../types/handlerTypes";
import {
  IncomingMessage,
  OfflineMessagesAckMessage,
} from "../types/messageTypes";
import { WsResponse } from "../utils/wsResponse";
import { WsValidation } from "../utils/wsValidation";
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
    OFFLINE_MESSAGES_ACK: offlineMessagesAckHandler,
    DISCONNECT: disconnectHandler,
  };

  ws.on("message", (data: string) => {
    handleMessage(ws, data, messageHandler);
  });

  ws.on("close", () => {
    handleDisconnect(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    handleDisconnect(ws);
  });
}

function handleMessage(
  ws: WebSocket,
  data: string,
  messageHandler: MessageHandlerMap
): void {
  try {
    const parsed = JSON.parse(data) as IncomingMessage;
    const handler = messageHandler[parsed.type as keyof MessageHandlerMap];

    if (handler) {
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
}

function handleDisconnect(ws: WebSocket): void {
  try {
    const username = chatConnectionManager.getUsername(ws);
    chatConnectionManager.removeConnection(ws);
    if (username) {
      console.log(`User ${username} disconnected`);
    } else {
      console.log("Disconnect handler called for unknown user");
    }
  } catch (error) {
    console.error("Error during disconnect cleanup:", error);
  }
}

async function initChatHandler(ws: WebSocket): Promise<void> {
  // Check if WebSocket is still open before proceeding
  if (ws.readyState !== WebSocket.OPEN) {
    console.log(
      "WebSocket connection closed before initialization could complete"
    );
    return;
  }

  const username = chatConnectionManager.getUsername(ws);
  if (!username || !(await WsValidation.validateUser(ws, username))) return;

  // Check again after async operations
  if (ws.readyState !== WebSocket.OPEN) {
    console.log(
      `WebSocket connection closed during initialization for user: ${username}`
    );
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      include: {
        groupMembership: true,
        friendships1: true,
        friendships2: true,
        OfflineMessages: true,
      },
    });

    if (!user) {
      WsResponse.error(ws, "User data not found.");
      return;
    }

    const offlineMessageSummary: {
      [key: string]: {
        count: number;
        from?: string;
        groupName?: string;
        messageType: string;
      };
    } = {};

    for (const msg of user.OfflineMessages) {
      const key = msg.partitionKey;

      if (!offlineMessageSummary[key]) {
        offlineMessageSummary[key] = { count: 0, messageType: msg.messageType };

        if (msg.messageType === "ONE_TO_ONE") {
          const users = msg.partitionKey.split("-");
          const otherUser = users[0] === username ? users[1] : users[0];
          offlineMessageSummary[key].from = otherUser;
        } else if (msg.messageType === "GROUP") {
          const group = user.groupMembership.find(
            (gm: any) => gm.group === msg.partitionKey
          );
          if (group) {
            const groupData = await prisma.group.findUnique({
              where: { groupId: msg.partitionKey },
              select: { groupName: true },
            });
            offlineMessageSummary[key].groupName =
              groupData?.groupName || msg.partitionKey;
          } else {
            offlineMessageSummary[key].groupName = msg.partitionKey;
          }
        }
      }

      offlineMessageSummary[key].count++;
    }

    WsResponse.custom(ws, {
      type: "INIT_DATA",
      chatIds: user.friendships1
        .map((f: any) => f.chatId)
        .concat(user.friendships2.map((f: any) => f.chatId)),
      groups: user.groupMembership.map((group: any) => group.group) || [],
      offlineMessages:
        Object.entries(offlineMessageSummary).map(
          ([partitionKey, summary]) => ({
            partitionKey,
            count: summary.count,
            messageType: summary.messageType,
            ...(summary.messageType === "ONE_TO_ONE"
              ? { from: summary.from }
              : { groupName: summary.groupName }),
          })
        ) || [],
    });

    console.log(`Chat handler initialized for user: ${username}`);
  } catch (error) {
    console.error(
      "Error fetching user data for chat initialization:",
      username,
      error
    );
    WsResponse.error(ws, "Failed to load chat data.");
  }
}

async function offlineMessagesAckHandler(
  ws: WebSocket,
  data: OfflineMessagesAckMessage
): Promise<void> {
  const username = chatConnectionManager.getUsername(ws);
  if (!username || !(await WsValidation.validateUser(ws, username))) return;

  try {
    await prisma.offlineMessages.deleteMany({
      where: {
        username: username,
      },
    });

    WsResponse.success(ws, "Offline messages acknowledged.");
    console.log(`Offline messages acknowledged for user: ${username}`);
  } catch (error) {
    console.error("Error acknowledging offline messages:", error);
    WsResponse.error(ws, "Failed to acknowledge offline messages.");
  }
}

function disconnectHandler(ws: WebSocket): void {
  const username = chatConnectionManager.getUsername(ws);

  try {
    if (username) {
      chatConnectionManager.removeConnection(ws);
      WsResponse.info(ws, "You have been disconnected.");
      console.log(`User ${username} disconnected gracefully`);
    } else {
      console.log("Disconnect handler called for unknown user");
      WsResponse.info(ws, "You have been disconnected.");
    }
  } catch (error) {
    console.error("Error in disconnectHandler:", error);
  }
}
