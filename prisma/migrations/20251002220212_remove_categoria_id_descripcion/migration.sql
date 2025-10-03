/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `Articulo` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Articulo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Articulo" DROP CONSTRAINT "Articulo_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Articulo" DROP COLUMN "categoriaId",
DROP COLUMN "descripcion";
