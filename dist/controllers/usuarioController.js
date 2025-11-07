"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsuarios = exports.updatePassword = exports.updateAuthenticatedUser = exports.createUser = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (req, res) => {
    try {
        const { nombre, apellido, email, dni, contrasena, rolNombre, telefono } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(contrasena, 10);
        const rol = await prisma_1.prisma.rol.findFirst({
            where: { nombre: rolNombre },
        });
        if (rol) {
            const newUser = await prisma_1.prisma.usuario.create({
                data: {
                    nombre,
                    apellido,
                    email,
                    dni,
                    telefono,
                    contrasena: hashedPassword,
                    rolId: rol.idRol
                }
            });
            const user = {
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                email: newUser.email,
                dni: newUser.dni,
                telefono: newUser.telefono,
                contrasena
            };
            return res.status(201).json(user);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createUser = createUser;
const updateAuthenticatedUser = async (req, res) => {
    const userId = req.user.id;
    const { nombre, apellido, dni, email, telefono } = req.body;
    try {
        const updatedUser = await prisma_1.prisma.usuario.update({
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
        };
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al actualizar usuario" });
    }
};
exports.updateAuthenticatedUser = updateAuthenticatedUser;
const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { contrasena_actual, nueva_contrasena } = req.body;
        if (!contrasena_actual || !nueva_contrasena) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: { idUsuario: parseInt(userId) },
        });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt_1.default.compare(contrasena_actual, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña actual incorrecta" });
        }
        const hashedPassword = await bcrypt_1.default.hash(nueva_contrasena, 10);
        await prisma_1.prisma.usuario.update({
            where: { idUsuario: parseInt(userId) },
            data: {
                contrasena: hashedPassword,
            },
        });
        return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updatePassword = updatePassword;
const listUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma_1.prisma.usuario.findMany({
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
        });
        return res.status(200).json(usuarios);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.listUsuarios = listUsuarios;
//# sourceMappingURL=usuarioController.js.map