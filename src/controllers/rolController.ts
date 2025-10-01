import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createRol = async (req: Request, res: Response) => {

    try {
        const { nombre } = req.body

        const newRol = await prisma.rol.create({
            data: {
                nombre
            }
        })
        return res.status(201).json(newRol)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }

}