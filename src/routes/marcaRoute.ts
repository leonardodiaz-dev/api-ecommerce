import express from 'express'
import { createMarca, getAllMarcas, getSubSubcategoriasByMarca } from '../controllers/marcaController'

const marcaRouter = express.Router()

marcaRouter.get("/marcas",getAllMarcas)
marcaRouter.post("/marcas",createMarca)
marcaRouter.get("/marcas/:nombre/subsubcategorias",getSubSubcategoriasByMarca)

export default marcaRouter