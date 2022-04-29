/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customers_authUserId_key" ON "Customers"("authUserId");
