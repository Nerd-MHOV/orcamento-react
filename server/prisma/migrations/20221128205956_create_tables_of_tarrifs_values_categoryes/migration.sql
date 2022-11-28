/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" SERIAL NOT NULL,
    "adt" DOUBLE PRECISION NOT NULL,
    "adtex" DOUBLE PRECISION NOT NULL,
    "chd0" DOUBLE PRECISION NOT NULL,
    "chd4" DOUBLE PRECISION NOT NULL,
    "chd8" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "initials" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarrifs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_pipe" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "order_id" INTEGER NOT NULL,
    "food_Id" INTEGER NOT NULL,

    CONSTRAINT "tarrifs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarrif_values" (
    "id" SERIAL NOT NULL,
    "tarrifs_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "adt" DOUBLE PRECISION NOT NULL,
    "adtex" DOUBLE PRECISION NOT NULL,
    "chd0" DOUBLE PRECISION NOT NULL,
    "chd4" DOUBLE PRECISION NOT NULL,
    "chd8" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tarrif_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tarrifs_id" INTEGER NOT NULL,

    CONSTRAINT "SpecificDates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "categories_initials_key" ON "categories"("initials");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tarrifs_name_key" ON "tarrifs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tarrifs_order_id_key" ON "tarrifs"("order_id");

-- AddForeignKey
ALTER TABLE "tarrifs" ADD CONSTRAINT "tarrifs_food_Id_fkey" FOREIGN KEY ("food_Id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarrif_values" ADD CONSTRAINT "tarrif_values_tarrifs_id_fkey" FOREIGN KEY ("tarrifs_id") REFERENCES "tarrifs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarrif_values" ADD CONSTRAINT "tarrif_values_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificDates" ADD CONSTRAINT "SpecificDates_tarrifs_id_fkey" FOREIGN KEY ("tarrifs_id") REFERENCES "tarrifs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
