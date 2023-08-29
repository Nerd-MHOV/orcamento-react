/*
  Warnings:

  - You are about to drop the column `daily_maximun` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `daily_minimun` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `payers_minimun` on the `discounts` table. All the data in the column will be lost.
  - Added the required column `daily_maximum` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daily_minimum` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payers_minimum` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "daily_maximun",
DROP COLUMN "daily_minimun",
DROP COLUMN "payers_minimun",
ADD COLUMN     "daily_maximum" INTEGER NOT NULL,
ADD COLUMN     "daily_minimum" INTEGER NOT NULL,
ADD COLUMN     "payers_minimum" INTEGER NOT NULL;
