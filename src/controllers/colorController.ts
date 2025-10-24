import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createColor = async (req: Request, res: Response) => {

    try {
        const { nombre, codigoHex } = req.body
        const newColor = await prisma.color.create({
            data: {
                nombre,
                codigoHex
            }
        })
        return res.status(201).json(newColor)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllColores = async (req: Request, res: Response) => {
    try {
         const colores = await prisma.color.findMany()
         return res.status(200).json(colores)
    } catch (error) {
         if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}