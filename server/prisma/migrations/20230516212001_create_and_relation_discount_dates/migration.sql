/*
  Warnings:

  - The primary key for the `Discounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Discounts` table. All the data in the column will be lost.
  - The required column `id` was added to the `Discounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Discounts" DROP CONSTRAINT "Discounts_pkey",
DROP COLUMN "date",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Discounts_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "DiscountDates" (
    "date" TEXT NOT NULL,
    "discount_id" TEXT NOT NULL,

    CONSTRAINT "DiscountDates_pkey" PRIMARY KEY ("date")
);

-- AddForeignKey
ALTER TABLE "DiscountDates" ADD CONSTRAINT "DiscountDates_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
