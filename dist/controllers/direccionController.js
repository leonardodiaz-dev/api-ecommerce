"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEstadoIsPrincipal = exports.deleteDireccion = exports.createDireccion = exports.getAllDireccionByUsuario = void 0;
const prisma_1 = require("../lib/prisma");
const getAllDireccionByUsuario = async (req, res) => {
    try {
        const userId = req.user.id;
        const direcciones = await prisma_1.prisma.direccion.findMany({
            where: {
                usuarioId: Number(userId)
            },
            include: {
                distrito: { include: { provincia: { include: { departamento: true } } } }
            },
            orderBy: {
                idDireccion: "asc"
            }
        });
        const direccionesFormated = direcciones.map(d => ({
            idDireccion: d.idDireccion,
            isPrincipal: d.isPrincipal,
            direccion: d.direccion,
            distrito: d.distrito.nombre,
            departamento: d.distrito.provincia.departamento.nombre
        }));
        return res.status(200).json(direccionesFormated);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getAllDireccionByUsuario = getAllDireccionByUsuario;
const createDireccion = async (req, res) => {
    try {
        const userId = req.user.id;
        const { direccion, distritoId } = req.body;
        const newDireccion = await prisma_1.prisma.direccion.create({
            data: {
                direccion,
                usuarioId: Number(userId),
                distritoId: Number(distritoId)
            }, include: {
                distrito: { include: { provincia: { include: { departamento: true } } } }
            }
        });
        const direccionesFormated = {
            idDireccion: newDireccion.idDireccion,
            direccion: newDireccion.direccion,
            distrito: newDireccion.distrito.nombre,
            departamento: newDireccion.distrito.provincia.departamento.nombre
        };
        return res.status(201).json(direccionesFormated);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createDireccion = createDireccion;
const deleteDireccion = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await prisma_1.prisma.direccion.delete({
            where: {
                idDireccion: Number(id),
                usuarioId: Number(userId)
            }
        });
        return res.status(200).json({ message: "La direccion se elimino correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteDireccion = deleteDireccion;
const updateEstadoIsPrincipal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const direccionPrincipal = await prisma_1.prisma.direccion.findFirst({
            where: {
                isPrincipal: true
            }
        });
        if (direccionPrincipal) {
            await prisma_1.prisma.direccion.update({
                where: {
                    idDireccion: direccionPrincipal.idDireccion
                },
                data: {
                    isPrincipal: false
                }
            });
        }
        await prisma_1.prisma.direccion.update({
            where: {
                idDireccion: Number(id),
                usuarioId: Number(userId)
            },
            data: {
                isPrincipal: true
            }
        });
        return res.status(200).json({ message: 'El estado se actualizo correctamente' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateEstadoIsPrincipal = updateEstadoIsPrincipal;
//# sourceMappingURL=direccionController.js.map