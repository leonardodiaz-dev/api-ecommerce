/*
  Warnings:

  - You are about to drop the `VarianteAtributo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."VarianteAtributo" DROP CONSTRAINT "VarianteAtributo_varianteId_fkey";

-- AlterTable
ALTER TABLE "Variante" ADD COLUMN     "tallaId" INTEGER;

-- DropTable
DROP TABLE "public"."VarianteAtributo";

-- CreateTable
CREATE TABLE "Talla" (
    "idTalla" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Talla_pkey" PRIMARY KEY ("idTalla")
);

-- CreateIndex
CREATE UNIQUE INDEX "Talla_nombre_key" ON "Talla"("nombre");

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("idTalla") ON DELETE SET NULL ON UPDATE CASCADE;
