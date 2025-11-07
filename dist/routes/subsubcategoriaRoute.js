"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subsubcategoriasController_1 = require("../controllers/subsubcategoriasController");
const auth_1 = require("../middlewares/auth");
const subsubcategoriaRouter = express_1.default.Router();
subsubcategoriaRouter.get("/subsubcategorias/:id", subsubcategoriasController_1.getSubsubcategoriasBySubCategoriaId);
subsubcategoriaRouter.get("/subsubcategorias/marcas/:nombre", subsubcategoriasController_1.obtenerMarcasBySubsubcategoria);
subsubcategoriaRouter.get("/subsubcategorias", auth_1.authMiddleware, subsubcategoriasController_1.getAllSubsubcategorias);
subsubcategoriaRouter.patch("/subsubcategorias/:id", auth_1.authMiddleware, subsubcategoriasController_1.updateEstadoSubsubcategoria);
subsubcategoriaRouter.post("/subsubcategorias", auth_1.authMiddleware, subsubcategoriasController_1.createSubsubcategoria);
subsubcategoriaRouter.put("/subsubcategorias/:id", auth_1.authMiddleware, subsubcategoriasController_1.updateSubsubcategoria);
exports.default = subsubcategoriaRouter;
//# sourceMappingURL=subsubcategoriaRoute.js.map