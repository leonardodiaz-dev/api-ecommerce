import express from 'express'
import { createSession, webhook } from '../controllers/stripeController'
import { authMiddleware } from '../middlewares/auth'
const stripeRoute = express.Router()

stripeRoute.post("/stripe/create-checkout-session", authMiddleware, createSession);
stripeRoute.post('/stripe/webhook', webhook)

export default stripeRoute