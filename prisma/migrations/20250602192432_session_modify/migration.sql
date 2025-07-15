/*
  Warnings:

  - You are about to drop the column `email` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_agent" TEXT;

-- CreateIndex
CREATE INDEX "sessions_isActive_idx" ON "sessions"("isActive");
