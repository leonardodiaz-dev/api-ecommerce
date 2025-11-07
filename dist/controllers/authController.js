"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: { email },
            include: {
                rol: true
            }
        });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt_1.default.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const expiresIn = "1h";
        const expiresInSeconds = 60 * 60;
        const expirationDate = Math.floor(Date.now() / 1000) + expiresInSeconds;
        const token = jsonwebtoken_1.default.sign({ id: usuario.idUsuario, email: usuario.email }, process.env.JWT_SECRET, { expiresIn });
        return res.json({
            message: "Login exitoso",
            token,
            expiresAt: expirationDate,
            user: {
                idUsuario: usuario.idUsuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                dni: usuario.dni,
                telefono: usuario.telefono,
                email: usuario.email,
                rol: usuario.rol
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map