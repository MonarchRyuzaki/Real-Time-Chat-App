import { PrismaClient } from "../generated/prisma";
import { logger } from "../utils/logger";

let prismaClient: PrismaClient | null = null;

export async function initializePrismaClient(): Promise<PrismaClient> {
  if (prismaClient) {
    return prismaClient;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Missing required environment variable: DATABASE_URL");
  }

  prismaClient = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  await prismaClient.$connect();
  logger.info("✅ Prisma client connected successfully");

  return prismaClient;
}

export function getPrismaClient(): PrismaClient {
  if (!prismaClient) {
    throw new Error(
      "Prisma client not initialized. Call initializePrismaClient() first."
    );
  }
  return prismaClient;
}

export async function closePrismaClient(): Promise<void> {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = null;
    logger.info("📴 Prisma client disconnected");
  }
}
