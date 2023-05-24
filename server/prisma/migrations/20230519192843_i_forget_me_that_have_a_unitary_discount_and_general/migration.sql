/*
  Warnings:

  - You are about to drop the column `percent` on the `Discounts` table. All the data in the column will be lost.
  - Added the required column `percent_general` to the `Discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percent_unitary` to the `Discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discounts" DROP COLUMN "percent",
ADD COLUMN     "percent_general" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "percent_unitary" DOUBLE PRECISION NOT NULL;
