import { WebSocket } from "ws";
import { groupExists } from "../prisma/groupExists";
import { userExists } from "../prisma/userExists";
import { WsResponse } from "./wsResponse";

export const WsValidation = {
  async validateUser(ws: WebSocket, username: string): Promise<boolean> {
    if (!username) {
      WsResponse.error(ws, "Username is required.");
      return false;
    }

    if (!(await userExists(username))) {
      WsResponse.error(ws, `User ${username} does not exist.`);
      return false;
    }

    return true;
  },

  async validateGroup(ws: WebSocket, groupId: string): Promise<boolean> {
    if (!groupId) {
      WsResponse.error(ws, "Group ID is required.");
      return false;
    }

    const group = await groupExists(groupId);
    if (!group) {
      WsResponse.error(ws, `Group chat with ID ${groupId} does not exist.`);
      return false;
    }

    return true;
  },

  validateSelfChat(ws: WebSocket, from: string, to: string): boolean {
    if (from === to) {
      WsResponse.error(ws, "You cannot start a chat with yourself.");
      return false;
    }
    return true;
  },
};
