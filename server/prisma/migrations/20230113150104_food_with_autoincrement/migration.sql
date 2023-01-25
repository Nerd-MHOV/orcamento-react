/*
  Warnings:

  - The primary key for the `foods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `foods` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `food_id` on the `tariffs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "tariffs" DROP CONSTRAINT "tariffs_food_id_fkey";

-- AlterTable
ALTER TABLE "foods" DROP CONSTRAINT "foods_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "foods_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tariffs" DROP COLUMN "food_id",
ADD COLUMN     "food_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
