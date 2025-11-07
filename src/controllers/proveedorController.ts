import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createProvedor = async (req: Request, res: Response) => {
    try {
        const { nombre, ruc, direccion, telefono } = req.body

        const proveedor = await prisma.proveedor.create({
            data: {
                nombre,
                ruc,
                direccion,
                telefono
            }
        })
        return res.status(201).json(proveedor)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateProveedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { nombre, ruc, direccion, telefono } = req.body
        const updateProveedor = await prisma.proveedor.update({
            where: {
                idProveedor: Number(id)
            },
            data: {
                nombre,
                ruc,
                direccion,
                telefono
            }
        })
        return res.status(200).json(updateProveedor)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllProveedores = async (req: Request, res: Response) => {

    try {
        const proveedores = await prisma.proveedor.findMany(
            {
                orderBy:{
                    idProveedor:"asc"
                }
            }
        )
        return res.status(200).json(proveedores)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateEstadoProveedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { estado } = req.body

        const proveedor = await prisma.proveedor.update({
            where: {
                idProveedor: Number(id)
            },
            data: {
                estado
            }
        })
        return res.status(200).json(proveedor)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const existProveedor = async (req: Request, res: Response) => {
    try {
        const { ruc } = req.params;
        const { excludeId } = req.query;

        const whereClause: any = { ruc };

        if (excludeId) {
            whereClause.NOT = { idProveedor: Number(excludeId) };
        }

        const proveedor = await prisma.proveedor.findFirst({
            where: whereClause,
        });

        return res.status(200).json({ existe: !!proveedor });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
