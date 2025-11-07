"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRol = void 0;
const prisma_1 = require("../lib/prisma");
const createRol = async (req, res) => {
    try {
        const { nombre } = req.body;
        const newRol = await prisma_1.prisma.rol.create({
            data: {
                nombre
            }
        });
        return res.status(201).json(newRol);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createRol = createRol;
//# sourceMappingURL=rolController.js.map