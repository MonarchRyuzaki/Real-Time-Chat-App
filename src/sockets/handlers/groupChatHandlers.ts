import { WebSocket } from "ws";
import { getGroupChatMessage } from "../../cassandra/get_group_chat_message";
import { insertGroupChatMessage } from "../../cassandra/insert_group_chat_message";
import { chatConnectionManager } from "../../services/connectionService";
import { prisma } from "../../services/prisma";
import {
  CreateGroupChatMessage,
  GetGroupChatHistoryMessage,
  GroupChatMessage,
  JoinGroupChatMessage,
} from "../../types/messageTypes";
import { snowflakeIdGenerator } from "../../utils/snowflake";
import { WsResponse } from "../../utils/wsResponse";
import { WsValidation } from "../../utils/wsValidation";

export async function createGroupChatHandler(
  ws: WebSocket,
  parsed: CreateGroupChatMessage
): Promise<void> {
  const { groupName, by: createdBy } = parsed;

  if (!groupName || !createdBy) {
    WsResponse.error(ws, "Group name and creator are required.");
    return;
  }

  if (!(await WsValidation.validateUser(ws, createdBy))) return;

  const groupChatId = snowflakeIdGenerator();

  try {
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

    console.log(`Group chat created: ${groupChatId} by ${createdBy}`);
  } catch (error) {
    console.error("Error creating group chat:", error);
    WsResponse.error(ws, "Failed to create group chat. Please try again.");
  }
}

export async function joinGroupChatHandler(
  ws: WebSocket,
  parsed: JoinGroupChatMessage
): Promise<void> {
  const { groupId, username } = parsed;

  if (!groupId || !username) {
    WsResponse.error(ws, "Group ID and username are required.");
    return;
  }

  if (!(await WsValidation.validateUser(ws, username))) return;
  if (!(await WsValidation.validateGroup(ws, groupId))) return;

  try {
    const alreadyMember = await prisma.groupMembership.findFirst({
      where: {
        group: groupId,
        user: username,
      },
    });

    if (alreadyMember) {
      WsResponse.error(
        ws,
        `User ${username} is already a member of the group.`
      );
      return;
    }

    await prisma.groupMembership.create({
      data: {
        group: groupId,
        user: username,
      },
    });

    WsResponse.success(ws, `User ${username} has joined the group.`);

    await notifyGroupMembers(groupId, username, ws);

    console.log(`User ${username} joined group ${groupId}`);
  } catch (error) {
    console.error("Error in joinGroupChatHandler:", error);
    WsResponse.error(ws, "Failed to join group. Please try again.");
  }
}

async function notifyGroupMembers(
  groupId: string,
  newMember: string,
  excludeSocket: WebSocket
): Promise<void> {
  try {
    const groupChat = await prisma.group.findUnique({
      where: { groupId },
      include: { members: true },
    });

    if (!groupChat) return;

    groupChat.members.forEach((member: any) => {
      const memberSocket = chatConnectionManager.getSocket(member.user);
      if (memberSocket && memberSocket !== excludeSocket) {
        WsResponse.custom(memberSocket, {
          type: "GROUP_MEMBER_JOINED",
          groupId: groupId,
          username: newMember,
        });
      }
    });
  } catch (error) {
    console.error("Error notifying group members:", error);
  }
}

export async function getGroupChatHistoryHandler(
  ws: WebSocket,
  parsed: GetGroupChatHistoryMessage
): Promise<void> {
  const { groupId } = parsed;

  if (!(await WsValidation.validateGroup(ws, groupId))) return;

  try {
    const groupMessages = await getGroupChatMessage(groupId);
    WsResponse.custom(ws, {
      type: "GROUP_CHAT_HISTORY",
      messages: groupMessages || [],
    });
  } catch (error) {
    console.error("Error retrieving group history:", error);
    WsResponse.error(ws, "Failed to retrieve group chat history.");
  }
}

export async function groupChatHandler(
  ws: WebSocket,
  parsed: GroupChatMessage
): Promise<void> {
  const { to: groupId, from: fromUsername, content: messageContent } = parsed;

  if (!groupId || !fromUsername || !messageContent) {
    WsResponse.error(ws, "Group ID, sender, and message content are required.");
    return;
  }

  if (!(await WsValidation.validateUser(ws, fromUsername))) return;
  if (!(await WsValidation.validateGroup(ws, groupId))) return;

  try {
    const groupChat = await prisma.group.findUnique({
      where: { groupId },
      include: { members: true },
    });

    const messageId = snowflakeIdGenerator();
    await Promise.all([
      insertGroupChatMessage(groupId, fromUsername, messageContent, messageId),
      broadcastGroupMessage(
        groupChat,
        fromUsername,
        groupId,
        messageId,
        messageContent
      ),
    ]);

    console.log(`Group message sent by ${fromUsername} to group ${groupId}`);
  } catch (error) {
    console.error("Error in groupChatHandler:", error);
  }
}

async function broadcastGroupMessage(
  groupChat: any,
  fromUsername: string,
  groupId: string,
  messageId: string,
  messageContent: string
): Promise<void> {
  if (!groupChat || !groupChat.members || !Array.isArray(groupChat.members)) {
    return;
  }

  const offlineUsersData = [];
  for (const memeber of groupChat.members) {
    const memberUsername = memeber.user;
    if (memberUsername === fromUsername) continue;

    const memberSocket = chatConnectionManager.getSocket(memberUsername);
    if (!memberSocket) {
      offlineUsersData.push({
        username: memberUsername,
        messageId,
        partitionKey: groupId,
        messageType: "GROUP" as any,
      });
    } else {
      try {
        WsResponse.custom(memberSocket, {
          type: "GROUP_CHAT",
          from: fromUsername,
          groupId,
          content: messageContent,
        });
      } catch (error) {
        console.error(
          `Error sending message to group member ${memberUsername}:`,
          error
        );
      }
    }
  }

  if (offlineUsersData.length > 0) {
    try {
      await prisma.offlineMessages.createMany({
        data: offlineUsersData,
        skipDuplicates: true,
      });
      console.log("Offline messages saved for group members.");
    } catch (error) {
      console.error("Error saving offline messages:", error);
    }
  }
}
