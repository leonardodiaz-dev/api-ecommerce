"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marcaController_1 = require("../controllers/marcaController");
const marcaRouter = express_1.default.Router();
marcaRouter.get("/marcas", marcaController_1.getAllMarcas);
marcaRouter.get("/marcas/:nombre/subsubcategorias", marcaController_1.getSubSubcategoriasByMarca);
exports.default = marcaRouter;
//# sourceMappingURL=marcaRoute.js.map