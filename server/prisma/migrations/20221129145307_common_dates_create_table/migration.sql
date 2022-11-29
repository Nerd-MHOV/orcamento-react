/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `SpecificDates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CommonDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tarrif_to_midweek_id" INTEGER NOT NULL,
    "tarrif_to_weekend_id" INTEGER NOT NULL,

    CONSTRAINT "CommonDates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommonDates_date_key" ON "CommonDates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "SpecificDates_date_key" ON "SpecificDates"("date");

-- AddForeignKey
ALTER TABLE "CommonDates" ADD CONSTRAINT "CommonDates_tarrif_to_midweek_id_fkey" FOREIGN KEY ("tarrif_to_midweek_id") REFERENCES "tarrifs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonDates" ADD CONSTRAINT "CommonDates_tarrif_to_weekend_id_fkey" FOREIGN KEY ("tarrif_to_weekend_id") REFERENCES "tarrifs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
