import express from 'express'
import { createSubsubcategoria, getAllSubsubcategorias, getSubsubcategoriasBySubCategoriaId, obtenerMarcasBySubsubcategoria, updateEstadoSubsubcategoria, updateSubsubcategoria, } from '../controllers/subsubcategoriasController'
import { authMiddleware } from '../middlewares/auth'

const subsubcategoriaRouter = express.Router()

subsubcategoriaRouter.get("/subsubcategorias/:id", getSubsubcategoriasBySubCategoriaId)
subsubcategoriaRouter.get("/subsubcategorias/marcas/:nombre", obtenerMarcasBySubsubcategoria)
subsubcategoriaRouter.get("/subsubcategorias", authMiddleware, getAllSubsubcategorias)
subsubcategoriaRouter.patch("/subsubcategorias/:id",authMiddleware,updateEstadoSubsubcategoria)
subsubcategoriaRouter.post("/subsubcategorias",authMiddleware,createSubsubcategoria)
subsubcategoriaRouter.put("/subsubcategorias/:id",authMiddleware,updateSubsubcategoria)

export default subsubcategoriaRouter