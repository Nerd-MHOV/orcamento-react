/*
  Warnings:

  - You are about to drop the column `product_pipe` on the `du_tariffs` table. All the data in the column will be lost.
  - You are about to drop the column `product_pipe` on the `tariffs` table. All the data in the column will be lost.
  - You are about to drop the column `token_pipe` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_pipe` on the `users` table. All the data in the column will be lost.
  - Added the required column `product_rd` to the `du_tariffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_rd` to the `tariffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_rd` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_rd` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "du_tariffs" DROP COLUMN "product_pipe",
ADD COLUMN     "product_rd" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tariffs" DROP COLUMN "product_pipe",
ADD COLUMN     "product_rd" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "token_pipe",
DROP COLUMN "user_pipe",
ADD COLUMN     "token_rd" TEXT NOT NULL,
ADD COLUMN     "user_rd" TEXT NOT NULL;
