// src/utils/db.ts  (or your equivalent file)

import { PrismaClient } from "../generated/prisma";

// This prevents multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single, shared instance of the Prisma Client.
// If we're in development and the instance already exists on the global object,
// use that. Otherwise, create a new one.
export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "&connection_limit=15",
      },
    },
  });

// In development, save the instance to the global object.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
