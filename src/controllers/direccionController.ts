import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getAllDireccionByUsuario = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const direcciones = await prisma.direccion.findMany({
            where: {
                usuarioId: Number(userId)
            },
            include: {
                distrito: { include: { provincia: { include: { departamento: true } } } }
            },
            orderBy: {
                idDireccion: "asc"
            }
        })
        const direccionesFormated = direcciones.map(d =>
        ({
            idDireccion: d.idDireccion,
            isPrincipal: d.isPrincipal,
            direccion: d.direccion,
            distrito: d.distrito.nombre,
            departamento: d.distrito.provincia.departamento.nombre
        }))
        return res.status(200).json(direccionesFormated)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const createDireccion = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const { direccion, distritoId } = req.body

        const newDireccion = await prisma.direccion.create({
            data: {
                direccion,
                usuarioId: Number(userId),
                distritoId: Number(distritoId)
            }, include: {
                distrito: { include: { provincia: { include: { departamento: true } } } }
            }

        })
        const direccionesFormated = {
            idDireccion: newDireccion.idDireccion,
            direccion: newDireccion.direccion,
            distrito: newDireccion.distrito.nombre,
            departamento: newDireccion.distrito.provincia.departamento.nombre
        }
        return res.status(201).json(direccionesFormated)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteDireccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = (req as any).user.id;
        await prisma.direccion.delete({
            where: {
                idDireccion: Number(id),
                usuarioId: Number(userId)
            }
        })
        return res.status(200).json({ message: "La direccion se elimino correctamente" })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateEstadoIsPrincipal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = (req as any).user.id;

        const direccionPrincipal = await prisma.direccion.findFirst({
            where: {
                isPrincipal: true
            }
        })
        if (direccionPrincipal) {
            await prisma.direccion.update({
                where: {
                    idDireccion: direccionPrincipal.idDireccion
                },
                data: {
                    isPrincipal: false
                }
            })
        }
        await prisma.direccion.update({
            where: {
                idDireccion: Number(id),
                usuarioId: Number(userId)
            },
            data: {
                isPrincipal: true
            }
        })
        return res.status(200).json({ message: 'El estado se actualizo correctamente' })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}