import { WebSocket } from "ws";
import { getOneToOneChatHistory } from "../../cassandra/get_one_to_one_chat_history_by_chat_id";
import { insertOneToOneChat } from "../../cassandra/insert_one_to_one_chat";
import { userExists } from "../../prisma/userExists";
import { mapUserToSocket } from "../../server/ws";
import { getPrismaClient } from "../../services/prisma";

export async function newOnetoOneChatHandler(
  ws: WebSocket,
  parsed: { type: string; from: string; to: string }
): Promise<void> {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  const prisma = getPrismaClient();
  if (!toUsername || !fromUsername) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: "Both 'from' and 'to' usernames are required.",
      })
    );
    return;
  }
  if (fromUsername === toUsername) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: "You cannot start a chat with yourself.",
      })
    );
    return;
  }
  if (!(await userExists(toUsername))) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `User ${toUsername} does not exist.`,
      })
    );
    return;
  }
  if (!(await userExists(fromUsername))) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `User ${fromUsername} does not exist.`,
      })
    );
    return;
  }
  const chat = await prisma.friendship.findFirst({
    where: {
      OR: [
        { user: fromUsername, friend: toUsername },
        { user: toUsername, friend: fromUsername },
      ],
    },
  });
  if (chat) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `Chat with ${toUsername} already exists.`,
      })
    );
    return;
  }
  await prisma.friendship.create({
    data: {
      user: fromUsername,
      friend: toUsername,
    },
  });
  await prisma.friendship.create({
    data: {
      user: toUsername,
      friend: fromUsername,
    },
  });
  if (mapUserToSocket.has(toUsername)) {
    const recipientSocket = mapUserToSocket.get(toUsername);
    if (recipientSocket) {
      recipientSocket.send(
        JSON.stringify({
          type: "NEW_ONE_TO_ONE_CHAT_AP",
          from: fromUsername,
        })
      );
      ws.send(
        JSON.stringify({
          type: "NEW_ONE_TO_ONE_CHAT_AP",
          to: toUsername,
          msg: `Chat request sent to ${toUsername}.`,
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

export async function getOneToOneChatHistoryHandler(
  ws: WebSocket,
  parsed: { from: string; to: string; chatId: string }
): Promise<void> {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  const chatId = parsed.chatId;
  const chatHistory = await getOneToOneChatHistory(chatId);
  ws.send(
    JSON.stringify({
      type: "ONE_TO_ONE_CHAT_HISTORY",
      messages: chatHistory,
    })
  );
}

export function oneToOneChatHandler(
  ws: WebSocket,
  parsed: { from: string; to: string; content: string; chatId: string }
): void {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  const messageContent = parsed.content;
  const chatId = parsed.chatId;
  const saveMessageToCassandra = insertOneToOneChat(
    chatId,
    fromUsername,
    toUsername,
    messageContent
  );
  if (mapUserToSocket.has(toUsername)) {
    const recipientSocket = mapUserToSocket.get(toUsername);
    if (recipientSocket) {
      recipientSocket.send(
        JSON.stringify({
          type: "MESSAGE",
          from: fromUsername,
          content: messageContent,
          chatId: chatId,
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
