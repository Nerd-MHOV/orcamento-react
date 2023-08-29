/*
  Warnings:

  - Added the required column `aplicable_in` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discounts" ADD COLUMN     "aplicable_in" TEXT NOT NULL;
