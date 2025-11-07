"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerMarcasBySubsubcategoria = exports.updateEstadoSubsubcategoria = exports.getAllSubsubcategorias = exports.updateSubsubcategoria = exports.createSubsubcategoria = exports.getSubsubcategoriasBySubCategoriaId = void 0;
const prisma_1 = require("../lib/prisma");
const getSubsubcategoriasBySubCategoriaId = async (req, res) => {
    try {
        const { id } = req.params;
        const subsubcategorias = await prisma_1.prisma.subSubcategoria.findMany({
            where: {
                subcategoriaId: Number(id)
            }
        });
        return res.status(200).json(subsubcategorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getSubsubcategoriasBySubCategoriaId = getSubsubcategoriasBySubCategoriaId;
const createSubsubcategoria = async (req, res) => {
    try {
        const { nombre, subcategoriaId } = req.body;
        const subsubcategoria = await prisma_1.prisma.subSubcategoria.create({
            data: {
                nombre,
                subcategoriaId: Number(subcategoriaId)
            },
            include: {
                subcategoria: true
            }
        });
        return res.status(201).json(subsubcategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createSubsubcategoria = createSubsubcategoria;
const updateSubsubcategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, subcategoriaId, estado } = req.body;
        const updateSubsubcategoria = await prisma_1.prisma.subSubcategoria.update({
            where: {
                idSubSubcategoria: Number(id)
            },
            data: {
                nombre,
                estado,
                subcategoriaId: Number(subcategoriaId)
            },
            include: {
                subcategoria: true
            }
        });
        return res.status(200).json(updateSubsubcategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateSubsubcategoria = updateSubsubcategoria;
const getAllSubsubcategorias = async (req, res) => {
    try {
        const subsubcategorias = await prisma_1.prisma.subSubcategoria.findMany({
            include: {
                subcategoria: true
            },
            orderBy: {
                idSubSubcategoria: "asc"
            }
        });
        return res.status(200).json(subsubcategorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllSubsubcategorias = getAllSubsubcategorias;
const updateEstadoSubsubcategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const subsubcategoria = await prisma_1.prisma.subSubcategoria.update({
            where: {
                idSubSubcategoria: Number(id)
            },
            data: {
                estado
            }
        });
        return res.status(200).json(subsubcategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateEstadoSubsubcategoria = updateEstadoSubsubcategoria;
const obtenerMarcasBySubsubcategoria = async (req, res) => {
    try {
        const { nombre } = req.params;
        const marcas = await prisma_1.prisma.marca.findMany({
            where: {
                articulos: {
                    some: {
                        OR: [
                            {
                                SubSubcategoria: {
                                    nombre: {
                                        equals: String(nombre),
                                    },
                                },
                            },
                            {
                                SubSubcategoria: {
                                    subcategoria: {
                                        nombre: {
                                            equals: String(nombre),
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
            select: {
                idMarca: true,
                nombre: true,
            },
            distinct: ["nombre"],
        });
        return res.status(200).json(marcas);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.obtenerMarcasBySubsubcategoria = obtenerMarcasBySubsubcategoria;
//# sourceMappingURL=subsubcategoriasController.js.map