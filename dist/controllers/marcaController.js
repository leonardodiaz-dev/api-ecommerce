"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubSubcategoriasByMarca = exports.getAllMarcas = void 0;
const prisma_1 = require("../lib/prisma");
const getAllMarcas = async (req, res) => {
    try {
        const marcas = await prisma_1.prisma.marca.findMany();
        return res.status(200).json(marcas);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllMarcas = getAllMarcas;
const getSubSubcategoriasByMarca = async (req, res) => {
    try {
        const { nombre } = req.params;
        const subsubcategorias = await prisma_1.prisma.subSubcategoria.findMany({
            where: {
                articulos: {
                    some: {
                        marca: {
                            nombre: {
                                equals: String(nombre),
                                mode: "insensitive",
                            },
                        },
                    },
                },
            },
            distinct: ["nombre"],
            select: {
                idSubSubcategoria: true,
                nombre: true,
            },
        });
        return res.status(200).json(subsubcategorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getSubSubcategoriasByMarca = getSubSubcategoriasByMarca;
//# sourceMappingURL=marcaController.js.map