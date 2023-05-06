-- CreateEnum
CREATE TYPE "TariffStatus" AS ENUM ('active', 'archived');

-- AlterTable
ALTER TABLE "Tariff" ADD COLUMN     "status" "TariffStatus" NOT NULL DEFAULT 'active';
