"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarResultados = void 0;
const prisma_1 = require("../lib/prisma");
const buscarResultados = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string" || q.trim() === "") {
            return res.status(400).json({ message: "Debe enviar un término de búsqueda." });
        }
        const termino = q.trim();
        const [articulos, marcas, subcategorias, subsubcategorias] = await Promise.all([
            prisma_1.prisma.articulo.findMany({
                where: {
                    nombre: { contains: termino, mode: "insensitive" },
                },
                select: {
                    idArticulo: true,
                    nombre: true,
                    imagen: true,
                    precioVenta: true,
                    slug: true,
                },
                take: 5,
            }),
            prisma_1.prisma.marca.findMany({
                where: {
                    nombre: { contains: termino, mode: "insensitive" },
                },
                select: { idMarca: true, nombre: true },
                take: 5,
            }),
            prisma_1.prisma.subcategoria.findMany({
                where: {
                    nombre: { contains: termino, mode: "insensitive" },
                },
                select: {
                    idSubcategoria: true,
                    nombre: true,
                    categoria: { select: { nombre: true } },
                },
                take: 5,
            }),
            prisma_1.prisma.subSubcategoria.findMany({
                where: {
                    nombre: { contains: termino, mode: "insensitive" },
                },
                select: {
                    idSubSubcategoria: true,
                    nombre: true,
                    subcategoria: { select: { nombre: true } },
                },
                take: 5,
            }),
        ]);
        return res.json({
            query: termino,
            resultados: {
                articulos,
                marcas,
                subcategorias,
                subsubcategorias,
            },
        });
    }
    catch (error) {
        console.error("Error en buscarResultados:", error);
        res.status(500).json({ message: "Error al buscar resultados." });
    }
};
exports.buscarResultados = buscarResultados;
//# sourceMappingURL=busquedaController.js.map