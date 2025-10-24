import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getSubcategoriasByCategoriaId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const subcategorias = await prisma.subcategoria.findMany({
            where: {
                categoriaId: Number(id)
            }
        })
        return res.status(200).json(subcategorias)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getSubsubcategorias = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.params
        console.log(nombre)
        const subsubcategorias = await prisma.subSubcategoria.findMany({
            where: {
                subcategoria: {
                    nombre: {
                        equals: String(nombre)
                    }
                }
            }
            
        })
        return res.status(200).json(subsubcategorias)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}