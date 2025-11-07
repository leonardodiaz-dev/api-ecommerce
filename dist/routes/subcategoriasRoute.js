"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoriaController_1 = require("../controllers/subCategoriaController");
const auth_1 = require("../middlewares/auth");
const subcategoriaRouter = express_1.default.Router();
subcategoriaRouter.get("/subcategorias/obtener/:nombre", subCategoriaController_1.getSubsubcategorias);
subcategoriaRouter.get("/subcategorias", auth_1.authMiddleware, subCategoriaController_1.getAllSubcategorias);
subcategoriaRouter.post("/subcategorias", auth_1.authMiddleware, subCategoriaController_1.createSubcategoria);
subcategoriaRouter.put("/subcategorias/:id", auth_1.authMiddleware, subCategoriaController_1.updateSubcategoria);
subcategoriaRouter.get("/subcategorias/:id", subCategoriaController_1.getSubcategoriasByCategoriaId);
subcategoriaRouter.patch("/subcategorias/:id", auth_1.authMiddleware, subCategoriaController_1.updateEstadoSubcategoria);
exports.default = subcategoriaRouter;
//# sourceMappingURL=subcategoriasRoute.js.map