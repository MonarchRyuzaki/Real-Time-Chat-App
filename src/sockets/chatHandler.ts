import { get } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { mockGroups, mockUsers } from "../mockData";
import { mapSocketToUser, mapUserToSocket } from "../server/ws";

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

function initChatHandler(ws: WebSocket): void {
  const username = mapSocketToUser.get(ws);
  ws.send(
    JSON.stringify({
      type: "INIT_DATA",
      friends: username
        ? mockUsers[username as keyof typeof mockUsers]?.friends || []
        : [],
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
}

function newOnetoOneChatHandler(
  ws: WebSocket,
  parsed: { type: string; from: string; to: string }
): void {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;

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

function getOneToOneChatHistoryHandler(
  ws: WebSocket,
  parsed: { from: string; to: string }
): void {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  ws.send(
    JSON.stringify({
      type: "ONE_TO_ONE_CHAT_HISTORY",
      messages:
        mockUsers[fromUsername as keyof typeof mockUsers]?.messages[
          toUsername as keyof (typeof mockUsers)[keyof typeof mockUsers]["messages"]
        ] || [],
    })
  );
}

function oneToOneChatHandler(
  ws: WebSocket,
  parsed: { from: string; to: string; content: string }
): void {
  const fromUsername = parsed.from;
  const toUsername = parsed.to;
  const messageContent = parsed.content;

  if (mapUserToSocket.has(toUsername)) {
    const recipientSocket = mapUserToSocket.get(toUsername);
    if (recipientSocket) {
      recipientSocket.send(
        JSON.stringify({
          type: "MESSAGE",
          from: fromUsername,
          content: messageContent,
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
