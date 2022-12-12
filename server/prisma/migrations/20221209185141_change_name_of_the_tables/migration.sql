/*
  Warnings:

  - You are about to drop the `CommonDates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Requirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpecificDates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommonDates" DROP CONSTRAINT "CommonDates_tariff_to_midweek_id_fkey";

-- DropForeignKey
ALTER TABLE "CommonDates" DROP CONSTRAINT "CommonDates_tariff_to_weekend_id_fkey";

-- DropForeignKey
ALTER TABLE "SpecificDates" DROP CONSTRAINT "SpecificDates_tariffs_id_fkey";

-- DropTable
DROP TABLE "CommonDates";

-- DropTable
DROP TABLE "Requirement";

-- DropTable
DROP TABLE "SpecificDates";

-- CreateTable
CREATE TABLE "specific_dates" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "tariffs_id" INTEGER NOT NULL,

    CONSTRAINT "specific_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common_dates" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "tariff_to_midweek_id" INTEGER NOT NULL,
    "tariff_to_weekend_id" INTEGER NOT NULL,

    CONSTRAINT "common_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specific_dates_date_key" ON "specific_dates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "common_dates_date_key" ON "common_dates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "requirements_name_key" ON "requirements"("name");

-- AddForeignKey
ALTER TABLE "specific_dates" ADD CONSTRAINT "specific_dates_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_dates" ADD CONSTRAINT "common_dates_tariff_to_midweek_id_fkey" FOREIGN KEY ("tariff_to_midweek_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_dates" ADD CONSTRAINT "common_dates_tariff_to_weekend_id_fkey" FOREIGN KEY ("tariff_to_weekend_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
