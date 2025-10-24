import express from 'express'
import subcategoriaRouter from './subcategoriasRoute'
import { getSubsubcategoriasBySubCategoriaId, obtenerMarcasBySubsubcategoria, } from '../controllers/subsubcategoriasController'

const subsubcategoriaRouter = express.Router()

subcategoriaRouter.get("/subsubcategorias/:id",getSubsubcategoriasBySubCategoriaId)
subcategoriaRouter.get("/subsubcategorias/marcas/:nombre",obtenerMarcasBySubsubcategoria)

export default subsubcategoriaRouter