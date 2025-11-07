"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distritoRouter = void 0;
const express_1 = __importDefault(require("express"));
const distritoController_1 = require("../controllers/distritoController");
exports.distritoRouter = express_1.default.Router();
exports.distritoRouter.get('/distritos/:id', distritoController_1.getDistritosByProvincia);
//# sourceMappingURL=distritoRoute.js.map