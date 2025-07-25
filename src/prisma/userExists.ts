import { getPrismaClient } from "../services/prisma";

export async function userExists(username: string): Promise<boolean> {
  // This function checks if a user exists in the database.
  // Replace with actual database query logic.
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return user !== null;
}
