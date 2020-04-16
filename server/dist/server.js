"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const params_1 = require("./params");
const proxy_1 = require("./proxy");
const app = express_1.default();
const PORT = process.env.PORT || 8080;
app.enable('trust proxy');
app.get('/', params_1.params, proxy_1.proxy);
app.get('/favicon.ico', (rq, rs) => rs.status(204).end);
app.listen(PORT, () => console.log(`Listening to ${PORT}`));
