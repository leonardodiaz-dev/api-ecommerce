"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colorController_1 = require("../controllers/colorController");
const colorRouter = express_1.default.Router();
colorRouter.get("/colores", colorController_1.getAllColores);
colorRouter.post("/colores", colorController_1.createColor);
exports.default = colorRouter;
//# sourceMappingURL=colorRoute.js.map