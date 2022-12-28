-- CreateTable
CREATE TABLE "du_tariffs" (
    "name" TEXT NOT NULL,
    "product_pipe" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "du_tariffs_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "du_tariff_values" (
    "id" SERIAL NOT NULL,
    "tariffs_id" TEXT NOT NULL,
    "adt" DOUBLE PRECISION NOT NULL,
    "adtex" DOUBLE PRECISION NOT NULL,
    "chd0" DOUBLE PRECISION NOT NULL,
    "chd4" DOUBLE PRECISION NOT NULL,
    "chd8" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "du_tariff_values_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "du_tariff_values" ADD CONSTRAINT "du_tariff_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "du_tariffs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
