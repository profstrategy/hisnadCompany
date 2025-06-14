/*
  Warnings:

  - The primary key for the `SegregatedProperties` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_product_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_selected_product_id_fkey";

-- AlterTable
ALTER TABLE "SegregatedProperties" DROP CONSTRAINT "SegregatedProperties_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SegregatedProperties_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SegregatedProperties_id_seq";

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "product_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "selected_product_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_selected_product_id_fkey" FOREIGN KEY ("selected_product_id") REFERENCES "SegregatedProperties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "SegregatedProperties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
