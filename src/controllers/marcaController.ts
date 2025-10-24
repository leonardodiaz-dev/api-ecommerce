import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getAllMarcas = async (req: Request, res: Response) => {
    try {
        const marcas = await prisma.marca.findMany()
        return res.status(200).json(marcas)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getSubSubcategoriasByMarca = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.params;

        const subsubcategorias = await prisma.subSubcategoria.findMany({
            where: {
                articulos: {
                    some: {
                        marca: {
                            nombre: {
                                equals: String(nombre),
                                mode: "insensitive",
                            },
                        },
                    },
                },
            },
            distinct: ["nombre"],
            select: {
                idSubSubcategoria: true,
                nombre: true,
            },
        });

        return res.status(200).json(subsubcategorias);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
