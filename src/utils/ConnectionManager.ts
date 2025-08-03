import { WebSocket } from "ws";

export class ConnectionManager {
  private userToSocket = new Map<string, WebSocket>();
  private socketToUser = new Map<WebSocket, string>();

  setConnection(username: string, socket: WebSocket): void {
    const existingSocket = this.userToSocket.get(username);
    if (existingSocket && existingSocket !== socket) {
      try {
        this.cleanupSocket(existingSocket);
      } catch (closeError) {
        console.error("Error closing existing WebSocket:", closeError);
      }
    }

    // Only set the connection if the socket is still open
    if (socket.readyState === WebSocket.OPEN) {
      this.userToSocket.set(username, socket);
      this.socketToUser.set(socket, username);
    } else {
      console.warn(
        `Attempted to set connection for ${username} but WebSocket is not open (state: ${socket.readyState})`
      );
    }
  }

  removeConnection(socket: WebSocket): void {
    const username = this.socketToUser.get(socket);
    if (username) {
      this.userToSocket.delete(username);
      this.socketToUser.delete(socket);
    }

    this.cleanupSocket(socket);
    console.log(`Connection for ${username || "unknown user"} removed`);
  }

  private cleanupSocket(socket: WebSocket): void {
    try {
      socket.removeAllListeners();

      socket.terminate();
    } catch (error) {
      console.error("Error during socket cleanup:", error);
    }
  }

  // Enhanced getSocket method that checks connection state
  getSocket(username: string): WebSocket | undefined {
    const socket = this.userToSocket.get(username);
    if (socket && socket.readyState === WebSocket.OPEN) {
      return socket;
    } else if (socket) {
      // Clean up stale connection
      console.warn(
        `Removing stale connection for user ${username} (state: ${socket.readyState})`
      );
      this.removeConnection(socket);
    }
    return undefined;
  }

  getUsername(socket: WebSocket): string | undefined {
    return this.socketToUser.get(socket);
  }

  getAllConnections(): Map<string, WebSocket> {
    return new Map(this.userToSocket);
  }

  getConnectionCount(): number {
    return this.userToSocket.size;
  }

  hasUser(username: string): boolean {
    return this.userToSocket.has(username);
  }

  isSocketConnected(socket: WebSocket): boolean {
    return (
      this.socketToUser.has(socket) && socket.readyState === WebSocket.OPEN
    );
  }

  closeAllConnections(): void {
    console.log(`Closing ${this.userToSocket.size} active connections...`);

    for (const [username, socket] of this.userToSocket.entries()) {
      try {
        this.cleanupSocket(socket);
        console.log(`Closed connection for user: ${username}`);
      } catch (error) {
        console.error(`Error closing connection for user ${username}:`, error);
      }
    }

    this.userToSocket.clear();
    this.socketToUser.clear();
  }
}
