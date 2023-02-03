-- CreateTable
CREATE TABLE "save_budgets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "budgets" JSONB NOT NULL,

    CONSTRAINT "save_budgets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "save_budgets" ADD CONSTRAINT "save_budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
