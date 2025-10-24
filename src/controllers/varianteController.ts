import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const buscarVariante = async (req: Request, res: Response) => {
    try {
        const { codigo } = req.query;

        const variantes = await prisma.variante.findMany({
            where: {
                articulo: {
                    codigo: String(codigo),
                },
            },
            select: {
                idVariante:true,
                articulo: {
                    select: { codigo: true, nombre: true },
                },
                color: {
                    select: { nombre: true },
                },
                talla: {
                    select: { nombre: true },
                },
                stock: true,
            },
        });

        return res.status(200).json(variantes);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
