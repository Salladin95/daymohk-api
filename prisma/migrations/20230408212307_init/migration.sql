-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('active', 'archive');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('man', 'woman');

-- CreateEnum
CREATE TYPE "TariffTypes" AS ENUM ('wired', 'wireLess');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tariff" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "type" "TariffTypes" NOT NULL,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessibleDistrict" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "AccessibleDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "personalName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TEXT NOT NULL,
    "passportDate" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressRegistration" TEXT NOT NULL,
    "passportSereies" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportBranch" TEXT NOT NULL,
    "passportMainPagePhoto" TEXT NOT NULL,
    "passportRegistrationPhoto" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "tariffId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Order_districtId_key" ON "Order"("districtId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_tariffId_key" ON "Order"("tariffId");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "AccessibleDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
