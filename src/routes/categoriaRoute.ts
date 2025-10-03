import express from 'express'
import { listCategorias } from '../controllers/categoriaController'

const categoriaRouter = express.Router()

categoriaRouter.get("/categorias",listCategorias)

export default categoriaRouter