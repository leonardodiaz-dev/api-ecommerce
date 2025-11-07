/*
  Warnings:

  - You are about to drop the column `ciudad` on the `Direccion` table. All the data in the column will be lost.
  - You are about to drop the column `codigoPostal` on the `Direccion` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Direccion` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `Direccion` table. All the data in the column will be lost.
  - Added the required column `distritoId` to the `Direccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Direccion" DROP COLUMN "ciudad",
DROP COLUMN "codigoPostal",
DROP COLUMN "estado",
DROP COLUMN "pais",
ADD COLUMN     "distritoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Departamento" (
    "idDepartamento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("idDepartamento")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "idProvincia" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "departamentoId" INTEGER NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("idProvincia")
);

-- CreateTable
CREATE TABLE "Distrito" (
    "idDistrito" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("idDistrito")
);

-- AddForeignKey
ALTER TABLE "Provincia" ADD CONSTRAINT "Provincia_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("idDepartamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distrito" ADD CONSTRAINT "Distrito_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("idProvincia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "Distrito"("idDistrito") ON DELETE RESTRICT ON UPDATE CASCADE;
