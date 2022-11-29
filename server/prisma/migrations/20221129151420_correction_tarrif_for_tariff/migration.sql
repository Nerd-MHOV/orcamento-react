/*
  Warnings:

  - You are about to drop the column `tarrif_to_midweek_id` on the `CommonDates` table. All the data in the column will be lost.
  - You are about to drop the column `tarrif_to_weekend_id` on the `CommonDates` table. All the data in the column will be lost.
  - You are about to drop the column `tarrifs_id` on the `SpecificDates` table. All the data in the column will be lost.
  - You are about to drop the `tarrif_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarrifs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tariff_to_midweek_id` to the `CommonDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tariff_to_weekend_id` to the `CommonDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tariffs_id` to the `SpecificDates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommonDates" DROP CONSTRAINT "CommonDates_tarrif_to_midweek_id_fkey";

-- DropForeignKey
ALTER TABLE "CommonDates" DROP CONSTRAINT "CommonDates_tarrif_to_weekend_id_fkey";

-- DropForeignKey
ALTER TABLE "SpecificDates" DROP CONSTRAINT "SpecificDates_tarrifs_id_fkey";

-- DropForeignKey
ALTER TABLE "tarrif_values" DROP CONSTRAINT "tarrif_values_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tarrif_values" DROP CONSTRAINT "tarrif_values_tarrifs_id_fkey";

-- DropForeignKey
ALTER TABLE "tarrifs" DROP CONSTRAINT "tarrifs_food_id_fkey";

-- AlterTable
ALTER TABLE "CommonDates" DROP COLUMN "tarrif_to_midweek_id",
DROP COLUMN "tarrif_to_weekend_id",
ADD COLUMN     "tariff_to_midweek_id" INTEGER NOT NULL,
ADD COLUMN     "tariff_to_weekend_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpecificDates" DROP COLUMN "tarrifs_id",
ADD COLUMN     "tariffs_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tarrif_values";

-- DropTable
DROP TABLE "tarrifs";

-- CreateTable
CREATE TABLE "tariffs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_pipe" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "order_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,

    CONSTRAINT "tariffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tariff_values" (
    "id" SERIAL NOT NULL,
    "tariffs_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "adt" DOUBLE PRECISION NOT NULL,
    "adtex" DOUBLE PRECISION NOT NULL,
    "chd0" DOUBLE PRECISION NOT NULL,
    "chd4" DOUBLE PRECISION NOT NULL,
    "chd8" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tariff_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tariffs_name_key" ON "tariffs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tariffs_order_id_key" ON "tariffs"("order_id");

-- AddForeignKey
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tariff_values" ADD CONSTRAINT "tariff_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tariff_values" ADD CONSTRAINT "tariff_values_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificDates" ADD CONSTRAINT "SpecificDates_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonDates" ADD CONSTRAINT "CommonDates_tariff_to_midweek_id_fkey" FOREIGN KEY ("tariff_to_midweek_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonDates" ADD CONSTRAINT "CommonDates_tariff_to_weekend_id_fkey" FOREIGN KEY ("tariff_to_weekend_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
