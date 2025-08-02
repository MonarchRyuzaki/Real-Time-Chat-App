import { WebSocket } from "ws";
import { getOneToOneChatHistory } from "../../cassandra/get_one_to_one_chat_history_by_chat_id";
import { insertOneToOneChat } from "../../cassandra/insert_one_to_one_chat";
import { chatConnectionManager } from "../../services/connectionService";
import { getPrismaClient } from "../../services/prisma";
import { getClient } from "../../services/redis";
import {
  GetOneToOneChatHistoryMessage,
  NewOneToOneChatMessage,
  OneToOneChatMessage,
} from "../../types/messageTypes";
import { generateChatId } from "../../utils/chatId";
import { snowflakeIdGenerator } from "../../utils/snowflake";
import { WsResponse } from "../../utils/wsResponse";
import { WsValidation } from "../../utils/wsValidation";

export async function newOnetoOneChatHandler(
  ws: WebSocket,
  parsed: NewOneToOneChatMessage
): Promise<void> {
  const { from: fromUsername, to: toUsername } = parsed;

  if (!toUsername || !fromUsername) {
    WsResponse.error(ws, "Both 'from' and 'to' usernames are required.");
    return;
  }

  if (!WsValidation.validateSelfChat(ws, fromUsername, toUsername)) return;
  if (!(await WsValidation.validateUser(ws, toUsername))) return;
  if (!(await WsValidation.validateUser(ws, fromUsername))) return;

  try {
    const prisma = getPrismaClient();
    const existingChatId = generateChatId(fromUsername, toUsername);

    const existingChat = await prisma.friendship.findFirst({
      where: {
        chatId: existingChatId,
      },
    });

    if (existingChat) {
      WsResponse.error(ws, `Chat with ${toUsername} already exists.`);
      return;
    }

    await prisma.friendship.create({
      data: {
        chatId: existingChatId,
        user1: existingChatId.split("-")[0],
        user2: existingChatId.split("-")[1],
      },
    });

    await notifyNewChatCreated(fromUsername, toUsername, existingChatId, ws);

    console.log(
      `New one-to-one chat created between ${fromUsername} and ${toUsername}`
    );
  } catch (error) {
    console.error("Error in newOnetoOneChatHandler:", error);
    WsResponse.error(ws, "Failed to create chat. Please try again.");
  }
}

async function notifyNewChatCreated(
  fromUsername: string,
  toUsername: string,
  chatId: string,
  senderSocket: WebSocket
): Promise<void> {
  try {
    const recipientSocket = chatConnectionManager.getSocket(toUsername);
    if (recipientSocket) {
      WsResponse.custom(recipientSocket, {
        type: "NEW_ONE_TO_ONE_CHAT_AP",
        from: fromUsername,
        msg: `First message from ${fromUsername}.`,
        chatId: chatId,
      });

      WsResponse.custom(senderSocket, {
        type: "NEW_ONE_TO_ONE_CHAT_AP",
        to: toUsername,
        msg: `Chat request sent to ${toUsername}.`,
        chatId: chatId,
      });
    } else {
      WsResponse.info(senderSocket, `User ${toUsername} is not online.`);
    }
  } catch (error) {
    console.error("Error notifying about new chat:", error);
    WsResponse.custom(senderSocket, {
      type: "NEW_ONE_TO_ONE_CHAT_AP",
      to: toUsername,
      msg: `Chat created with ${toUsername} but they may not have been notified.`,
    });
  }
}

export async function getOneToOneChatHistoryHandler(
  ws: WebSocket,
  parsed: GetOneToOneChatHistoryMessage
): Promise<void> {
  const { from: fromUsername, to: toUsername, chatId } = parsed;
  const redis = await getClient();
  if (!redis) {
    WsResponse.error(ws, "Redis client is not available.");
    return;
  }

  if (!(await WsValidation.validateUser(ws, fromUsername))) return;
  if (!(await WsValidation.validateUser(ws, toUsername))) return;

  if (!WsValidation.validateSelfChat(ws, fromUsername, toUsername)) return;

  const isOnline = await redis.exists(`online_users:${toUsername}`);
  const lastSeenTime = await redis.get(`last_seen:${toUsername}`);

  if (!fromUsername || !toUsername || !chatId) {
    WsResponse.error(
      ws,
      "From username, to username, and chat ID are required."
    );
    return;
  }

  try {
    const chatHistory = await getOneToOneChatHistory(chatId);

    WsResponse.custom(ws, {
      type: "ONE_TO_ONE_CHAT_HISTORY",
      messages: chatHistory || [],
      isOnline: isOnline === 1,
      lastSeenTime: lastSeenTime,
    });

    console.log(`Chat history retrieved for ${chatId} by ${fromUsername}`);
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    WsResponse.error(ws, "Failed to retrieve chat history. Please try again.");
  }
}

export async function oneToOneChatHandler(
  ws: WebSocket,
  parsed: OneToOneChatMessage
): Promise<void> {
  const {
    from: fromUsername,
    to: toUsername,
    content: messageContent,
    chatId,
  } = parsed;

  if (!fromUsername || !toUsername || !messageContent || !chatId) {
    WsResponse.error(
      ws,
      "From username, to username, message content, and chat ID are required."
    );
    return;
  }

  try {
    const messageId = snowflakeIdGenerator();
    await Promise.all([
      insertOneToOneChat(
        chatId,
        fromUsername,
        toUsername,
        messageContent,
        messageId
      ),

      deliverMessage(
        fromUsername,
        toUsername,
        messageContent,
        chatId,
        messageId,
        ws
      ),
    ]);

    console.log(
      `Message sent from ${fromUsername} to ${toUsername} in chat ${chatId}`
    );
  } catch (error) {
    console.error("Error in oneToOneChatHandler:", error);
    WsResponse.error(ws, "Failed to send message. Please try again.");
  }
}

async function deliverMessage(
  fromUsername: string,
  toUsername: string,
  messageContent: string,
  chatId: string,
  messageId: string,
  senderSocket: WebSocket
): Promise<void> {
  try {
    const recipientSocket = chatConnectionManager.getSocket(toUsername);

    if (!recipientSocket) {
      const prisma = getPrismaClient();
      await prisma.offlineMessages.create({
        data: {
          username: toUsername,
          messageId: messageId,
          partitionKey: chatId,
          messageType: "ONE_TO_ONE",
        },
      });
      return;
    }

    WsResponse.custom(recipientSocket, {
      type: "MESSAGE",
      from: fromUsername,
      content: messageContent,
      chatId: chatId,
    });
  } catch (error) {
    console.error("Error delivering message to recipient:", error);
    WsResponse.info(
      senderSocket,
      "Message saved but failed to deliver to recipient."
    );
  }
}
