import { PrismaClient } from "@prisma/client";
import { marcaSeeder } from "./seedMarca";
import { generoSeeder } from "./seedGenero";
import { categoriaSeeder } from "./seedCategoria";
import { articuloSeeder } from "./seedArticulo";

const prisma = new PrismaClient();

const main = async () => {
  await marcaSeeder();
  await generoSeeder();
  await categoriaSeeder();
  await articuloSeeder();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
