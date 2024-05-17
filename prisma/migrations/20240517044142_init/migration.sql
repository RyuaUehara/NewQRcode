/*
  Warnings:

  - Made the column `start_time` on table `visits` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "visits" ALTER COLUMN "start_time" SET NOT NULL,
ALTER COLUMN "start_time" SET DEFAULT CURRENT_TIMESTAMP;
