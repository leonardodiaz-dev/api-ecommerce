import express from 'express'
import { getAllMarcas, getSubSubcategoriasByMarca } from '../controllers/marcaController'

const marcaRouter = express.Router()

marcaRouter.get("/marcas",getAllMarcas)
marcaRouter.get("/marcas/:nombre/subsubcategorias",getSubSubcategoriasByMarca)

export default marcaRouter