"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubsubcategorias = exports.getAllSubcategorias = exports.updateEstadoSubcategoria = exports.updateSubcategoria = exports.createSubcategoria = exports.getSubcategoriasByCategoriaId = void 0;
const prisma_1 = require("../lib/prisma");
const getSubcategoriasByCategoriaId = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategorias = await prisma_1.prisma.subcategoria.findMany({
            where: {
                categoriaId: Number(id)
            }
        });
        return res.status(200).json(subcategorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getSubcategoriasByCategoriaId = getSubcategoriasByCategoriaId;
const createSubcategoria = async (req, res) => {
    try {
        const { nombre, categoriaId } = req.body;
        const subcategoria = await prisma_1.prisma.subcategoria.create({
            data: {
                nombre,
                categoriaId: Number(categoriaId)
            },
            include: {
                categoria: true
            }
        });
        return res.status(201).json(subcategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createSubcategoria = createSubcategoria;
const updateSubcategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoriaId, estado } = req.body;
        const updateSubcategoria = await prisma_1.prisma.subcategoria.update({
            where: {
                idSubcategoria: Number(id)
            },
            data: {
                nombre,
                estado,
                categoriaId: Number(categoriaId)
            },
            include: {
                categoria: true
            }
        });
        return res.status(200).json(updateSubcategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateSubcategoria = updateSubcategoria;
const updateEstadoSubcategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const subcategoria = await prisma_1.prisma.subcategoria.update({
            where: {
                idSubcategoria: Number(id)
            },
            data: {
                estado
            }
        });
        return res.status(200).json(subcategoria);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateEstadoSubcategoria = updateEstadoSubcategoria;
const getAllSubcategorias = async (req, res) => {
    try {
        const subcategorias = await prisma_1.prisma.subcategoria.findMany({
            include: {
                categoria: true
            },
            orderBy: {
                idSubcategoria: "asc"
            }
        });
        return res.status(200).json(subcategorias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllSubcategorias = getAllSubcategorias;
const getSubsubcategorias = async (req, res) => {
    try {
        const { nombre } = req.params;
        console.log(nombre);
        const subsubcategorias = await prisma_1.prisma.subSubcategoria.findMany({
            where: {
                subcategoria: {
                    nombre: {
                        equals: String(nombre)
                    }
                }
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
exports.getSubsubcategorias = getSubsubcategorias;
//# sourceMappingURL=subCategoriaController.js.map