import express from 'express'
import { createDireccion, deleteDireccion, getAllDireccionByUsuario, updateEstadoIsPrincipal } from '../controllers/direccionController'
import { authMiddleware } from '../middlewares/auth'

const direccionRouter = express.Router()

direccionRouter.get("/direcciones", authMiddleware, getAllDireccionByUsuario)
direccionRouter.patch("/direcciones/:id",authMiddleware,updateEstadoIsPrincipal)
direccionRouter.post("/direcciones", authMiddleware, createDireccion)
direccionRouter.delete("/direcciones/:id", authMiddleware, deleteDireccion)

export default direccionRouter