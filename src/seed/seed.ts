import { PrismaClient } from "@prisma/client";
import { marcaSeeder } from "./seedMarca";
import { generoSeeder } from "./seedGenero";
import { categoriaSeeder } from "./seedCategoria";
import { articuloSeeder } from "./seedArticulo";
import { tallaSeeder } from "./seedTalla";

const prisma = new PrismaClient();

const main = async () => {
  await marcaSeeder();
  await generoSeeder();
  await categoriaSeeder();
  await articuloSeeder();
  await tallaSeeder();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
