-- AlterTable
ALTER TABLE "Variante" ALTER COLUMN "stock" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Proveedor" (
    "idProveedor" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruc" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("idProveedor")
);

-- CreateTable
CREATE TABLE "Ingreso" (
    "idIngreso" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cantidad" INTEGER NOT NULL,
    "varianteId" INTEGER NOT NULL,
    "proveedorId" INTEGER NOT NULL,

    CONSTRAINT "Ingreso_pkey" PRIMARY KEY ("idIngreso")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_ruc_key" ON "Proveedor"("ruc");

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "Variante"("idVariante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("idProveedor") ON DELETE RESTRICT ON UPDATE CASCADE;
