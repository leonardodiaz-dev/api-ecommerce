"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarVariante = void 0;
const prisma_1 = require("../lib/prisma");
const buscarVariante = async (req, res) => {
    try {
        const { codigo } = req.query;
        const variantes = await prisma_1.prisma.variante.findMany({
            where: {
                articulo: {
                    codigo: String(codigo),
                },
            },
            select: {
                idVariante: true,
                articulo: {
                    select: { codigo: true, nombre: true },
                },
                color: {
                    select: { nombre: true },
                },
                talla: {
                    select: { nombre: true },
                },
                stock: true,
            },
        });
        return res.status(200).json(variantes);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.buscarVariante = buscarVariante;
//# sourceMappingURL=varianteController.js.map