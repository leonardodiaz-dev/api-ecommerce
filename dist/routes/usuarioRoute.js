"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioController_1 = require("../controllers/usuarioController");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const usuarioRouter = express_1.default.Router();
usuarioRouter.get("/usuarios", auth_1.authMiddleware, usuarioController_1.listUsuarios);
usuarioRouter.post("/usuarios", usuarioController_1.createUser);
usuarioRouter.post("/login", authController_1.loginUser);
usuarioRouter.put("/usuarios", auth_1.authMiddleware, usuarioController_1.updateAuthenticatedUser);
usuarioRouter.put("/usuarios/password", auth_1.authMiddleware, usuarioController_1.updatePassword);
exports.default = usuarioRouter;
//# sourceMappingURL=usuarioRoute.js.map