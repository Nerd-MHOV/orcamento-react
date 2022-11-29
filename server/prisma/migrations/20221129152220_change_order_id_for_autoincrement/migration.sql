-- AlterTable
CREATE SEQUENCE "tariffs_order_id_seq";
ALTER TABLE "tariffs" ALTER COLUMN "order_id" SET DEFAULT nextval('tariffs_order_id_seq');
ALTER SEQUENCE "tariffs_order_id_seq" OWNED BY "tariffs"."order_id";
