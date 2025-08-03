// src/utils/db.ts  (or your equivalent file)

  import { PrismaClient } from "../generated/prisma";

// This prevents multiple instances of Prisma Client in development
declare const global: {
  prisma?: PrismaClient;
};

// Create a single, shared instance of the Prisma Client.
// If we're in development and the instance already exists on the global object,
// use that. Otherwise, create a new one.
export const prisma = global.prisma || new PrismaClient();

// In development, save the instance to the global object.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
