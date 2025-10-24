import express from 'express'
import { buscarVariante } from '../controllers/varianteController'

const varianteRouter = express.Router()

varianteRouter.get("/variantes/buscar",buscarVariante)

export default varianteRouter