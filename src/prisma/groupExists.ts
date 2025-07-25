import { getPrismaClient } from "../services/prisma";

export async function groupExists(groupId: string) {
  // This function checks if a group exists in the database.
  // Replace with actual database query logic.
  const prisma = getPrismaClient();
  const group = await prisma.group.findUnique({
    where: {
      groupId: groupId,
    },
  });
  return group;
}
