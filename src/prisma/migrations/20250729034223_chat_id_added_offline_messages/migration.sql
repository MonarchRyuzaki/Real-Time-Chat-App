/*
  Warnings:

  - Added the required column `chatId` to the `OfflineMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OfflineMessages" ADD COLUMN     "chatId" TEXT NOT NULL;
