/*
  Warnings:

  - Added the required column `brilho` to the `Relay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relay" ADD COLUMN     "brilho" INTEGER NOT NULL;
