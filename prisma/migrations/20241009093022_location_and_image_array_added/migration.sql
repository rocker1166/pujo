/*
  Warnings:

  - You are about to drop the column `image` on the `PujoEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PujoEvent" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
