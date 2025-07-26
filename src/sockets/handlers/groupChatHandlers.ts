import { WebSocket } from "ws";
import { mockGroups } from "../../mockData";
import { groupExists } from "../../prisma/groupExists";
import { userExists } from "../../prisma/userExists";
import { mapUserToSocket } from "../../server/ws";
import { getPrismaClient } from "../../services/prisma";
import { WsResponse } from "../../utils/wsResponse";
import { WsValidation } from "../../utils/wsValidation";

export async function createGroupChatHandler(
  ws: WebSocket,
  parsed: { type: string; groupName: string; by: string }
) {
  const { groupName, by: createdBy } = parsed;
  if (!groupName || !createdBy) {
    WsResponse.error(ws, "Group name and creator are required.");
    return;
  }
  if (!(await WsValidation.validateUser(ws, createdBy))) {
    WsResponse.error(ws, `User ${createdBy} does not exist.`);
    return;
  }
  const groupChatId = `group-${Date.now()}`;
  const prisma = getPrismaClient();
  await prisma.group.create({
    data: {
      groupId: groupChatId,
      groupName: groupName,
      createdBy: createdBy,
    },
  });

  WsResponse.custom(ws, {
    type: "GROUP_CHAT_CREATED",
    groupId: groupChatId,
  });
}
// group-1753413848303
export async function joinGroupChatHandler(
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

export function getGroupChatHistoryHandler(
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

export function groupChatHandler(
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
