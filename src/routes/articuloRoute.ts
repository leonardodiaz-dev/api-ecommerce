import express from 'express'
import { createArticulo, getArticuloById, getArticuloBySlug, getArticulos, getRangoPrecio, listarArticulos, updateArticulo, updateEstadoArticulo } from '../controllers/articuloController'
import { authMiddleware } from '../middlewares/auth'
import { upload } from '../middlewares/upload'
import { buscarResultados } from '../controllers/busquedaController'

const articuloRouter = express.Router()

articuloRouter.get("/articulos/search",getArticulos)
articuloRouter.get("/articulos/rango-precio",getRangoPrecio)
articuloRouter.get("/articulos/busqueda",buscarResultados)
articuloRouter.get("/articulos/slug/:slug",getArticuloBySlug)
articuloRouter.get("/articulos/:id",getArticuloById)
articuloRouter.put("/articulos/:id",upload.single("imagen"),updateArticulo)
articuloRouter.get("/articulos",listarArticulos)
articuloRouter.post("/articulos",authMiddleware,upload.single("imagen"),createArticulo)
articuloRouter.patch("/articulos/:id",authMiddleware,updateEstadoArticulo)

export default articuloRouter