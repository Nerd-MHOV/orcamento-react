/*
  Warnings:

  - The primary key for the `discount_dates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `discount_dates` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `daily_maximun` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daily_minimun` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payers_minimun` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discount_dates" DROP CONSTRAINT "discount_dates_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "discount_dates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "discounts" ADD COLUMN     "daily_maximun" INTEGER NOT NULL,
ADD COLUMN     "daily_minimun" INTEGER NOT NULL,
ADD COLUMN     "payers_minimun" INTEGER NOT NULL;
