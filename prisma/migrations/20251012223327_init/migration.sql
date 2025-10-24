/*
  Warnings:

  - You are about to drop the column `nombre` on the `Talla` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[valor]` on the table `Talla` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `valor` to the `Talla` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Talla_nombre_key";

-- AlterTable
ALTER TABLE "Talla" DROP COLUMN "nombre",
ADD COLUMN     "valor" DECIMAL(3,1) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Talla_valor_key" ON "Talla"("valor");
