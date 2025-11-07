"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDepartamentos = void 0;
const prisma_1 = require("../lib/prisma");
const getAllDepartamentos = async (req, res) => {
    try {
        const departamentos = await prisma_1.prisma.departamento.findMany();
        return res.status(200).json(departamentos);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllDepartamentos = getAllDepartamentos;
//# sourceMappingURL=departamentoController.js.map