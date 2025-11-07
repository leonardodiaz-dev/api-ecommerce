"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const seedMarca_1 = require("./seedMarca");
const seedGenero_1 = require("./seedGenero");
const seedCategoria_1 = require("./seedCategoria");
const seedArticulo_1 = require("./seedArticulo");
const seedTalla_1 = require("./seedTalla");
const prisma = new client_1.PrismaClient();
const main = async () => {
    await (0, seedMarca_1.marcaSeeder)();
    await (0, seedGenero_1.generoSeeder)();
    await (0, seedCategoria_1.categoriaSeeder)();
    await (0, seedArticulo_1.articuloSeeder)();
    await (0, seedTalla_1.tallaSeeder)();
};
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map