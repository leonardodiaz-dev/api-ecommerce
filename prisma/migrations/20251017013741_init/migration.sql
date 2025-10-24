/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Rol` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Articulo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Articulo" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Rol" DROP COLUMN "descripcion";

-- CreateIndex
CREATE UNIQUE INDEX "Articulo_slug_key" ON "Articulo"("slug");
