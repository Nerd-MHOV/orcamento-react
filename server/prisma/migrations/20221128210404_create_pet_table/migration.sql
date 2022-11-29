/*
  Warnings:

  - You are about to drop the column `food_Id` on the `tarrifs` table. All the data in the column will be lost.
  - Added the required column `food_id` to the `tarrifs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tarrifs" DROP CONSTRAINT "tarrifs_food_Id_fkey";

-- AlterTable
ALTER TABLE "tarrifs" DROP COLUMN "food_Id",
ADD COLUMN     "food_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "carrying" TEXT NOT NULL,
    "daily_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_carrying_key" ON "Pet"("carrying");

-- AddForeignKey
ALTER TABLE "tarrifs" ADD CONSTRAINT "tarrifs_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
