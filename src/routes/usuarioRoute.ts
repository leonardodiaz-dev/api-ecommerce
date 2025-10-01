import express from 'express'
import { createUser } from '../controllers/usuarioController'

const usuarioRouter = express.Router()

usuarioRouter.post("/usuarios",createUser)

export default usuarioRouter
