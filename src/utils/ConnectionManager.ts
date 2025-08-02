import { WebSocket } from "ws";
export class ConnectionManager {
  private userToSocket = new Map<string, WebSocket>();
  private socketToUser = new Map<WebSocket, string>();

  setConnection(username: string, socket: WebSocket): void {
    // Clean up existing connection
    const existingSocket = this.userToSocket.get(username);
    if (existingSocket && existingSocket !== socket) {
      try {
        existingSocket.close(1000, "New connection established");
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
    return this.socketToUser.has(socket);
  }
}
