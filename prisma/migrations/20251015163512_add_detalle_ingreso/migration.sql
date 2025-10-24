/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Ingreso` table. All the data in the column will be lost.
  - You are about to drop the column `varianteId` on the `Ingreso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ingreso" DROP CONSTRAINT "Ingreso_varianteId_fkey";

-- AlterTable
ALTER TABLE "Ingreso" DROP COLUMN "cantidad",
DROP COLUMN "varianteId",
ADD COLUMN     "varianteIdVariante" INTEGER;

-- CreateTable
CREATE TABLE "DetalleIngreso" (
    "idDetalle" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "varianteId" INTEGER NOT NULL,
    "ingresoId" INTEGER NOT NULL,

    CONSTRAINT "DetalleIngreso_pkey" PRIMARY KEY ("idDetalle")
);

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_varianteIdVariante_fkey" FOREIGN KEY ("varianteIdVariante") REFERENCES "Variante"("idVariante") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleIngreso" ADD CONSTRAINT "DetalleIngreso_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "Variante"("idVariante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleIngreso" ADD CONSTRAINT "DetalleIngreso_ingresoId_fkey" FOREIGN KEY ("ingresoId") REFERENCES "Ingreso"("idIngreso") ON DELETE RESTRICT ON UPDATE CASCADE;
