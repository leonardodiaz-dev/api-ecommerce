import express from 'express'
import { createUser, listUsuarios, updateAuthenticatedUser, updatePassword } from '../controllers/usuarioController'
import { loginUser } from '../controllers/authController'
import { authMiddleware } from '../middlewares/auth'

const usuarioRouter = express.Router()

usuarioRouter.get("/usuarios", authMiddleware, listUsuarios)
usuarioRouter.post("/usuarios", createUser)
usuarioRouter.post("/login", loginUser)
usuarioRouter.put("/usuarios",authMiddleware,updateAuthenticatedUser)
usuarioRouter.put("/usuarios/password",authMiddleware,updatePassword)

export default usuarioRouter
