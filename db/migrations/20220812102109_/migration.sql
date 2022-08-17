/*
  Warnings:

  - Added the required column `type` to the `UserNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserNotification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UserNotificationSettings" (
    "content" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserNotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserNotification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserNotification" ("createdAt", "icon", "id", "text", "updatedAt") SELECT "createdAt", "icon", "id", "text", "updatedAt" FROM "UserNotification";
DROP TABLE "UserNotification";
ALTER TABLE "new_UserNotification" RENAME TO "UserNotification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserNotificationSettings_content_userId_key" ON "UserNotificationSettings"("content", "userId");
