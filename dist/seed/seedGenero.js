"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generoSeeder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generoSeeder = async () => {
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
exports.generoSeeder = generoSeeder;
//# sourceMappingURL=seedGenero.js.map