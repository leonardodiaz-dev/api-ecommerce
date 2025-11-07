"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articuloController_1 = require("../controllers/articuloController");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const busquedaController_1 = require("../controllers/busquedaController");
const articuloRouter = express_1.default.Router();
articuloRouter.get("/articulos/search", articuloController_1.getArticulos);
articuloRouter.get("/articulos/rango-precio", articuloController_1.getRangoPrecio);
articuloRouter.get("/articulos/busqueda", busquedaController_1.buscarResultados);
articuloRouter.get("/articulos/slug/:slug", articuloController_1.getArticuloBySlug);
articuloRouter.get("/articulos/:id", articuloController_1.getArticuloById);
articuloRouter.put("/articulos/:id", upload_1.upload.single("imagen"), articuloController_1.updateArticulo);
articuloRouter.get("/articulos", articuloController_1.listarArticulos);
articuloRouter.post("/articulos", auth_1.authMiddleware, upload_1.upload.single("imagen"), articuloController_1.createArticulo);
articuloRouter.patch("/articulos/:id", auth_1.authMiddleware, articuloController_1.updateEstadoArticulo);
exports.default = articuloRouter;
//# sourceMappingURL=articuloRoute.js.map