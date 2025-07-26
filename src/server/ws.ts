import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { verifyToken } from "../middlewares/auth";

export const mapUserToSocket = new Map<string, WebSocket>();
export const mapSocketToUser = new Map<WebSocket, string>();

interface AuthenticatedIncomingMessage extends IncomingMessage {
  username?: string;
}

interface AuthResult {
  success: boolean;
  username?: string;
  error?: string | null;
}

// Adapter function to use existing HTTP middleware for WebSocket authentication
function verifyWebSocketToken(req: IncomingMessage): AuthResult {
  try {
    let authResult: AuthResult = {
      success: false,
      username: undefined,
      error: null,
    };

    const mockRes = {
      status: (code: number) => ({
        json: (data: any) => {
          authResult = {
            success: false,
            error: data.error || "Authentication failed",
          };
        },
      }),
    };

    const mockNext = () => {
      authResult = { success: true, username: (req as any).username };
    };

    try {
      verifyToken(req as any, mockRes as any, mockNext);
      return authResult;
    } catch (tokenError) {
      console.error("Error in token verification:", tokenError);
      return { success: false, error: "Token verification failed" };
    }
  } catch (error) {
    console.error("Error in verifyWebSocketToken:", error);
    return { success: false, error: "Authentication error" };
  }
}

export function createWebSocketServer({
  port,
  handler,
}: {
  port: number;
  handler: (ws: WebSocket, req: WebSocketServer) => void;
}) {
  try {
    const wss = new WebSocketServer({
      port,
      verifyClient: (info: { origin: any; req: IncomingMessage }) => {
        try {
          console.log(
            `WebSocket connection attempt from ${
              info.origin || "unknown origin"
            }`
          );

          // Reuse existing JWT verification middleware
          const authResult = verifyWebSocketToken(info.req);

          if (!authResult.success) {
            console.error(
              `WebSocket JWT verification failed: ${authResult.error}`
            );
            return false;
          }

          if (!authResult.username) {
            console.error(
              "WebSocket JWT verification succeeded but no username found"
            );
            return false;
          }

          console.log(`JWT verified for user: ${authResult.username}`);
          (info.req as AuthenticatedIncomingMessage).username =
            authResult.username;

          return true;
        } catch (verifyError) {
          console.error("Error in WebSocket client verification:", verifyError);
          return false;
        }
      },
    });

    wss.on("connection", (ws: WebSocket, req: AuthenticatedIncomingMessage) => {
      try {
        const username = req.username;

        if (!username) {
          console.error(
            "WebSocket connection established but no username found"
          );
          ws.close(1008, "No username found");
          return;
        }

        console.log(`User ${username} connected via authenticated WebSocket`);

        // Clean up any existing connection for this user
        const existingSocket = mapUserToSocket.get(username);
        if (existingSocket && existingSocket !== ws) {
          try {
            existingSocket.close(1000, "New connection established");
          } catch (closeError) {
            console.error("Error closing existing WebSocket:", closeError);
          }
        }

        mapUserToSocket.set(username, ws);
        mapSocketToUser.set(ws, username);

        // Set up connection cleanup on close
        ws.on("close", () => {
          try {
            console.log(`User ${username} WebSocket connection closed`);
            mapUserToSocket.delete(username);
            mapSocketToUser.delete(ws);
          } catch (cleanupError) {
            console.error(
              "Error cleaning up WebSocket mappings:",
              cleanupError
            );
          }
        });

        ws.on("error", (error) => {
          console.error(`WebSocket error for user ${username}:`, error);
          try {
            mapUserToSocket.delete(username);
            mapSocketToUser.delete(ws);
          } catch (cleanupError) {
            console.error(
              "Error cleaning up WebSocket mappings on error:",
              cleanupError
            );
          }
        });

        try {
          handler(ws, wss);
        } catch (handlerError) {
          console.error("Error in WebSocket handler:", handlerError);
          ws.terminate();
        }
      } catch (connectionError) {
        console.error("Error handling WebSocket connection:", connectionError);
        ws.terminate();
      }
    });

    wss.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });

    console.log(`WebSocket server is running on ws://localhost:${port}`);
    return wss;
  } catch (error) {
    console.error("Error creating WebSocket server:", error);
    throw error;
  }
}
