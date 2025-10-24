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
                rol:{
                    select:{
                        nombre:true
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