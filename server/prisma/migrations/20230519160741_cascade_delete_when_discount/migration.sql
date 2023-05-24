-- DropForeignKey
ALTER TABLE "DiscountDates" DROP CONSTRAINT "DiscountDates_discount_id_fkey";

-- AddForeignKey
ALTER TABLE "DiscountDates" ADD CONSTRAINT "DiscountDates_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
