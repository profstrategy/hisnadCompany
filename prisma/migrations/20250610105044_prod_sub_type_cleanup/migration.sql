/*
  Warnings:

  - The values [Discontinued] on the enum `ProductStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [active,cancelled,expired,pending] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Hisnad,Featured] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `currency` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `payment_plan` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_select` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_type` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('Full', 'Installment');

-- AlterEnum
BEGIN;
CREATE TYPE "ProductStatus_new" AS ENUM ('Available', 'Sold');
ALTER TABLE "SegregatedProperties" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "SegregatedProperties" ALTER COLUMN "status" TYPE "ProductStatus_new" USING ("status"::text::"ProductStatus_new");
ALTER TYPE "ProductStatus" RENAME TO "ProductStatus_old";
ALTER TYPE "ProductStatus_new" RENAME TO "ProductStatus";
DROP TYPE "ProductStatus_old";
ALTER TABLE "SegregatedProperties" ALTER COLUMN "status" SET DEFAULT 'Available';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('idle', 'initialized', 'incomplete', 'completed');
ALTER TABLE "subscriptions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "subscriptions" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "SubscriptionStatus_old";
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'idle';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('Hisnad_Estate', 'Featured_Farmland');
ALTER TABLE "subscriptions" ALTER COLUMN "property_type" TYPE "Type_new" USING ("property_type"::text::"Type_new");
ALTER TABLE "SegregatedProperties" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "currency",
ADD COLUMN     "payment_plan" "SubscriptionPlan" NOT NULL,
ADD COLUMN     "property_select" TEXT NOT NULL,
ADD COLUMN     "property_type" "Type" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'idle';
