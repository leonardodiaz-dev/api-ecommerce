/*
  Warnings:

  - You are about to drop the column `varianteIdVariante` on the `Ingreso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ingreso" DROP CONSTRAINT "Ingreso_varianteIdVariante_fkey";

-- AlterTable
ALTER TABLE "Ingreso" DROP COLUMN "varianteIdVariante";
