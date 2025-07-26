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
  if (!(await WsValidation.validateUser(ws, createdBy))) return;
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
  const { groupId, username } = parsed;
  if (!groupId || !username) {
    WsResponse.error(ws, "Group ID and username are required.");
    return;
  }
  if (!(await WsValidation.validateUser(ws, username))) return;
  if (!(await WsValidation.validateGroup(ws, groupId))) return;

  const prisma = getPrismaClient();
  const alreadyMember = await prisma.groupMembership.findFirst({
    where: {
      group: groupId,
      user: username,
    },
  });
  if (alreadyMember) {
    WsResponse.error(ws, `User ${username} is already a member of the group.`);
    return;
  }
  await prisma.groupMembership.create({
    data: {
      group: groupId,
      user: username,
    },
  });
  WsResponse.success(ws, `User ${username} has joined the group.`);

  // Refactor this later to use a more efficient way to notify all members
  // of the group about the new member.
  // For now, we will fetch the group and notify all members.
  // Ideally a queue or pub/sub system would be used.
  const groupChat = await prisma.group.findUnique({
    where: {
      groupId: groupId,
    },
    include: {
      members: true,
    },
  });
  groupChat?.members.forEach((member) => {
    const memberSocket = mapUserToSocket.get(member.user);
    if (memberSocket) {
      WsResponse.custom(memberSocket, {
        type: "GROUP_MEMBER_JOINED",
        groupId: groupId,
        username: username,
      });
    }
  });
}

export function getGroupChatHistoryHandler(
  ws: WebSocket,
  parsed: { type: string; groupId: string }
) {
  const { groupId } = parsed;
  if (groupId in mockGroups) {
    WsResponse.custom(ws, {
      type: "GROUP_CHAT_HISTORY",
      messages: (mockGroups as any)[groupId].messages,
    });
  } else {
    WsResponse.error(ws, `Group chat with ID ${groupId} does not exist.`);
  }
}

export async function groupChatHandler(
  ws: WebSocket,
  parsed: { type: string; from: string; to: string; content: string }
) {
  const { to: groupId, from: fromUsername, content: messageContent } = parsed;
  if (!groupId || !fromUsername || !messageContent) {
    WsResponse.error(ws, "Group ID, sender, and message content are required.");
    return;
  }
  if (!(await WsValidation.validateUser(ws, fromUsername))) return;
  if (!(await WsValidation.validateGroup(ws, groupId))) return;
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
        WsResponse.custom(memberSocket, {
          type: "GROUP_CHAT",
          from: fromUsername,
          groupId,
          content: messageContent,
        });
      }
    });
  }
}
