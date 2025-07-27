import { WebSocket } from "ws";
import { getOneToOneChatHistory } from "../../cassandra/get_one_to_one_chat_history_by_chat_id";
import { insertOneToOneChat } from "../../cassandra/insert_one_to_one_chat";
import { mapUserToSocket } from "../../server/ws";
import { getPrismaClient } from "../../services/prisma";
import {
  GetOneToOneChatHistoryMessage,
  NewOneToOneChatMessage,
  OneToOneChatMessage,
} from "../../types/messageTypes";
import { WsResponse } from "../../utils/wsResponse";
import { WsValidation } from "../../utils/wsValidation";
import { generateChatId } from "../../utils/chatId";

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

    // Notify both users about the new chat
    await notifyNewChatCreated(fromUsername, toUsername, ws);

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
  senderSocket: WebSocket
): Promise<void> {
  try {
    const recipientSocket = mapUserToSocket.get(toUsername);
    const chatId = generateChatId(fromUsername, toUsername);
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
    // Store message in Cassandra
    await insertOneToOneChat(chatId, fromUsername, toUsername, messageContent);

    // Deliver message to recipient if online
    await deliverMessage(fromUsername, toUsername, messageContent, chatId, ws);

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
  senderSocket: WebSocket
): Promise<void> {
  try {
    const recipientSocket = mapUserToSocket.get(toUsername);

    if (!recipientSocket) {
      WsResponse.info(
        senderSocket,
        `User ${toUsername} is not online. Message stored for later delivery.`
      );
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
