/*
  Warnings:

  - The values [Info,Warning,Error] on the enum `projectlogs_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `projectlogs` MODIFY `type` ENUM('INFO', 'WARNING', 'ERROR') NOT NULL;
