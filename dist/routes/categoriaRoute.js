"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriaController_1 = require("../controllers/categoriaController");
const auth_1 = require("../middlewares/auth");
const categoriaRouter = express_1.default.Router();
categoriaRouter.put("/categorias/:id", auth_1.authMiddleware, categoriaController_1.updateCategoria);
categoriaRouter.get("/categorias", categoriaController_1.getAllCategorias);
categoriaRouter.get("/categorias", auth_1.authMiddleware, categoriaController_1.createCategoria);
categoriaRouter.get("/categorias/subcategorias", categoriaController_1.listCategoriasWithSubCategorias);
categoriaRouter.patch("/categorias/:id", auth_1.authMiddleware, categoriaController_1.updateEstadoCategoria);
exports.default = categoriaRouter;
//# sourceMappingURL=categoriaRoute.js.map