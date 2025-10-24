import express from 'express'
import { createColor, getAllColores } from '../controllers/colorController'

const colorRouter = express.Router()

colorRouter.get("/colores",getAllColores)
colorRouter.post("/colores",createColor)

export default colorRouter