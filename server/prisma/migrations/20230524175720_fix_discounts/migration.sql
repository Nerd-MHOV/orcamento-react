/*
  Warnings:

  - You are about to drop the `DiscountDates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiscountDates" DROP CONSTRAINT "DiscountDates_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_user_id_fkey";

-- DropTable
DROP TABLE "DiscountDates";

-- DropTable
DROP TABLE "Discounts";

-- DropTable
DROP TABLE "Favorites";

-- CreateTable
CREATE TABLE "discount_favorite" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,

    CONSTRAINT "discount_favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percent_general" DOUBLE PRECISION NOT NULL,
    "percent_unitary" DOUBLE PRECISION NOT NULL,
    "daily_courtesy" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_dates" (
    "date" TEXT NOT NULL,
    "discount_id" TEXT NOT NULL,

    CONSTRAINT "discount_dates_pkey" PRIMARY KEY ("date")
);

-- AddForeignKey
ALTER TABLE "discount_favorite" ADD CONSTRAINT "discount_favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_favorite" ADD CONSTRAINT "discount_favorite_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "save_budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_dates" ADD CONSTRAINT "discount_dates_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
