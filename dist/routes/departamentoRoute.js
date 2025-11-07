"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departamentoRouter = void 0;
const express_1 = __importDefault(require("express"));
const departamentoController_1 = require("../controllers/departamentoController");
exports.departamentoRouter = express_1.default.Router();
exports.departamentoRouter.get('/departamentos', departamentoController_1.getAllDepartamentos);
//# sourceMappingURL=departamentoRoute.js.map