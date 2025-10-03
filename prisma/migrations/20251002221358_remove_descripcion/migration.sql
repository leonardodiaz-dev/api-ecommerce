/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Genero` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Marca` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Genero" DROP COLUMN "descripcion";

-- AlterTable
ALTER TABLE "Marca" DROP COLUMN "descripcion";
