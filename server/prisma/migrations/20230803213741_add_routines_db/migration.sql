-- CreateTable
CREATE TABLE "Routines" (
    "id" TEXT NOT NULL,
    "routine" TEXT NOT NULL,
    "last_action" TEXT,
    "last_deal" TEXT,

    CONSTRAINT "Routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deals" (
    "id" TEXT NOT NULL,
    "budget_status" TEXT,
    "check_in" TEXT,
    "check_out" TEXT,
    "win" TEXT,
    "amount_total" TEXT,

    CONSTRAINT "Deals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routines_routine_key" ON "Routines"("routine");
