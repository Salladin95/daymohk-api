/*
  Warnings:

  - Added the required column `type` to the `Tariff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TariffTypes" AS ENUM ('WIRED', 'WIRELESS');

-- AlterTable
ALTER TABLE "Tariff" ADD COLUMN     "type" "TariffTypes" NOT NULL;
