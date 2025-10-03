import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createArticulos = async (req: Request, res: Response) => {
    try {
        const {
            codigo,
            nombre,
            generoId,
            precioVenta,
            marcaId,
            subSubcategoriaId } = req.body

        const newArticulo = await prisma.articulo.create({
            data: {
                codigo,
                nombre,
                precioVenta,
                marcaId,
                subSubcategoriaId,
                generoId
            }
        })
        return res.status(201).json(newArticulo)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const listarArticulos = async (req: Request, res: Response) => {

    try {
        const articulos = await prisma.articulo.findMany()

        return res.status(200).json(articulos)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }

}