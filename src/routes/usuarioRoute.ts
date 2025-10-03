import express from 'express'
import { createUser, listUsuarios } from '../controllers/usuarioController'
import { loginUser } from '../controllers/authController'

const usuarioRouter = express.Router()

usuarioRouter.get("/usuarios",listUsuarios)
usuarioRouter.post("/usuarios",createUser)
usuarioRouter.post("/login",loginUser)

export default usuarioRouter
