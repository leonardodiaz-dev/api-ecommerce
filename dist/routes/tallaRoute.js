"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tallaController_1 = require("../controllers/tallaController");
const tallaRouter = express_1.default.Router();
tallaRouter.get("/tallas", tallaController_1.getAllTallas);
tallaRouter.post("/tallas", tallaController_1.createTalla);
exports.default = tallaRouter;
//# sourceMappingURL=tallaRoute.js.map