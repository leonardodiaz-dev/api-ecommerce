import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getSubsubcategoriasBySubCategoriaId = async (req: Request, res: Response) => {

  try {
    const { id } = req.params

    const subsubcategorias = await prisma.subSubcategoria.findMany({
      where: {
        subcategoriaId: Number(id)
      }
    })
    return res.status(200).json(subsubcategorias)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const createSubsubcategoria = async (req: Request, res: Response) => {
  try {
    const { nombre, subcategoriaId } = req.body

    const subsubcategoria = await prisma.subSubcategoria.create({
      data: {
        nombre,
        subcategoriaId: Number(subcategoriaId)
      },
      include: {
        subcategoria: true
      }
    })
    return res.status(201).json(subsubcategoria)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const updateSubsubcategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { nombre, subcategoriaId, estado } = req.body

        const updateSubsubcategoria = await prisma.subSubcategoria.update({
            where: {
                idSubSubcategoria: Number(id)
            },
            data: {
                nombre,
                estado,
                subcategoriaId: Number(subcategoriaId)
            },
            include: {
                subcategoria: true
            }
        })
        return res.status(200).json(updateSubsubcategoria)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllSubsubcategorias = async (req: Request, res: Response) => {
  try {
    const subsubcategorias = await prisma.subSubcategoria.findMany({
      include: {
        subcategoria: true
      },
      orderBy: {
        idSubSubcategoria: "asc"
      }
    })
    return res.status(200).json(subsubcategorias)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const updateEstadoSubsubcategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { estado } = req.body

    const subsubcategoria = await prisma.subSubcategoria.update({
      where: {
        idSubSubcategoria: Number(id)
      },
      data: {
        estado
      }
    })
    return res.status(200).json(subsubcategoria)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const obtenerMarcasBySubsubcategoria = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const marcas = await prisma.marca.findMany({
      where: {
        articulos: {
          some: {
            OR: [
              {
                SubSubcategoria: {
                  nombre: {
                    equals: String(nombre),
                  },
                },
              },
              {
                SubSubcategoria: {
                  subcategoria: {
                    nombre: {
                      equals: String(nombre),
                    },
                  },
                },
              },
            ],
          },
        },
      },
      select: {
        idMarca: true,
        nombre: true,
      },
      distinct: ["nombre"],
    });

    return res.status(200).json(marcas);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

