import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createGenero = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body
        const newGenero = await prisma.genero.create({
            data: {
                nombre
            }
        })
        return res.status(201).json(newGenero)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllGeneros = async (req: Request, res: Response) => {
    try {
        const generos = await prisma.genero.findMany()
        return res.status(200).json(generos)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}