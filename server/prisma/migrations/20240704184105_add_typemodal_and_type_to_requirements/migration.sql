-- AlterTable
ALTER TABLE "requirements" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'accommodation',
ADD COLUMN     "typeModal" TEXT NOT NULL DEFAULT 'amount';
