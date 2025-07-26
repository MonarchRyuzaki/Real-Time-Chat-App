import { WebSocket } from "ws";
import { groupExists } from "../prisma/groupExists";
import { userExists } from "../prisma/userExists";
import { WsResponse } from "./wsResponse";

export const WsValidation = {
  async validateUser(ws: WebSocket, username: string): Promise<boolean> {
    try {
      if (!username) {
        WsResponse.error(ws, "Username is required.");
        return false;
      }

      try {
        const exists = await userExists(username);
        if (!exists) {
          WsResponse.error(ws, `User ${username} does not exist.`);
          return false;
        }
        return true;
      } catch (dbError) {
        console.error("Database error validating user:", username, dbError);
        WsResponse.error(ws, "Failed to validate user. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error in validateUser:", error);
      WsResponse.error(ws, "User validation failed.");
      return false;
    }
  },

  async validateGroup(ws: WebSocket, groupId: string): Promise<boolean> {
    try {
      if (!groupId) {
        WsResponse.error(ws, "Group ID is required.");
        return false;
      }

      try {
        const group = await groupExists(groupId);
        if (!group) {
          WsResponse.error(ws, `Group chat with ID ${groupId} does not exist.`);
          return false;
        }
        return true;
      } catch (dbError) {
        console.error("Database error validating group:", groupId, dbError);
        WsResponse.error(ws, "Failed to validate group. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error in validateGroup:", error);
      WsResponse.error(ws, "Group validation failed.");
      return false;
    }
  },

  validateSelfChat(ws: WebSocket, from: string, to: string): boolean {
    try {
      if (from === to) {
        WsResponse.error(ws, "You cannot start a chat with yourself.");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error in validateSelfChat:", error);
      WsResponse.error(ws, "Chat validation failed.");
      return false;
    }
  },
};
