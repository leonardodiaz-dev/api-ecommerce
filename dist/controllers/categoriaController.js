"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategorias = exports.updateEstadoCategoria = exports.listCategoriasWithSubCategorias = exports.updateCategoria = exports.createCategoria = void 0;
const prisma_1 = require("../lib/prisma");
const createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const newCategoria = await prisma_1.prisma.categoria.create({
            data: {
                nombre
            }
        });
        res.status(201).json(newCategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createCategoria = createCategoria;
const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const categoria = await prisma_1.prisma.categoria.update({
            where: {
                idCategoria: Number(id)
            },
            data: {
                nombre
            }
        });
        return res.status(200).json(categoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateCategoria = updateCategoria;
const listCategoriasWithSubCategorias = async (req, res) => {
    try {
        const categorias = await prisma_1.prisma.categoria.findMany({
            where: {
                estado: true,
            },
            select: {
                idCategoria: true,
                nombre: true,
                subcategorias: {
                    where: {
                        estado: true,
                    },
                    select: {
                        idSubcategoria: true,
                        nombre: true,
                        subsubcategorias: {
                            where: {
                                estado: true,
                            },
                            select: {
                                idSubSubcategoria: true,
                                nombre: true,
                            },
                        },
                    },
                },
            },
        });
        return res.status(200).json(categorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.listCategoriasWithSubCategorias = listCategoriasWithSubCategorias;
const updateEstadoCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const categoria = await prisma_1.prisma.categoria.update({
            where: {
                idCategoria: Number(id)
            },
            data: {
                estado
            }
        });
        return res.status(200).json(categoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateEstadoCategoria = updateEstadoCategoria;
const getAllCategorias = async (req, res) => {
    try {
        const categorias = await prisma_1.prisma.categoria.findMany({
            orderBy: {
                "idCategoria": "desc"
            }
        });
        return res.status(200).json(categorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllCategorias = getAllCategorias;
//# sourceMappingURL=categoriaController.js.map