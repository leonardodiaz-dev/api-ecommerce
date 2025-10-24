import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createTalla = async (req: Request, res: Response) => {

    try {
        const { nombre, tipo } = req.body
        const talla = await prisma.talla.create({
            data: {
                nombre,
                tipo
            }
        })
        return res.status(201).json(talla)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllTallas = async (req: Request, res: Response) => {
    try {
        const tallas = await prisma.talla.findMany()
        return res.status(200).json(tallas)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}