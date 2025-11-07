"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripeController_1 = require("../controllers/stripeController");
const auth_1 = require("../middlewares/auth");
const stripeRoute = express_1.default.Router();
stripeRoute.post("/stripe/create-checkout-session", auth_1.authMiddleware, stripeController_1.createSession);
stripeRoute.post('/stripe/webhook', stripeController_1.webhook);
exports.default = stripeRoute;
//# sourceMappingURL=stripeRoute.js.map