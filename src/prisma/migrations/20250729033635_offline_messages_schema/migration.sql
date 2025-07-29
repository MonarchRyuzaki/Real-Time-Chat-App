-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('ONE_TO_ONE', 'GROUP');

-- CreateTable
CREATE TABLE "OfflineMessages" (
    "username" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "partitionKey" TEXT NOT NULL,
    "messageType" "MessageType" NOT NULL,

    CONSTRAINT "OfflineMessages_pkey" PRIMARY KEY ("username","messageId")
);

-- AddForeignKey
ALTER TABLE "OfflineMessages" ADD CONSTRAINT "OfflineMessages_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
