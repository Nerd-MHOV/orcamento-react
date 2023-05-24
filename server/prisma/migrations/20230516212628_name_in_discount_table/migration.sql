/*
  Warnings:

  - Added the required column `name` to the `Discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discounts" ADD COLUMN     "name" TEXT NOT NULL;
