import { WebSocket, WebSocketServer } from "ws";
import { getChatIdByUser } from "../cassandra/get_chat_id_by_user";
import { getOneToOneChatHistory } from "../cassandra/get_one_to_one_chat_history_by_chat_id";
import { insertOneToOneChat } from "../cassandra/insert_one_to_one_chat";
import { mockGroups, mockUsers } from "../mockData";
import { userExists } from "../prisma/userExists";
import { mapSocketToUser, mapUserToSocket } from "../server/ws";
import { getPrismaClient } from "../services/prisma";

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

  try {
    const chatIds = await getChatIdByUser(username);
    ws.send(
      JSON.stringify({
        type: "INIT_DATA",
        chatIds: chatIds,
        groups:
          mockUsers[username as keyof typeof mockUsers]?.groups.map((group) => {
            return {
              groupId: group,
              groupName:
                mockGroups[group as keyof typeof mockGroups]?.groupName ||
                "Unknown Group",
            };
          }) || [],
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

async function newOnetoOneChatHandler(
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

async function getOneToOneChatHistoryHandler(
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

function oneToOneChatHandler(
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

function createGroupChatHandler(
  ws: WebSocket,
  parsed: { type: string; groupName: string }
) {
  const groupName = parsed.groupName;
  const groupChatId = `group-${Date.now()}`;
  (mockGroups as any)[groupChatId] = {
    groupChatId,
    groupName,
    createdBy: mapSocketToUser.get(ws) || "unknown",
    members: [],
    messages: [],
  };

  ws.send(
    JSON.stringify({
      type: "GROUP_CHAT_CREATED",
      groupChatId,
    })
  );
}

function joinGroupChatHandler(
  ws: WebSocket,
  parsed: { type: string; groupId: string }
) {
  const groupId = parsed.groupId;
  if (groupId in mockGroups) {
    const username = mapSocketToUser.get(ws);
    if (username) {
      (mockGroups as any)[groupId].members.push(username);
      ws.send(
        JSON.stringify({
          type: "GROUP_CHAT_JOINED",
          groupId,
          groupName: (mockGroups as any)[groupId].groupName,
        })
      );
    } else {
      ws.send(
        JSON.stringify({
          type: "ERROR",
          msg: "You must be logged in to join a group chat.",
        })
      );
    }
  }
}

function getGroupChatHistoryHandler(
  ws: WebSocket,
  parsed: { type: string; groupId: string }
) {
  const groupId = parsed.groupId;
  if (groupId in mockGroups) {
    ws.send(
      JSON.stringify({
        type: "GROUP_CHAT_HISTORY",
        messages: (mockGroups as any)[groupId].messages,
      })
    );
  } else {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `Group chat with ID ${groupId} does not exist.`,
      })
    );
  }
}

function groupChatHandler(
  ws: WebSocket,
  parsed: { type: string; from: string; to: string; content: string }
) {
  const groupId = parsed.to;
  const fromUsername = parsed.from;
  const messageContent = parsed.content;

  if (groupId in mockGroups) {
    const groupChat = (mockGroups as any)[groupId];
    groupChat.messages.push({
      from: fromUsername,
      text: messageContent,
      timestamp: new Date().toISOString(),
    });

    groupChat.members.forEach((member: string) => {
      if (member === fromUsername) return;
      const memberSocket = mapUserToSocket.get(member);
      if (memberSocket) {
        memberSocket.send(
          JSON.stringify({
            type: "GROUP_CHAT",
            from: fromUsername,
            groupId,
            content: messageContent,
          })
        );
      }
    });
  }
}
