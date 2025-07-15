-- CreateTable
CREATE TABLE "OnboardingUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stepCompleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OnboardingUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingUser_email_key" ON "OnboardingUser"("email");
