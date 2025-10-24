import express from 'express'
import { authMiddleware } from '../middlewares/auth'
import { createIngreso, getAllIngresos } from '../controllers/ingresoController'

const ingresoRouter = express.Router()

ingresoRouter.get("/ingresos",authMiddleware,getAllIngresos)
ingresoRouter.post("/ingresos",authMiddleware,createIngreso)

export default ingresoRouter