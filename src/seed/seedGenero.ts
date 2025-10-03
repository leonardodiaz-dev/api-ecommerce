import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generoSeeder = async () => {
  
  await prisma.genero.deleteMany();

  const generos = [
    { nombre: "Hombre" },
    { nombre: "Mujer" },
    { nombre: "Niños" },
    { nombre: "Unisex" },
  ];

  await prisma.genero.createMany({
    data: generos,
    skipDuplicates: true,
  });

  console.log("✅ Géneros reiniciados e insertados");
};
