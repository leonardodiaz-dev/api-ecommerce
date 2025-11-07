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

export const createSubcategoria = async (req: Request, res: Response) => {
    try {
        const { nombre, categoriaId } = req.body

        const subcategoria = await prisma.subcategoria.create({
            data: {
                nombre,
                categoriaId: Number(categoriaId)
            },
            include: {
                categoria: true
            }
        })
        return res.status(201).json(subcategoria)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateSubcategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { nombre, categoriaId, estado } = req.body

        const updateSubcategoria = await prisma.subcategoria.update({
            where: {
                idSubcategoria: Number(id)
            },
            data: {
                nombre,
                estado,
                categoriaId: Number(categoriaId)
            },
            include: {
                categoria: true
            }
        })
        return res.status(200).json(updateSubcategoria)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateEstadoSubcategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { estado } = req.body

        const subcategoria = await prisma.subcategoria.update({
            where: {
                idSubcategoria: Number(id)
            },
            data: {
                estado
            }
        })
        return res.status(200).json(subcategoria)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllSubcategorias = async (req: Request, res: Response) => {
    try {
        const subcategorias = await prisma.subcategoria.findMany({
            include: {
                categoria: true
            },
            orderBy: {
                idSubcategoria: "asc"
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