import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {

    try {
        const { nombre, apellido, email, dni, contrasena, rolNombre, telefono } = req.body
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const rol = await prisma.rol.findFirst({
            where: { nombre: rolNombre },
        });

        if (rol) {
            const newUser = await prisma.usuario.create({
                data: {
                    nombre,
                    apellido,
                    email,
                    dni,
                    telefono,
                    contrasena: hashedPassword,
                    rolId: rol.idRol
                }
            })
            const user = {
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                email: newUser.email,
                dni: newUser.dni,
                telefono: newUser.telefono,
                contrasena
            }
            return res.status(201).json(user)
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateAuthenticatedUser = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const { nombre, apellido, dni, email, telefono } = req.body;

    try {
        const updatedUser = await prisma.usuario.update({
            where: { idUsuario: userId },
            data: { nombre, apellido, dni, email, telefono },
            include: { rol: true }
        });

        const user = {
            idUsuario: updatedUser.idUsuario,
            nombre: updatedUser.nombre,
            apellido: updatedUser.apellido,
            dni: updatedUser.dni,
            telefono: updatedUser.telefono,
            email: updatedUser.email,
            rol: updatedUser.rol
        }

        return res.json(user)
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { contrasena_actual, nueva_contrasena } = req.body;

    if (!contrasena_actual || !nueva_contrasena) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { idUsuario: parseInt(userId) },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contrasena_actual, usuario.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);

    await prisma.usuario.update({
      where: { idUsuario: parseInt(userId) },
      data: {
        contrasena: hashedPassword,
      },
    });

    return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const listUsuarios = async (req: Request, res: Response) => {

    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                idUsuario: true,
                nombre: true,
                apellido: true,
                dni: true,
                email: true,
                telefono: true,
                rol: {
                    select: {
                        nombre: true
                    }
                }
            },
        })
        return res.status(200).json(usuarios)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}