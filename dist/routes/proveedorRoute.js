"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const proveedorController_1 = require("../controllers/proveedorController");
const proveedorRouter = express_1.default.Router();
proveedorRouter.get("/proveedores", auth_1.authMiddleware, proveedorController_1.getAllProveedores);
proveedorRouter.post("/proveedores", auth_1.authMiddleware, proveedorController_1.createProvedor);
proveedorRouter.put("/proveedores/:id", auth_1.authMiddleware, proveedorController_1.updateProveedor);
proveedorRouter.get("/proveedores/exist/:ruc", proveedorController_1.existProveedor);
proveedorRouter.patch("/proveedores/:id", auth_1.authMiddleware, proveedorController_1.updateEstadoProveedor);
exports.default = proveedorRouter;
//# sourceMappingURL=proveedorRoute.js.map