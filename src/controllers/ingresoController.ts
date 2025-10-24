import { DetalleIngreso, Variante } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createIngreso = async (req: Request, res: Response) => {
    try {
        const { proveedorId, detalles } = req.body;

        if (!proveedorId || !Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({ message: "Proveedor y detalles son obligatorios" });
        }

        const newIngreso = await prisma.ingreso.create({
            data: {
                proveedorId: Number(proveedorId),
                detalles: {
                    create: detalles.map((d: DetalleIngreso) => ({
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

        await prisma.$transaction(
            detalles.map((d: DetalleIngreso) =>
                prisma.variante.update({
                    where: { idVariante: d.varianteId },
                    data: { stock: { increment: Number(d.cantidad) } },
                })
            )
        );


        return res.status(201).json(newIngreso);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};


export const getAllIngresos = async (req: Request, res: Response) => {
    try {
        const ingresos = await prisma.detalleIngreso.findMany(
            {
                include: {
                    variante: { include: { articulo: true, color: true, talla: true } }
                }
            }
        )
        return res.status(200).json(ingresos)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}