/*
  Warnings:

  - The primary key for the `du_tariff_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `foods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pets` table. All the data in the column will be lost.
  - The primary key for the `requirements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `requirements` table. All the data in the column will be lost.
  - The primary key for the `tariff_checkin_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tariff_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tariffs" DROP CONSTRAINT "tariffs_food_id_fkey";

-- DropIndex
DROP INDEX "pets_carrying_key";

-- DropIndex
DROP INDEX "requirements_name_key";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "du_tariff_values" DROP CONSTRAINT "du_tariff_values_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "du_tariff_values_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "du_tariff_values_id_seq";

-- AlterTable
ALTER TABLE "foods" DROP CONSTRAINT "foods_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "foods_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "foods_id_seq";

-- AlterTable
ALTER TABLE "pets" DROP CONSTRAINT "pets_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "pets_pkey" PRIMARY KEY ("carrying");

-- AlterTable
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "requirements_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "tariff_checkin_values" DROP CONSTRAINT "tariff_checkin_values_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tariff_checkin_values_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tariff_checkin_values_id_seq";

-- AlterTable
ALTER TABLE "tariff_values" DROP CONSTRAINT "tariff_values_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tariff_values_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tariff_values_id_seq";

-- AlterTable
ALTER TABLE "tariffs" ALTER COLUMN "food_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("username");

-- AddForeignKey
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
