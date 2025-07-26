import { WebSocket } from "ws";
import { getOneToOneChatHistory } from "../../cassandra/get_one_to_one_chat_history_by_chat_id";
import { insertOneToOneChat } from "../../cassandra/insert_one_to_one_chat";
import { mapUserToSocket } from "../../server/ws";
import { getPrismaClient } from "../../services/prisma";
import { WsResponse } from "../../utils/wsResponse";
import { WsValidation } from "../../utils/wsValidation";

export async function newOnetoOneChatHandler(
  ws: WebSocket,
  parsed: { type: string; from: string; to: string }
): Promise<void> {
  const { from: fromUsername, to: toUsername } = parsed;
  const prisma = getPrismaClient();
  if (!toUsername || !fromUsername) {
    WsResponse.error(ws, "Both 'from' and 'to' usernames are required.");
    return;
  }
  if (!WsValidation.validateSelfChat(ws, fromUsername, toUsername)) return;
  if (!(await WsValidation.validateUser(ws, toUsername))) return;
  if (!(await WsValidation.validateUser(ws, fromUsername))) return;
  const existingChat = await prisma.friendship.findFirst({
    where: {
      OR: [
        { user: fromUsername, friend: toUsername },
        { user: toUsername, friend: fromUsername },
      ],
    },
  });
  if (existingChat) {
    WsResponse.error(ws, `Chat with ${toUsername} already exists.`);
    return;
  }
  await Promise.all([
    prisma.friendship.create({
      data: {
        user: fromUsername,
        friend: toUsername,
      },
    }),
    prisma.friendship.create({
      data: {
        user: toUsername,
        friend: fromUsername,
      },
    }),
  ]);
  const recipientSocket = mapUserToSocket.get(toUsername);
  if (recipientSocket) {
    WsResponse.custom(recipientSocket, {
      type: "NEW_ONE_TO_ONE_CHAT_AP",
      from: fromUsername,
    });
    WsResponse.custom(ws, {
      type: "NEW_ONE_TO_ONE_CHAT_AP",
      to: toUsername,
      msg: `Chat request sent to ${toUsername}.`,
    });
  } else {
    WsResponse.info(ws, `User ${toUsername} is not online.`);
  }
}

export async function getOneToOneChatHistoryHandler(
  ws: WebSocket,
  parsed: { from: string; to: string; chatId: string }
): Promise<void> {
  const { from: fromUsername, to: toUsername, chatId } = parsed;
  const chatHistory = await getOneToOneChatHistory(chatId);
  WsResponse.custom(ws, {
    type: "ONE_TO_ONE_CHAT_HISTORY",
    messages: chatHistory,
  });
}

export async function oneToOneChatHandler(
  ws: WebSocket,
  parsed: { from: string; to: string; content: string; chatId: string }
): Promise<void> {
  const {
    from: fromUsername,
    to: toUsername,
    content: messageContent,
    chatId,
  } = parsed;
  await insertOneToOneChat(chatId, fromUsername, toUsername, messageContent);
  const recipientSocket = mapUserToSocket.get(toUsername);
  if (!recipientSocket) {
    WsResponse.info(ws, `User ${toUsername} is not online.`);
    return;
  }
  WsResponse.custom(ws, {
    type: "MESSAGE",
    from: fromUsername,
    content: messageContent,
    chatId: chatId,
  });
}
