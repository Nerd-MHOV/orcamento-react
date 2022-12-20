/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `initials` on the `categories` table. All the data in the column will be lost.
  - Added the required column `token_pipe` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_pipe` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tariff_values" DROP CONSTRAINT "tariff_values_category_id_fkey";

-- DropIndex
DROP INDEX "categories_initials_key";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "initials",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "categories_id_seq";

-- AlterTable
ALTER TABLE "tariff_values" ALTER COLUMN "category_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token_pipe" TEXT NOT NULL,
ADD COLUMN     "user_pipe" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "housing_units" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "minimum_occupancy" INTEGER NOT NULL,
    "maximum_occupancy" INTEGER NOT NULL,

    CONSTRAINT "housing_units_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tariff_values" ADD CONSTRAINT "tariff_values_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_units" ADD CONSTRAINT "housing_units_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
