import express from 'express'
import { createRol } from '../controllers/rolController'

const rolRoute = express.Router()

rolRoute.post("/roles",createRol)

export default rolRoute