"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangoPrecio = exports.updateEstadoArticulo = exports.getArticulos = exports.listarArticulos = exports.getArticuloById = exports.updateArticulo = exports.getArticuloBySlug = exports.createArticulo = void 0;
const prisma_1 = require("../lib/prisma");
const variantesHelper_1 = require("../utils/variantesHelper");
const articuloHelper_1 = require("../utils/articuloHelper");
const createArticulo = async (req, res) => {
    try {
        const { nombre, generoId, precioVenta, marcaId, subSubcategoriaId, } = req.body;
        let variantes = [];
        if (req.body.variantes)
            variantes = (0, variantesHelper_1.parsearVariantes)(req.body.variantes);
        const codigo = await (0, articuloHelper_1.generarCodigoArticulo)(Number(marcaId));
        const imagen = req.file ? `/uploads/${req.file.filename}` : null;
        const newArticulo = await prisma_1.prisma.articulo.create({
            data: {
                codigo,
                nombre,
                slug: (0, articuloHelper_1.generarSlug)(nombre),
                precioVenta: Number(precioVenta),
                marcaId: Number(marcaId),
                subSubcategoriaId: Number(subSubcategoriaId),
                generoId: Number(generoId),
                imagen,
                variantes: {
                    create: variantes.map((v) => ({
                        colorId: v.colorId ? Number(v.colorId) : null,
                        tallaId: v.tallaId ? Number(v.tallaId) : null,
                    })),
                },
            }
        });
        return res.status(201).json(newArticulo);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createArticulo = createArticulo;
const getArticuloBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({ message: "El slug es requerido" });
        }
        const articulo = await prisma_1.prisma.articulo.findUnique({
            where: { slug },
            include: {
                marca: true,
                genero: true,
                variantes: {
                    orderBy: {
                        idVariante: "asc"
                    },
                    include: {
                        talla: true,
                        color: true,
                    },
                },
                SubSubcategoria: {
                    include: {
                        subcategoria: {
                            include: {
                                categoria: true,
                            },
                        },
                    }
                },
            }
        });
        if (!articulo) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }
        const response = {
            id: articulo.idArticulo,
            nombre: articulo.nombre,
            slug: articulo.slug,
            codigo: articulo.codigo,
            precio: Number(articulo.precioVenta),
            subcategoria: articulo.SubSubcategoria.subcategoria,
            subsubcategoria: articulo.SubSubcategoria.nombre,
            imagen: articulo.imagen,
            marca: articulo.marca?.nombre,
            tallas: [
                ...new Set(articulo.variantes
                    .filter((v) => v.talla)
                    .map((v) => v.talla?.nombre)),
            ],
            colores: [
                ...new Set(articulo.variantes
                    .filter((v) => v.color)
                    .map((v) => v.color?.nombre)),
            ],
            stockTotal: articulo.variantes.reduce((acc, v) => acc + (v.stock || 0), 0),
            variantes: articulo.variantes.map((v) => ({
                idVariante: v.idVariante,
                talla: v.talla?.nombre ?? "N/A",
                color: v.color?.nombre ?? "N/A",
                stock: v.stock,
            })),
        };
        return res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getArticuloBySlug = getArticuloBySlug;
const updateArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, generoId, precioVenta, marcaId, subSubcategoriaId, variantes } = req.body;
        let parsedVariantes = [];
        if (variantes)
            parsedVariantes = (0, variantesHelper_1.parsearVariantes)(variantes);
        const articuloExistente = await prisma_1.prisma.articulo.findUnique({
            where: { idArticulo: Number(id) },
            include: { variantes: true },
        });
        if (!articuloExistente) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }
        const variantesActualesIds = articuloExistente.variantes.map(v => v.idVariante);
        const variantesRecibidasIds = parsedVariantes
            .filter(v => v.idVariante)
            .map(v => v.idVariante);
        const variantesAEliminar = variantesActualesIds.filter(idVariante => !variantesRecibidasIds.includes(idVariante));
        if (variantesAEliminar.length > 0) {
            await prisma_1.prisma.variante.deleteMany({
                where: { idVariante: { in: variantesAEliminar } }
            });
        }
        const variantesNuevas = parsedVariantes.filter(v => !v.idVariante);
        const variantesAActualizar = parsedVariantes.filter(v => v.idVariante && variantesActualesIds.includes(v.idVariante));
        for (const variante of variantesAActualizar) {
            await prisma_1.prisma.variante.update({
                where: { idVariante: variante.idVariante },
                data: {
                    colorId: variante.colorId,
                    tallaId: variante.tallaId,
                },
            });
        }
        if (variantesNuevas.length > 0) {
            await prisma_1.prisma.variante.createMany({
                data: variantesNuevas.map(v => ({
                    articuloId: Number(id),
                    colorId: v.colorId ? Number(v.colorId) : null,
                    tallaId: v.tallaId ? Number(v.tallaId) : null,
                })),
            });
        }
        let imagen;
        if (articuloExistente.imagen)
            imagen = (0, articuloHelper_1.handleImageUpload)(req.file, articuloExistente.imagen);
        const articuloActualizado = await prisma_1.prisma.articulo.update({
            where: { idArticulo: Number(id) },
            data: {
                nombre,
                precioVenta: Number(precioVenta),
                slug: (0, articuloHelper_1.generarSlug)(nombre),
                marcaId: Number(marcaId),
                subSubcategoriaId: Number(subSubcategoriaId),
                generoId: Number(generoId),
                imagen: imagen ?? null
            },
            include: { variantes: true },
        });
        res.status(200).json(articuloActualizado);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateArticulo = updateArticulo;
const getArticuloById = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await prisma_1.prisma.articulo.findUnique({
            where: {
                idArticulo: Number(id)
            },
            include: {
                SubSubcategoria: {
                    include: {
                        subcategoria: {
                            include: {
                                categoria: true
                            },
                        },
                    },
                },
                variantes: {
                    select: {
                        idVariante: true,
                        colorId: true,
                        tallaId: true
                    }
                }
            }
        });
        const resultado = {
            idArticulo: articulo?.idArticulo,
            nombre: articulo?.nombre,
            precioVenta: articulo?.precioVenta,
            imagen: articulo?.imagen,
            marcaId: articulo?.marcaId,
            generoId: articulo?.generoId,
            categoriaId: articulo?.SubSubcategoria.subcategoria.categoriaId,
            subcategoriaId: articulo?.SubSubcategoria.subcategoriaId,
            subSubcategoriaId: articulo?.subSubcategoriaId,
            variantes: articulo?.variantes
        };
        return res.status(200).json(resultado);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getArticuloById = getArticuloById;
const listarArticulos = async (req, res) => {
    try {
        const articulos = await prisma_1.prisma.articulo.findMany({
            select: {
                idArticulo: true,
                subSubcategoriaId: true,
                codigo: true,
                estado: true,
                genero: { select: { idGenero: true, nombre: true } },
                nombre: true,
                precioVenta: true,
                marca: { select: { idMarca: true, nombre: true } },
                SubSubcategoria: {
                    select: {
                        subcategoria: {
                            select: {
                                categoria: {
                                    select: {
                                        nombre: true,
                                    },
                                },
                            },
                        },
                    },
                },
            }, orderBy: [
                {
                    idArticulo: "asc"
                }
            ]
        });
        const resultado = articulos.map((a) => ({
            idArticulo: a.idArticulo,
            subsubcategoriaId: a.subSubcategoriaId,
            nombre: a.nombre,
            codigo: a.codigo,
            estado: a.estado,
            precioVenta: a.precioVenta,
            marca: a.marca,
            genero: a.genero,
            categoria: a.SubSubcategoria?.subcategoria?.categoria?.nombre,
        }));
        return res.status(200).json(resultado);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.listarArticulos = listarArticulos;
const getArticulos = async (req, res) => {
    try {
        const { marca, generoId, categoriaNombre, nombre, precioMin, precioMax, page = "1", limit = "12", } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;
        const filters = { estado: true };
        if (marca) {
            const nombres = marca
                .split(",")
                .map((n) => n.trim())
                .filter((n) => n !== "");
            filters.marca = {
                nombre: {
                    in: nombres,
                    mode: "insensitive",
                },
            };
        }
        let generoFilter = {};
        if (generoId) {
            const ids = generoId
                .split(",")
                .map((id) => Number(id.trim()))
                .filter((n) => !isNaN(n));
            generoFilter = { generoId: { in: ids } };
        }
        if (nombre) {
            filters.nombre = { contains: nombre, mode: "insensitive" };
        }
        if (precioMin || precioMax) {
            filters.precioVenta = {};
            if (precioMin)
                filters.precioVenta.gte = Number(precioMin);
            if (precioMax)
                filters.precioVenta.lte = Number(precioMax);
        }
        let categoriaFilter = {};
        if (categoriaNombre) {
            let categoriaBuscar = String(categoriaNombre).toLowerCase();
            if (generoId) {
                if (String(generoId).includes("1")) {
                    categoriaBuscar = categoriaBuscar.replace(/\bmujer(es)?\b/gi, "");
                }
                else if (String(generoId).includes("2")) {
                    categoriaBuscar = categoriaBuscar.replace(/\bhombre(s)?\b/gi, "");
                }
            }
            categoriaBuscar = categoriaBuscar
                .replace(/\b(niño|niña|dama|caballero|kids|men|women|unisex)s?\b/gi, "")
                .trim();
            if (!categoriaBuscar)
                categoriaBuscar = String(categoriaNombre);
            categoriaFilter = {
                OR: [
                    {
                        SubSubcategoria: {
                            nombre: { contains: categoriaBuscar, mode: "insensitive" },
                        },
                    },
                    {
                        SubSubcategoria: {
                            subcategoria: {
                                nombre: { contains: categoriaBuscar, mode: "insensitive" },
                            },
                        },
                    },
                ],
            };
        }
        const where = { AND: [filters, categoriaFilter, generoFilter] };
        const total = await prisma_1.prisma.articulo.count({ where });
        const articulos = await prisma_1.prisma.articulo.findMany({
            where,
            skip,
            take: limitNumber,
            include: {
                marca: true,
                genero: true,
                SubSubcategoria: true,
            },
            orderBy: { idArticulo: "desc" },
        });
        return res.json({
            total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            results: articulos,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error en getArticulos:", error.message);
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getArticulos = getArticulos;
const updateEstadoArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const articulo = await prisma_1.prisma.articulo.update({
            where: {
                idArticulo: Number(id)
            },
            data: {
                estado
            }
        });
        return res.status(200).json(articulo);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateEstadoArticulo = updateEstadoArticulo;
const getRangoPrecio = async (req, res) => {
    try {
        const { categoria, marca } = req.query;
        if (!categoria && !marca) {
            return res.status(400).json({
                message: "Debe enviar 'categoria' (nombre de subcategoría o subsubcategoría) o 'marca'.",
            });
        }
        const where = { OR: [] };
        if (marca) {
            where.OR.push({
                marca: {
                    nombre: { equals: String(marca), mode: "insensitive" },
                },
            });
        }
        if (categoria) {
            const nombreCategoria = String(categoria);
            where.OR.push({
                SubSubcategoria: {
                    nombre: { equals: nombreCategoria, mode: "insensitive" },
                },
            }, {
                SubSubcategoria: {
                    subcategoria: {
                        nombre: { equals: nombreCategoria, mode: "insensitive" },
                    },
                },
            });
        }
        const [minPrecio, maxPrecio] = await Promise.all([
            prisma_1.prisma.articulo.aggregate({
                _min: { precioVenta: true },
                where,
            }),
            prisma_1.prisma.articulo.aggregate({
                _max: { precioVenta: true },
                where,
            }),
        ]);
        return res.json({
            min: minPrecio._min.precioVenta ?? 0,
            max: maxPrecio._max.precioVenta ?? 0,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener el rango de precios",
        });
    }
};
exports.getRangoPrecio = getRangoPrecio;
//# sourceMappingURL=articuloController.js.map