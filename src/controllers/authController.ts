import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const expiresIn = "1h";
    const expiresInSeconds = 60 * 60; 
    const expirationDate = Math.floor(Date.now() / 1000) + expiresInSeconds;

    const token = jwt.sign(
      { id: usuario.idUsuario, email: usuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn }
    );

    return res.json({
      message: "Login exitoso",
      token,
      expiresAt: expirationDate,
      user: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellidos: usuario.apellido,
        dni:usuario.dni,
        telefono:usuario.telefono,
        email: usuario.email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

