import express from 'express'
import { getAllCategorias, listCategoriasWithSubCategorias } from '../controllers/categoriaController'

const categoriaRouter = express.Router()

categoriaRouter.get("/categorias",getAllCategorias)
categoriaRouter.get("/categorias/subcategorias",listCategoriasWithSubCategorias)

export default categoriaRouter