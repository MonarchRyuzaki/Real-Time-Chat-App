import { PrismaClient } from "../generated/prisma";
import { logger } from "../utils/logger";

let prismaClient: PrismaClient | null = null;

export async function initializePrismaClient(): Promise<PrismaClient> {
  try {
    if (prismaClient) {
      return prismaClient;
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("Missing required environment variable: DATABASE_URL");
    }

    try {
      prismaClient = new PrismaClient({
        log: ["query", "info", "warn", "error"],
      });

      await prismaClient.$connect();
      logger.info("✅ Prisma client connected successfully");

      return prismaClient;
    } catch (connectionError) {
      logger.error("Failed to connect to database:", connectionError);
      prismaClient = null;
      throw new Error(
        "Database connection failed. Please check your DATABASE_URL and database availability."
      );
    }
  } catch (error) {
    logger.error("Error initializing Prisma client:", error);
    throw error;
  }
}

export function getPrismaClient(): PrismaClient {
  try {
    if (!prismaClient) {
      throw new Error(
        "Prisma client not initialized. Call initializePrismaClient() first."
      );
    }
    return prismaClient;
  } catch (error) {
    logger.error("Error getting Prisma client:", error);
    throw error;
  }
}

export async function closePrismaClient(): Promise<void> {
  try {
    if (prismaClient) {
      await prismaClient.$disconnect();
      prismaClient = null;
      logger.info("📴 Prisma client disconnected");
    }
  } catch (error) {
    logger.error("Error closing Prisma client:", error);
    prismaClient = null;
    throw error;
  }
}
