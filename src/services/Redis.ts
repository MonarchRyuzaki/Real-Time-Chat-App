import { createClient, RedisClientType } from "redis";
import { logger } from "../utils/logger";

export class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;
  private isConnected: boolean = false;

  private constructor() {
    this.client = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    this.setupEventListeners();
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  private setupEventListeners(): void {
    this.client.on("error", (err) => {
      logger.error("Redis Client Error:", err);
      this.isConnected = false;
    });

    this.client.on("connect", () => {
      logger.info("Redis client connected");
      this.isConnected = true;
    });

    this.client.on("disconnect", () => {
      logger.warn("Redis client disconnected");
      this.isConnected = false;
    });

    this.client.on("reconnecting", () => {
      logger.info("Redis client reconnecting...");
    });
  }

  public async connect(): Promise<void> {
    try {
      if (!this.isConnected) {
        await this.client.connect();
        logger.info("Redis connection established");
      }
    } catch (error) {
      logger.error("Failed to connect to Redis:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.isConnected) {
        await this.client.disconnect();
        logger.info("Redis connection closed");
      }
    } catch (error) {
      logger.error("Error disconnecting from Redis:", error);
      throw error;
    }
  }

  public getClient(): RedisClientType {
    if (!this.isConnected) {
      throw new Error("Redis client is not connected");
    }
    return this.client;
  }

  public isClientConnected(): boolean {
    return this.isConnected;
  }
}

// Export a singleton instance
export const redisService = RedisService.getInstance();
