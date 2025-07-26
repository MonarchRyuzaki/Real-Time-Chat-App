import { getPrismaClient } from "../services/prisma";

export async function userExists(username: string): Promise<boolean> {
  try {
    if (!username) {
      console.error("userExists called with empty username");
      return false;
    }

    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    return user !== null;
  } catch (error) {
    console.error("Error checking if user exists:", username, error);
    // Return false on error to be safe - this will cause validation to fail
    // which is better than allowing potentially invalid operations
    return false;
  }
}
