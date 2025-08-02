import { WebSocket } from "ws";

export class ConnectionManager {
  private userToSocket = new Map<string, WebSocket>();
  private socketToUser = new Map<WebSocket, string>();

  setConnection(username: string, socket: WebSocket): void {
    // Clean up existing connection
    const existingSocket = this.userToSocket.get(username);
    if (existingSocket && existingSocket !== socket) {
      try {
        this.cleanupSocket(existingSocket);
      } catch (closeError) {
        console.error("Error closing existing WebSocket:", closeError);
      }
    }

    this.userToSocket.set(username, socket);
    this.socketToUser.set(socket, username);
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
      // Remove all event listeners to prevent memory leaks
      socket.removeAllListeners();

      // Only terminate if the socket is still open or connecting
      if (socket.readyState === WebSocket.OPEN) {
        socket.close(1000, "Connection cleanup");
      } else if (socket.readyState === WebSocket.CONNECTING) {
        socket.terminate();
      }
      // If already closing or closed, no action needed
    } catch (error) {
      console.error("Error during socket cleanup:", error);
      // Force terminate as last resort
      try {
        socket.terminate();
      } catch (terminateError) {
        console.error("Error force terminating socket:", terminateError);
      }
    }
  }

  getSocket(username: string): WebSocket | undefined {
    return this.userToSocket.get(username);
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

  // Method to cleanup all connections (useful for server shutdown)
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
