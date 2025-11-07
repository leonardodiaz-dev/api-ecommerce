"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistritosByProvincia = void 0;
const prisma_1 = require("../lib/prisma");
const getDistritosByProvincia = async (req, res) => {
    const { id } = req.params;
    try {
        const distritos = await prisma_1.prisma.distrito.findMany({
            where: {
                provinciaId: Number(id)
            }
        });
        return res.json(distritos);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getDistritosByProvincia = getDistritosByProvincia;
//# sourceMappingURL=distritoController.js.map