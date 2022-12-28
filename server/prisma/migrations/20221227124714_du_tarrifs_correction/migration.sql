/*
  Warnings:

  - You are about to drop the column `adtex` on the `du_tariff_values` table. All the data in the column will be lost.
  - You are about to drop the column `chd4` on the `du_tariff_values` table. All the data in the column will be lost.
  - You are about to drop the column `chd8` on the `du_tariff_values` table. All the data in the column will be lost.
  - Added the required column `chd6` to the `du_tariff_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "du_tariff_values" DROP COLUMN "adtex",
DROP COLUMN "chd4",
DROP COLUMN "chd8",
ADD COLUMN     "chd6" DOUBLE PRECISION NOT NULL;
