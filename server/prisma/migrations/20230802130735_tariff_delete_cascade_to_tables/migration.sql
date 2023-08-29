-- DropForeignKey
ALTER TABLE "common_dates" DROP CONSTRAINT "common_dates_tariff_to_midweek_id_fkey";

-- DropForeignKey
ALTER TABLE "common_dates" DROP CONSTRAINT "common_dates_tariff_to_weekend_id_fkey";

-- DropForeignKey
ALTER TABLE "specific_dates" DROP CONSTRAINT "specific_dates_tariffs_id_fkey";

-- DropForeignKey
ALTER TABLE "tariff_checkin_values" DROP CONSTRAINT "tariff_checkin_values_tariffs_id_fkey";

-- DropForeignKey
ALTER TABLE "tariff_values" DROP CONSTRAINT "tariff_values_tariffs_id_fkey";

-- DropForeignKey
ALTER TABLE "tariffs" DROP CONSTRAINT "tariffs_food_id_fkey";

-- AddForeignKey
ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tariff_values" ADD CONSTRAINT "tariff_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specific_dates" ADD CONSTRAINT "specific_dates_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_dates" ADD CONSTRAINT "common_dates_tariff_to_midweek_id_fkey" FOREIGN KEY ("tariff_to_midweek_id") REFERENCES "tariffs"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_dates" ADD CONSTRAINT "common_dates_tariff_to_weekend_id_fkey" FOREIGN KEY ("tariff_to_weekend_id") REFERENCES "tariffs"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tariff_checkin_values" ADD CONSTRAINT "tariff_checkin_values_tariffs_id_fkey" FOREIGN KEY ("tariffs_id") REFERENCES "tariffs"("name") ON DELETE CASCADE ON UPDATE CASCADE;
