import { WebSocket, WebSocketServer } from "ws";
import { getOneToOneChatHistory } from "../cassandra/get_one_to_one_chat_history_by_chat_id";
import { insertOneToOneChat } from "../cassandra/insert_one_to_one_chat";
import { mockGroups, mockUsers } from "../mockData";
import { groupExists } from "../prisma/groupExists";
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

async function createGroupChatHandler(
  ws: WebSocket,
  parsed: { type: string; groupName: string; by: string }
) {
  const groupName = parsed.groupName;
  const createdBy = parsed.by;
  const groupChatId = `group-${Date.now()}`;
  if (!groupName || !createdBy) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: "Group name and creator are required.",
      })
    );
    return;
  }
  if (!(await userExists(createdBy))) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `User ${createdBy} does not exist.`,
      })
    );
    return;
  }
  await getPrismaClient().group.create({
    data: {
      groupId: groupChatId,
      groupName: groupName,
      createdBy: createdBy,
    },
  });

  ws.send(
    JSON.stringify({
      type: "GROUP_CHAT_CREATED",
      groupChatId,
    })
  );
}
// group-1753413848303
async function joinGroupChatHandler(
  ws: WebSocket,
  parsed: { type: string; groupId: string; username: string }
) {
  const groupId = parsed.groupId;
  const username = parsed.username;
  if (!groupId || !username) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: "Group ID and username are required.",
      })
    );
    return;
  }
  if (!(await userExists(username))) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `User ${username} does not exist.`,
      })
    );
    return;
  }
  const group = await groupExists(groupId);
  if (!group) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `Group chat with ID ${groupId} does not exist.`,
      })
    );
    return;
  }
  const prisma = getPrismaClient();
  const alreadyMember = await prisma.groupMembership.findFirst({
    where: {
      group: groupId,
      user: username,
    },
  });
  if (alreadyMember) {
    ws.send(
      JSON.stringify({
        type: "ERROR",
        msg: `User ${username} is already a member of the group.`,
      })
    );
    return;
  }
  await prisma.groupMembership.create({
    data: {
      group: groupId,
      user: username,
    },
  });
  ws.send(
    JSON.stringify({
      type: "SUCCESS",
      msg: `User ${username} has joined the group.`,
    })
  );
  const groupChat = await prisma.group.findUnique({
    where: {
      groupId: groupId,
    },
    include: {
      members: true,
    },
  });
  if (groupChat) {
    groupChat.members.forEach((member) => {
      const memberSocket = mapUserToSocket.get(member.user);
      if (memberSocket) {
        memberSocket.send(
          JSON.stringify({
            type: "GROUP_MEMBER_JOINED",
            groupId: groupId,
            username: username,
          })
        );
      }
    });
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
