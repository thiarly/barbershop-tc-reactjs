/*
  Warnings:

  - You are about to drop the column `customerId` on the `services` table. All the data in the column will be lost.
  - Added the required column `customer` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" RENAME COLUMN "customerId" TO "customer";
