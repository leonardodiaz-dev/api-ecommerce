-- CreateTable
CREATE TABLE "Rol" (
    "idRol" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("idRol")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "telefono" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "idDireccion" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" TEXT,
    "pais" TEXT NOT NULL,
    "codigoPostal" TEXT,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("idDireccion")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "idCategoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("idCategoria")
);

-- CreateTable
CREATE TABLE "Color" (
    "idColor" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigoHex" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("idColor")
);

-- CreateTable
CREATE TABLE "Marca" (
    "idMarca" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("idMarca")
);

-- CreateTable
CREATE TABLE "Genero" (
    "idGenero" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("idGenero")
);

-- CreateTable
CREATE TABLE "Articulo" (
    "idArticulo" SERIAL NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    "generoId" INTEGER,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precioVenta" DECIMAL(10,2) NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Articulo_pkey" PRIMARY KEY ("idArticulo")
);

-- CreateTable
CREATE TABLE "Variante" (
    "idVariante" SERIAL NOT NULL,
    "articuloId" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "colorId" INTEGER,

    CONSTRAINT "Variante_pkey" PRIMARY KEY ("idVariante")
);

-- CreateTable
CREATE TABLE "VarianteAtributo" (
    "idAtributo" SERIAL NOT NULL,
    "varianteId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "VarianteAtributo_pkey" PRIMARY KEY ("idAtributo")
);

-- CreateTable
CREATE TABLE "Venta" (
    "idVenta" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "direccionId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(11,2) NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("idVenta")
);

-- CreateTable
CREATE TABLE "DetalleVenta" (
    "idDetalleVenta" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "varianteId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DECIMAL(11,2) NOT NULL,
    "descuento" DECIMAL(11,2) NOT NULL,

    CONSTRAINT "DetalleVenta_pkey" PRIMARY KEY ("idDetalleVenta")
);

-- CreateTable
CREATE TABLE "Pago" (
    "idPago" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "metodo" TEXT NOT NULL,
    "monto" DECIMAL(11,2) NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("idPago")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "Usuario"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Articulo_codigo_key" ON "Articulo"("codigo");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("idRol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articulo" ADD CONSTRAINT "Articulo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articulo" ADD CONSTRAINT "Articulo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("idMarca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articulo" ADD CONSTRAINT "Articulo_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("idGenero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "Articulo"("idArticulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("idColor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarianteAtributo" ADD CONSTRAINT "VarianteAtributo_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "Variante"("idVariante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("idDireccion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("idVenta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "Variante"("idVariante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("idVenta") ON DELETE RESTRICT ON UPDATE CASCADE;
