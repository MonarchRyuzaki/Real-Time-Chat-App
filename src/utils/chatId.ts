export function generateChatId(user1: string, user2: string): string {
  if (!user1 || !user2) {
    throw new Error("Both users are required to generate a chat ID");
  }

  // Sort the usernames to ensure consistent chat ID generation
  const sortedUsers = [user1, user2].sort();
  return `${sortedUsers[0]}-${sortedUsers[1]}`;
}

export function getOtherUser(chatId: string, user: string) {
  const users = chatId.split("-");
  if (users[1] == user) return users[0];
  else if (users[0] == user) return users[1];
  return null;
}
