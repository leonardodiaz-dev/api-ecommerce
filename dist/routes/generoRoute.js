"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generoController_1 = require("../controllers/generoController");
const generoRouter = express_1.default.Router();
generoRouter.get("/generos", generoController_1.getAllGeneros);
generoRouter.post("/generos", generoController_1.createGenero);
exports.default = generoRouter;
//# sourceMappingURL=generoRoute.js.map