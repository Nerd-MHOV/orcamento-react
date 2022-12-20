/*
  Warnings:

  - The primary key for the `common_dates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `common_dates` table. All the data in the column will be lost.
  - The primary key for the `specific_dates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `specific_dates` table. All the data in the column will be lost.
  - The primary key for the `tariffs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tariffs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "common_dates" DROP CONSTRAINT "common_dates_tariff_to_midweek_id_fkey";

-- DropForeignKey
ALTER TABLE "common_dates" DROP CONSTRAINT "common_dates_tariff_to_weekend_id_fkey";

-- DropForeignKey
ALTER TABLE "specific_dates" DROP CONSTRAINT "specific_dates_tariffs_id_fkey";

-- DropForeignKey
ALTER TABLE "tariff_checkin_values" DROP CONSTRAINT "tariff_checkin_values_tariffs_id_fkey";

-- DropForeignKey
ALTER TABLE "tariff_values" DROP CONSTRAINT "tariff_values_tariffs_id_fkey";

-- DropIndex
DROP INDEX "common_dates_date_key";

-- DropIndex
DROP INDEX "specific_dates_date_key";

-- DropIndex
DROP INDEX "tariffs_name_key";

-- AlterTable
ALTER TABLE "common_dates" DROP CONSTRAINT "common_dates_pkey",
DROP COLUMN "id",
ALTER COLUMN "tariff_to_midweek_id" SET DATA TYPE TEXT,
ALTER COLUMN "tariff_to_weekend_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "common_dates_pkey" PRIMARY KEY ("date");

-- AlterTable
ALTER TABLE "specific_dates" DROP CONSTRAINT "specific_dates_pkey",
DROP COLUMN "id",
ALTER COLUMN "tariffs_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "specific_dates_pkey" PRIMARY KEY ("date");

-- AlterTable
ALTER TABLE "tariff_checkin_values" ALTER COLUMN "tariffs_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tariff_values" ALTER COLUMN "tariffs_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tariffs" DROP CONSTRAINT "tariffs_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tariffs_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "tariff_values" ADD CONSTRAINT "tariff_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specific_dates" ADD CONSTRAINT "specific_dates_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_dates" ADD CONSTRAINT "common_dates_tariff_to_midweek_id_fkey" FOREIGN KEY ("tariff_to_midweek_id") REFERENCES "tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_dates" ADD CONSTRAINT "common_dates_tariff_to_weekend_id_fkey" FOREIGN KEY ("tariff_to_weekend_id") REFERENCES "tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tariff_checkin_values" ADD CONSTRAINT "tariff_checkin_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
