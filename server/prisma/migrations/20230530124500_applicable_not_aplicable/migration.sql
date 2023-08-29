/*
  Warnings:

  - You are about to drop the column `aplicable_in` on the `discounts` table. All the data in the column will be lost.
  - Added the required column `applicable_in` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "aplicable_in",
ADD COLUMN     "applicable_in" TEXT NOT NULL;
