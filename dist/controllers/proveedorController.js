"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existProveedor = exports.updateEstadoProveedor = exports.getAllProveedores = exports.updateProveedor = exports.createProvedor = void 0;
const prisma_1 = require("../lib/prisma");
const createProvedor = async (req, res) => {
    try {
        const { nombre, ruc, direccion, telefono } = req.body;
        const proveedor = await prisma_1.prisma.proveedor.create({
            data: {
                nombre,
                ruc,
                direccion,
                telefono
            }
        });
        return res.status(201).json(proveedor);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createProvedor = createProvedor;
const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ruc, direccion, telefono } = req.body;
        const updateProveedor = await prisma_1.prisma.proveedor.update({
            where: {
                idProveedor: Number(id)
            },
            data: {
                nombre,
                ruc,
                direccion,
                telefono
            }
        });
        return res.status(200).json(updateProveedor);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateProveedor = updateProveedor;
const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await prisma_1.prisma.proveedor.findMany({
            orderBy: {
                idProveedor: "asc"
            }
        });
        return res.status(200).json(proveedores);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllProveedores = getAllProveedores;
const updateEstadoProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const proveedor = await prisma_1.prisma.proveedor.update({
            where: {
                idProveedor: Number(id)
            },
            data: {
                estado
            }
        });
        return res.status(200).json(proveedor);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateEstadoProveedor = updateEstadoProveedor;
const existProveedor = async (req, res) => {
    try {
        const { ruc } = req.params;
        const { excludeId } = req.query;
        const whereClause = { ruc };
        if (excludeId) {
            whereClause.NOT = { idProveedor: Number(excludeId) };
        }
        const proveedor = await prisma_1.prisma.proveedor.findFirst({
            where: whereClause,
        });
        return res.status(200).json({ existe: !!proveedor });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.existProveedor = existProveedor;
//# sourceMappingURL=proveedorController.js.map