/*
  Warnings:

  - You are about to drop the `discount_favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "discount_favorite" DROP CONSTRAINT "discount_favorite_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "discount_favorite" DROP CONSTRAINT "discount_favorite_user_id_fkey";

-- DropTable
DROP TABLE "discount_favorite";

-- CreateTable
CREATE TABLE "budgets_favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,

    CONSTRAINT "budgets_favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "budgets_favorites" ADD CONSTRAINT "budgets_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets_favorites" ADD CONSTRAINT "budgets_favorites_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "save_budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
