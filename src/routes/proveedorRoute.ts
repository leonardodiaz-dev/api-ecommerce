import express from 'express'
import { authMiddleware } from '../middlewares/auth'
import { createProvedor, existProveedor, getAllProveedores, updateProveedor } from '../controllers/proveedorController'

const proveedorRouter = express.Router()

proveedorRouter.get("/proveedores",authMiddleware,getAllProveedores)
proveedorRouter.post("/proveedores",authMiddleware,createProvedor)
proveedorRouter.put("/proveedores/:id",authMiddleware,updateProveedor)
proveedorRouter.get("/proveedores/exist/:ruc",existProveedor)

export default proveedorRouter