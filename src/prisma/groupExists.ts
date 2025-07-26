import { getPrismaClient } from "../services/prisma";

export async function groupExists(groupId: string) {
  try {
    if (!groupId) {
      console.error("groupExists called with empty groupId");
      return null;
    }

    const prisma = getPrismaClient();
    const group = await prisma.group.findUnique({
      where: {
        groupId: groupId,
      },
    });

    return group;
  } catch (error) {
    console.error("Error checking if group exists:", groupId, error);
    // Return null on error to be safe - this will cause validation to fail
    // which is better than allowing potentially invalid operations
    return null;
  }
}
