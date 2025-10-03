import express from 'express'
import { createArticulos, listarArticulos } from '../controllers/articuloController'

const articuloRouter = express.Router()

articuloRouter.get("/articulos",listarArticulos)
articuloRouter.post("/articulos",createArticulos)

export default articuloRouter