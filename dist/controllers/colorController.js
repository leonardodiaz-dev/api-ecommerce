"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllColores = exports.createColor = void 0;
const prisma_1 = require("../lib/prisma");
const createColor = async (req, res) => {
    try {
        const { nombre, codigoHex } = req.body;
        const newColor = await prisma_1.prisma.color.create({
            data: {
                nombre,
                codigoHex
            }
        });
        return res.status(201).json(newColor);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createColor = createColor;
const getAllColores = async (req, res) => {
    try {
        const colores = await prisma_1.prisma.color.findMany();
        return res.status(200).json(colores);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllColores = getAllColores;
//# sourceMappingURL=colorController.js.map