"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const direccionController_1 = require("../controllers/direccionController");
const auth_1 = require("../middlewares/auth");
const direccionRouter = express_1.default.Router();
direccionRouter.get("/direcciones", auth_1.authMiddleware, direccionController_1.getAllDireccionByUsuario);
direccionRouter.patch("/direcciones/:id", auth_1.authMiddleware, direccionController_1.updateEstadoIsPrincipal);
direccionRouter.post("/direcciones", auth_1.authMiddleware, direccionController_1.createDireccion);
direccionRouter.delete("/direcciones/:id", auth_1.authMiddleware, direccionController_1.deleteDireccion);
exports.default = direccionRouter;
//# sourceMappingURL=direccionRoute.js.map