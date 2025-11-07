import express from "express";
import { getDistritosByProvincia } from "../controllers/distritoController";

export const distritoRouter = express.Router()

distritoRouter.get('/distritos/:id',getDistritosByProvincia)
