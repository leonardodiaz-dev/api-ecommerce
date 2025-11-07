"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const varianteController_1 = require("../controllers/varianteController");
const varianteRouter = express_1.default.Router();
varianteRouter.get("/variantes/buscar", varianteController_1.buscarVariante);
exports.default = varianteRouter;
//# sourceMappingURL=varianteRoute.js.map