import express from 'express'
import { createSubcategoria, getAllSubcategorias, getSubcategoriasByCategoriaId, getSubsubcategorias, updateEstadoSubcategoria, updateSubcategoria} from '../controllers/subCategoriaController'
import { authMiddleware } from '../middlewares/auth'

const subcategoriaRouter = express.Router()

subcategoriaRouter.get("/subcategorias/obtener/:nombre", getSubsubcategorias)
subcategoriaRouter.get("/subcategorias",authMiddleware,getAllSubcategorias)
subcategoriaRouter.post("/subcategorias",authMiddleware,createSubcategoria)
subcategoriaRouter.put("/subcategorias/:id",authMiddleware,updateSubcategoria)
subcategoriaRouter.get("/subcategorias/:id",getSubcategoriasByCategoriaId)
subcategoriaRouter.patch("/subcategorias/:id",authMiddleware,updateEstadoSubcategoria)

export default subcategoriaRouter