-- CreateTable
CREATE TABLE "tariff_checkin_values" (
    "id" SERIAL NOT NULL,
    "tariffs_id" INTEGER NOT NULL,
    "adt" DOUBLE PRECISION NOT NULL,
    "adtex" DOUBLE PRECISION NOT NULL,
    "chd0" DOUBLE PRECISION NOT NULL,
    "chd4" DOUBLE PRECISION NOT NULL,
    "chd8" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tariff_checkin_values_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tariff_checkin_values" ADD CONSTRAINT "tariff_checkin_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
