/*
  Warnings:

  - You are about to drop the column `valor` on the `Talla` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Talla` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Talla` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Talla` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Talla_valor_key";

-- AlterTable
ALTER TABLE "Talla" DROP COLUMN "valor",
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Talla_nombre_key" ON "Talla"("nombre");
