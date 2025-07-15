/*
  Warnings:

  - Added the required column `category` to the `SegregatedProperties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SegregatedProperties" ADD COLUMN     "category" TEXT NOT NULL;
