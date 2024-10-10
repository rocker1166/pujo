-- CreateEnum
CREATE TYPE "CrowdLevel" AS ENUM ('Low', 'Medium', 'High', 'VeryHigh', 'Extreme');

-- CreateTable
CREATE TABLE "PujoEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "crowdLevel" "CrowdLevel" NOT NULL,

    CONSTRAINT "PujoEvent_pkey" PRIMARY KEY ("id")
);
