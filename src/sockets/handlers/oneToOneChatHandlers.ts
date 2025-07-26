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

export async function newOnetoOneChatHandler(
  ws: WebSocket,
  parsed: NewOneToOneChatMessage
): Promise<void> {
  try {
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

      // Notification to recipient
      // This is not opimized. Use a pubsub or queue here
      try {
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
      } catch (notificationError) {
        console.error(
          "Error notifying recipient about new chat:",
          notificationError
        );
        
        WsResponse.custom(ws, {
          type: "NEW_ONE_TO_ONE_CHAT_AP",
          to: toUsername,
          msg: `Chat created with ${toUsername} but they may not have been notified.`,
        });
      }

      console.log(
        `New one-to-one chat created between ${fromUsername} and ${toUsername}`
      );
    } catch (dbError) {
      console.error("Database error in newOnetoOneChatHandler:", dbError);
      WsResponse.error(ws, "Failed to create chat. Please try again.");
    }
  } catch (error) {
    console.error("Error in newOnetoOneChatHandler:", error);
    WsResponse.error(ws, "Failed to process chat creation request.");
  }
}

export async function getOneToOneChatHistoryHandler(
  ws: WebSocket,
  parsed: GetOneToOneChatHistoryMessage
): Promise<void> {
  try {
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
    } catch (cassandraError) {
      console.error("Cassandra error retrieving chat history:", cassandraError);
      WsResponse.error(
        ws,
        "Failed to retrieve chat history. Please try again."
      );
    }
  } catch (error) {
    console.error("Error in getOneToOneChatHistoryHandler:", error);
    WsResponse.error(ws, "Failed to process chat history request.");
  }
}

export async function oneToOneChatHandler(
  ws: WebSocket,
  parsed: OneToOneChatMessage
): Promise<void> {
  try {
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
      await insertOneToOneChat(
        chatId,
        fromUsername,
        toUsername,
        messageContent
      );

      try {
        const recipientSocket = mapUserToSocket.get(toUsername);

        if (!recipientSocket) {
          WsResponse.info(
            ws,
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

        console.log(
          `Message sent from ${fromUsername} to ${toUsername} in chat ${chatId}`
        );
      } catch (deliveryError) {
        console.error("Error delivering message to recipient:", deliveryError);
        WsResponse.info(
          ws,
          "Message saved but failed to deliver to recipient."
        );
      }
    } catch (storageError) {
      console.error("Error storing message in Cassandra:", storageError);
      WsResponse.error(ws, "Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error("Error in oneToOneChatHandler:", error);
    WsResponse.error(ws, "Failed to process message.");
  }
}
