"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGeneros = exports.createGenero = void 0;
const prisma_1 = require("../lib/prisma");
const createGenero = async (req, res) => {
    try {
        const { nombre } = req.body;
        const newGenero = await prisma_1.prisma.genero.create({
            data: {
                nombre
            }
        });
        return res.status(201).json(newGenero);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createGenero = createGenero;
const getAllGeneros = async (req, res) => {
    try {
        const generos = await prisma_1.prisma.genero.findMany();
        return res.status(200).json(generos);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllGeneros = getAllGeneros;
//# sourceMappingURL=generoController.js.map