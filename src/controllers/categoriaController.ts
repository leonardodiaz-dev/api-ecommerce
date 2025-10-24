import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const listCategoriasWithSubCategorias = async (req: Request, res: Response) => {

    try {
        const categorias = await prisma.categoria.findMany({
            select: {
                idCategoria: true,
                nombre: true,
                subcategorias: {
                    select: {
                        idSubcategoria: true,
                        nombre: true,
                        subsubcategorias: {
                            select: {
                                idSubSubcategoria: true,
                                nombre: true
                            }
                        }
                    }
                }
            }
        })
        return res.status(200).json(categorias)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllCategorias = async (req: Request, res: Response) => {
    try {
        const categorias = await prisma.categoria.findMany()
        return res.status(200).json(categorias)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}