import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getDistritosByProvincia = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const distritos = await prisma.distrito.findMany({
            where: {
                provinciaId: Number(id)
            }
        })
        return res.json(distritos)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
