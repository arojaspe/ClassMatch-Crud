"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Server_1 = __importDefault(require("./Server"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:5173",
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.json();
});
const serv = new Server_1.default();
serv.listen();
