import express from 'express'
import { createCategoria, getAllCategorias, listCategoriasWithSubCategorias, updateCategoria, updateEstadoCategoria } from '../controllers/categoriaController'
import { authMiddleware } from '../middlewares/auth'

const categoriaRouter = express.Router()

categoriaRouter.put("/categorias/:id",authMiddleware,updateCategoria)
categoriaRouter.get("/categorias", getAllCategorias)
categoriaRouter.get("/categorias", authMiddleware, createCategoria)
categoriaRouter.get("/categorias/subcategorias", listCategoriasWithSubCategorias)
categoriaRouter.patch("/categorias/:id",authMiddleware,updateEstadoCategoria)

export default categoriaRouter