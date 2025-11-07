"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const ingresoController_1 = require("../controllers/ingresoController");
const ingresoRouter = express_1.default.Router();
ingresoRouter.get("/ingresos", auth_1.authMiddleware, ingresoController_1.getAllIngresos);
ingresoRouter.post("/ingresos", auth_1.authMiddleware, ingresoController_1.createIngreso);
exports.default = ingresoRouter;
//# sourceMappingURL=ingresoRoute.js.map