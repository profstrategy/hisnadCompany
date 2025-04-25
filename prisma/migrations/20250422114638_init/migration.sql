-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Hisnad', 'Crestwood');

-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('Residential', 'Farmland');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'Sold');

-- CreateTable
CREATE TABLE "SegregatedProperties" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL,
    "mainImage" TEXT[],
    "tier" "Tier" NOT NULL,
    "status" "Status" NOT NULL,
    "price" TEXT[],
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "features" TEXT[],
    "description" TEXT,
    "benefit" TEXT[],
    "documents" TEXT[],
    "payment" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SegregatedProperties_pkey" PRIMARY KEY ("id")
);
