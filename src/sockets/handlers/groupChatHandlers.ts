import { WebSocket } from "ws";
import { mockGroups } from "../../mockData";
import { mapUserToSocket } from "../../server/ws";
import { getPrismaClient } from "../../services/prisma";
import {
  CreateGroupChatMessage,
  GetGroupChatHistoryMessage,
  GroupChatMessage,
  JoinGroupChatMessage,
} from "../../types/messageTypes";
import { WsResponse } from "../../utils/wsResponse";
import { WsValidation } from "../../utils/wsValidation";

export async function createGroupChatHandler(
  ws: WebSocket,
  parsed: CreateGroupChatMessage
): Promise<void> {
  try {
    const { groupName, by: createdBy } = parsed;
    if (!groupName || !createdBy) {
      WsResponse.error(ws, "Group name and creator are required.");
      return;
    }

    if (!(await WsValidation.validateUser(ws, createdBy))) return;

    const groupChatId = `group-${Date.now()}`;

    try {
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

      console.log(`Group chat created: ${groupChatId} by ${createdBy}`);
    } catch (dbError) {
      console.error("Database error creating group chat:", dbError);
      WsResponse.error(ws, "Failed to create group chat. Please try again.");
    }
  } catch (error) {
    console.error("Error in createGroupChatHandler:", error);
    WsResponse.error(ws, "Failed to process group creation request.");
  }
}

export async function joinGroupChatHandler(
  ws: WebSocket,
  parsed: JoinGroupChatMessage
): Promise<void> {
  try {
    const { groupId, username } = parsed;
    if (!groupId || !username) {
      WsResponse.error(ws, "Group ID and username are required.");
      return;
    }

    if (!(await WsValidation.validateUser(ws, username))) return;
    if (!(await WsValidation.validateGroup(ws, groupId))) return;

    try {
      const prisma = getPrismaClient();

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

      try {
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
            try {
              const memberSocket = mapUserToSocket.get(member.user);
              if (memberSocket && memberSocket !== ws) {
                WsResponse.custom(memberSocket, {
                  type: "GROUP_MEMBER_JOINED",
                  groupId: groupId,
                  username: username,
                });
              }
            } catch (socketError) {
              console.error(
                `Error notifying member ${member.user} about new group member:`,
                socketError
              );
            }
          });
        }
      } catch (notificationError) {
        console.error(
          "Error notifying group members about new member:",
          notificationError
        );
      }

      console.log(`User ${username} joined group ${groupId}`);
    } catch (dbError) {
      console.error("Database error in joinGroupChatHandler:", dbError);
      WsResponse.error(ws, "Failed to join group. Please try again.");
    }
  } catch (error) {
    console.error("Error in joinGroupChatHandler:", error);
    WsResponse.error(ws, "Failed to process group join request.");
  }
}

export function getGroupChatHistoryHandler(
  ws: WebSocket,
  parsed: GetGroupChatHistoryMessage
): void {
  try {
    const { groupId } = parsed;
    if (!groupId) {
      WsResponse.error(ws, "Group ID is required.");
      return;
    }

    try {
      if (groupId in mockGroups) {
        const groupData = (mockGroups as any)[groupId];
        WsResponse.custom(ws, {
          type: "GROUP_CHAT_HISTORY",
          messages: groupData.messages || [],
        });
      } else {
        WsResponse.error(ws, `Group chat with ID ${groupId} does not exist.`);
      }
    } catch (mockDataError) {
      console.error("Error accessing mock group data:", mockDataError);
      WsResponse.error(ws, "Failed to retrieve group chat history.");
    }
  } catch (error) {
    console.error("Error in getGroupChatHistoryHandler:", error);
    WsResponse.error(ws, "Failed to process group history request.");
  }
}

export async function groupChatHandler(
  ws: WebSocket,
  parsed: GroupChatMessage
): Promise<void> {
  try {
    const { to: groupId, from: fromUsername, content: messageContent } = parsed;
    if (!groupId || !fromUsername || !messageContent) {
      WsResponse.error(
        ws,
        "Group ID, sender, and message content are required."
      );
      return;
    }

    if (!(await WsValidation.validateUser(ws, fromUsername))) return;
    if (!(await WsValidation.validateGroup(ws, groupId))) return;

    try {
      if (groupId in mockGroups) {
        const groupChat = (mockGroups as any)[groupId];

        const newMessage = {
          from: fromUsername,
          text: messageContent,
          timestamp: new Date().toISOString(),
        };

        if (!groupChat.messages) {
          groupChat.messages = [];
        }
        groupChat.messages.push(newMessage);

        try {
          if (groupChat.members && Array.isArray(groupChat.members)) {
            groupChat.members.forEach((member: string) => {
              if (member === fromUsername) return; 

              try {
                const memberSocket = mapUserToSocket.get(member);
                if (memberSocket) {
                  WsResponse.custom(memberSocket, {
                    type: "GROUP_CHAT",
                    from: fromUsername,
                    groupId,
                    content: messageContent,
                  });
                }
              } catch (socketError) {
                console.error(
                  `Error sending message to group member ${member}:`,
                  socketError
                );
              }
            });
          }

          console.log(
            `Group message sent by ${fromUsername} to group ${groupId}`
          );
        } catch (broadcastError) {
          console.error("Error broadcasting group message:", broadcastError);
          WsResponse.error(
            ws,
            "Message sent but failed to notify all group members."
          );
        }
      } else {
        WsResponse.error(ws, `Group chat with ID ${groupId} does not exist.`);
      }
    } catch (mockDataError) {
      console.error("Error accessing/updating mock group data:", mockDataError);
      WsResponse.error(ws, "Failed to send group message.");
    }
  } catch (error) {
    console.error("Error in groupChatHandler:", error);
    WsResponse.error(ws, "Failed to process group message.");
  }
}
