"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rolController_1 = require("../controllers/rolController");
const rolRoute = express_1.default.Router();
rolRoute.post("/roles", rolController_1.createRol);
exports.default = rolRoute;
//# sourceMappingURL=rolRoute.js.map