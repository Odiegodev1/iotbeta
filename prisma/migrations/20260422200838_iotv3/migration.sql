/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Relay` table. All the data in the column will be lost.
  - Added the required column `distancia` to the `Relay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modo` to the `Relay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relay" DROP COLUMN "updatedAt",
ADD COLUMN     "distancia" INTEGER NOT NULL,
ADD COLUMN     "modo" TEXT NOT NULL;
