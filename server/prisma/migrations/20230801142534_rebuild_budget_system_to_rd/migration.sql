/*
  Warnings:

  - The primary key for the `foods` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "tariffs" DROP CONSTRAINT "tariffs_food_id_fkey";

-- AlterTable
ALTER TABLE "foods" DROP CONSTRAINT "foods_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "foods_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "foods_id_seq";

-- AlterTable
ALTER TABLE "save_budgets" ADD COLUMN     "name" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'em aberto';

-- AlterTable
ALTER TABLE "tariffs" ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "food_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
