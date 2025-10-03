/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Categoria` table. All the data in the column will be lost.
  - Added the required column `subSubcategoriaId` to the `Articulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articulo" ADD COLUMN     "subSubcategoriaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "descripcion";

-- CreateTable
CREATE TABLE "Subcategoria" (
    "idSubcategoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Subcategoria_pkey" PRIMARY KEY ("idSubcategoria")
);

-- CreateTable
CREATE TABLE "SubSubcategoria" (
    "idSubSubcategoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "subcategoriaId" INTEGER NOT NULL,

    CONSTRAINT "SubSubcategoria_pkey" PRIMARY KEY ("idSubSubcategoria")
);

-- AddForeignKey
ALTER TABLE "Subcategoria" ADD CONSTRAINT "Subcategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSubcategoria" ADD CONSTRAINT "SubSubcategoria_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "Subcategoria"("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articulo" ADD CONSTRAINT "Articulo_subSubcategoriaId_fkey" FOREIGN KEY ("subSubcategoriaId") REFERENCES "SubSubcategoria"("idSubSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;
