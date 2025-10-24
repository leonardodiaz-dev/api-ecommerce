import express from 'express'
import { createGenero, getAllGeneros } from '../controllers/generoController'

const generoRouter = express.Router()

generoRouter.get("/generos",getAllGeneros)
generoRouter.post("/generos",createGenero)

export default generoRouter