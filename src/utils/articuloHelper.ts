import { prisma } from "../lib/prisma";
import fs from "fs";
import path from "path";

export async function generarCodigoArticulo(marcaId: number) {

  const marca = await prisma.marca.findUnique({
    where: { idMarca: marcaId },
    select: { nombre: true }
  });

  if (!marca) throw new Error("Marca no encontrada");

  const ultimo = await prisma.articulo.findFirst({
    orderBy: { idArticulo: "desc" },
  });

  const numero = ultimo ? ultimo.idArticulo + 1 : 1;

  const marcaClean = marca.nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();

  const codigo = `${marcaClean}-ART${numero.toString().padStart(4, "0")}`;
  return codigo;
}

export const handleImageUpload = (
  file: Express.Multer.File | undefined,
  imagenActual?: string
): string | undefined => {
  if (!file) return imagenActual;

  const nuevaRuta = `/uploads/${file.filename}`;

  if (imagenActual) {
    const relativePath = imagenActual.startsWith("/")
      ? imagenActual.slice(1)
      : imagenActual;

    const rutaAntigua = path.join(__dirname, "../../", relativePath);

    fs.unlink(rutaAntigua, (err) => {
      if (err) console.warn("⚠️ No se pudo eliminar la imagen anterior:", err);
      else console.log("🗑️ Imagen anterior eliminada:", rutaAntigua);
    });
  }

  return nuevaRuta;
};

export const generarSlug = (nombre: string): string => {
    return nombre
        .toLowerCase()
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9\s-]/g, "") 
        .trim()
        .replace(/\s+/g, "-"); 
};