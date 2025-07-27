/*
  Warnings:

  - The primary key for the `Friendship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friend` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1,user2]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_friend_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_user_fkey";

-- DropIndex
DROP INDEX "Friendship_user_friend_key";

-- AlterTable
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_pkey",
DROP COLUMN "friend",
DROP COLUMN "id",
DROP COLUMN "user",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "user1" TEXT NOT NULL,
ADD COLUMN     "user2" TEXT NOT NULL,
ADD CONSTRAINT "Friendship_pkey" PRIMARY KEY ("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_user1_user2_key" ON "Friendship"("user1", "user2");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user1_fkey" FOREIGN KEY ("user1") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user2_fkey" FOREIGN KEY ("user2") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
