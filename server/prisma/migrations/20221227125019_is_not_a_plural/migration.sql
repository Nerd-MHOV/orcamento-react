/*
  Warnings:

  - You are about to drop the column `tariffs_id` on the `du_tariff_values` table. All the data in the column will be lost.
  - Added the required column `tariff_id` to the `du_tariff_values` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "du_tariff_values" DROP CONSTRAINT "du_tariff_values_tariffs_id_fkey";

-- AlterTable
ALTER TABLE "du_tariff_values" DROP COLUMN "tariffs_id",
ADD COLUMN     "tariff_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "du_tariff_values" ADD CONSTRAINT "du_tariff_values_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "du_tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
