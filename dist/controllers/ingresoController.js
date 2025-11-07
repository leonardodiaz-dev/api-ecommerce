"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIngresos = exports.createIngreso = void 0;
const prisma_1 = require("../lib/prisma");
const createIngreso = async (req, res) => {
    try {
        const { proveedorId, detalles } = req.body;
        if (!proveedorId || !Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({ message: "Proveedor y detalles son obligatorios" });
        }
        const newIngreso = await prisma_1.prisma.ingreso.create({
            data: {
                proveedorId: Number(proveedorId),
                detalles: {
                    create: detalles.map((d) => ({
                        cantidad: d.cantidad,
                        varianteId: d.varianteId,
                    })),
                },
            },
            include: {
                proveedor: true,
                detalles: {
                    include: {
                        variante: {
                            include: {
                                color: true,
                                talla: true
                            }
                        }
                    },
                },
            },
        });
        await prisma_1.prisma.$transaction(detalles.map((d) => prisma_1.prisma.variante.update({
            where: { idVariante: d.varianteId },
            data: { stock: { increment: Number(d.cantidad) } },
        })));
        return res.status(201).json(newIngreso);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createIngreso = createIngreso;
const getAllIngresos = async (req, res) => {
    try {
        const ingresos = await prisma_1.prisma.detalleIngreso.findMany({
            include: {
                variante: { include: { articulo: true, color: true, talla: true } }
            }
        });
        return res.status(200).json(ingresos);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllIngresos = getAllIngresos;
//# sourceMappingURL=ingresoController.js.map