-- CreateTable
CREATE TABLE "Discounts" (
    "date" TEXT NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Discounts_pkey" PRIMARY KEY ("date")
);
