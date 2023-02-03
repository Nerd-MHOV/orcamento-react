/*
  Warnings:

  - You are about to drop the column `nivel` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "nivel",
ADD COLUMN     "level" DOUBLE PRECISION NOT NULL DEFAULT 1;
