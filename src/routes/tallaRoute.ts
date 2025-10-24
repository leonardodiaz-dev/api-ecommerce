import express from 'express'
import { createTalla, getAllTallas } from '../controllers/tallaController'

const tallaRouter = express.Router()

tallaRouter.get("/tallas",getAllTallas)
tallaRouter.post("/tallas",createTalla)

export default tallaRouter
