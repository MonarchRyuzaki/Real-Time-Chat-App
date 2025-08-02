import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { verifyToken } from "../middlewares/auth";
import { ConnectionManager } from "../utils/ConnectionManager";

interface AuthenticatedIncomingMessage extends IncomingMessage {
  username?: string;
}

interface AuthResult {
  success: boolean;
  username?: string;
  error?: string | null;
}

// Store server references for proper cleanup
const activeServers = new Set<WebSocketServer>();

// Adapter function to use existing HTTP middleware for WebSocket authentication
function verifyWebSocketToken(req: IncomingMessage): AuthResult {
  try {
    let authResult: AuthResult = {
      success: false,
      username: undefined,
      error: null,
    };

    // First, try to get token from Authorization header
    let token = req.headers["authorization"]?.replace("Bearer ", "");

    // If no token in headers, check query parameters
    if (!token && req.url) {
      try {
        // Extract query string from URL (req.url might be "/?authToken=xyz" or "/path?authToken=xyz")
        const queryString = req.url.includes("?") ? req.url.split("?")[1] : "";
        if (queryString) {
          const searchParams = new URLSearchParams(queryString);
          token = searchParams.get("authToken") || undefined;
        }
      } catch (urlError) {
        console.error("Error parsing URL query parameters:", urlError);
      }
    }

    // If still no token, return error
    if (!token) {
      return {
        success: false,
        error: "No token provided in headers or query params",
      };
    }

    // Create a modified request object with the token in headers for verifyToken middleware
    const modifiedReq = {
      ...req,
      headers: {
        ...req.headers,
        authorization: `Bearer ${token}`,
      },
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
      authResult = { success: true, username: (modifiedReq as any).username };
    };

    try {
      verifyToken(modifiedReq as any, mockRes as any, mockNext);
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
  connectionManager,
}: {
  port: number;
  handler: (ws: WebSocket, req: WebSocketServer) => void;
  connectionManager: ConnectionManager;
}): WebSocketServer {
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

    // Track active servers for cleanup
    activeServers.add(wss);

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

        // Use ConnectionManager
        connectionManager.setConnection(username, ws);

        // Set up connection cleanup on close
        ws.on("close", () => {
          try {
            console.log(`User ${username} WebSocket connection closed`);
            connectionManager.removeConnection(ws);
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
            connectionManager.removeConnection(ws);
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

    wss.on("close", () => {
      console.log(`WebSocket server on port ${port} closed`);
      activeServers.delete(wss);
    });

    console.log(`WebSocket server is running on ws://localhost:${port}`);
    return wss;
  } catch (error) {
    console.error("Error creating WebSocket server:", error);
    throw error;
  }
}

// Function to close all WebSocket servers
export function closeAllWebSocketServers(): Promise<void> {
  return new Promise((resolve) => {
    if (activeServers.size === 0) {
      resolve();
      return;
    }

    let closedCount = 0;
    const totalServers = activeServers.size;

    console.log(`Closing ${totalServers} WebSocket server(s)...`);

    activeServers.forEach((server) => {
      server.close(() => {
        closedCount++;
        if (closedCount === totalServers) {
          activeServers.clear();
          console.log("All WebSocket servers closed");
          resolve();
        }
      });
    });

    // Force resolve after timeout to prevent hanging
    setTimeout(() => {
      if (closedCount < totalServers) {
        console.warn(
          "Some WebSocket servers did not close gracefully, forcing shutdown"
        );
        activeServers.clear();
        resolve();
      }
    }, 5000);
  });
}
