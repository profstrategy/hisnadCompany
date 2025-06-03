/*
  Warnings:

  - Added the required column `email` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
