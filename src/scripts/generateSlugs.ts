import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generarSlug = (nombre: string) => {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

async function main() {
  const articulos = await prisma.articulo.findMany();

  for (const articulo of articulos) {
    const slug = generarSlug(articulo.nombre);
    await prisma.articulo.update({
      where: { idArticulo: articulo.idArticulo },
      data: { slug },
    });
    console.log(`✅ Slug generado para: ${articulo.nombre} → ${slug}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
