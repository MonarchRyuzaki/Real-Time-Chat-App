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
  let authResult: AuthResult = {
    success: false,
    username: undefined,
    error: null,
  };

  const mockRes = {
    status: (code: number) => ({
      json: (data: any) => {
        authResult = { success: false, error: data.error || null };
      },
    }),
  };

  const mockNext = () => {
    authResult = { success: true, username: (req as any).username };
  };
  verifyToken(req as any, mockRes as any, mockNext);
  return authResult;
}

export function createWebSocketServer({
  port,
  handler,
}: {
  port: number;
  handler: (ws: WebSocket, req: WebSocketServer) => void;
}) {
  const wss = new WebSocketServer({
    port,
    verifyClient: (info: { origin: any; req: IncomingMessage; }) => {
      console.log(`WebSocket connection attempt from ${info.origin}`);

      // Reuse existing JWT verification middleware
      const authResult = verifyWebSocketToken(info.req);

      if (!authResult.success) {
        console.error(`WebSocket JWT verification failed: ${authResult.error}`);
        return false;
      }

      console.log(`JWT verified for user: ${authResult.username}`);

      (info.req as AuthenticatedIncomingMessage).username = authResult.username;

      return true;
    },
  });

  wss.on("connection", (ws: WebSocket, req: AuthenticatedIncomingMessage) => {
    const username = req.username!; 

    console.log(`User ${username} connected via authenticated WebSocket`);
    mapUserToSocket.set(username, ws);
    mapSocketToUser.set(ws, username);

    try {
      handler(ws, wss);
    } catch (e) {
      console.error("Error in WebSocket handler:", e);
      ws.terminate();
    }
  });
  console.log(`WebSocket server is running on ws://localhost:${port}`);
  return wss;
}
