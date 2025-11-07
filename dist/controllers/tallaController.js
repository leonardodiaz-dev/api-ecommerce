"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTallas = exports.createTalla = void 0;
const prisma_1 = require("../lib/prisma");
const createTalla = async (req, res) => {
    try {
        const { nombre, tipo } = req.body;
        const talla = await prisma_1.prisma.talla.create({
            data: {
                nombre,
                tipo
            }
        });
        return res.status(201).json(talla);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createTalla = createTalla;
const getAllTallas = async (req, res) => {
    try {
        const tallas = await prisma_1.prisma.talla.findMany();
        return res.status(200).json(tallas);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllTallas = getAllTallas;
//# sourceMappingURL=tallaController.js.map