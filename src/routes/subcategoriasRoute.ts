import express from 'express'
import { getSubcategoriasByCategoriaId, getSubsubcategorias} from '../controllers/subCategoriaController'

const subcategoriaRouter = express.Router()

subcategoriaRouter.get("/subcategorias/obtener/:nombre", getSubsubcategorias)
subcategoriaRouter.get("/subcategorias/:id",getSubcategoriasByCategoriaId)

export default subcategoriaRouter