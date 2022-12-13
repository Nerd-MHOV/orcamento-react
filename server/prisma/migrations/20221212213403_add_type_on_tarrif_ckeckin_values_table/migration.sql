/*
  Warnings:

  - Added the required column `type` to the `tariff_checkin_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tariff_checkin_values" ADD COLUMN     "type" TEXT NOT NULL;
