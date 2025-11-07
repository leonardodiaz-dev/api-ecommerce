"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvinciasByDepartamento = void 0;
const prisma_1 = require("../lib/prisma");
const getProvinciasByDepartamento = async (req, res) => {
    try {
        const { id } = req.params;
        const provincias = await prisma_1.prisma.provincia.findMany({
            where: {
                departamentoId: Number(id)
            }
        });
        return res.json(provincias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getProvinciasByDepartamento = getProvinciasByDepartamento;
//# sourceMappingURL=provinciaController.js.map