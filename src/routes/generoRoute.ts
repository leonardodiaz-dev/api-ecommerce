import express from 'express'
import { createGenero, getAllGeneros, listarGenerosPorCategoria } from '../controllers/generoController'

const generoRouter = express.Router()

generoRouter.get("/generos",getAllGeneros)
generoRouter.get("/generos/categoria",listarGenerosPorCategoria)
generoRouter.post("/generos",createGenero)

export default generoRouter