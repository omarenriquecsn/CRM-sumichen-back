"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
dotenv_1.default.config();
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Acceso denegado' });
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret)
        return res.status(500).json({ error: 'Error de clave secreta' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Acceso denegado' });
    }
};
exports.default = verificarToken;
