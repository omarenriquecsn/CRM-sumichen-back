"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const url = `https://graph.facebook.com/v19.0/${process.env.META_PHONE_ID}/messages`;
const recipient = process.env.META_RECIPIENT;
/**
 * Envía una plantilla de WhatsApp llamada 'pedido' usando la API de Meta.
 * @param recipient Número de WhatsApp en formato internacional (ej: 584125072254)
 * @param templateParams Array de parámetros para la plantilla (opcional)
 */
const sendWhatsAppTemplate = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = {
            messaging_product: 'whatsapp',
            to: recipient,
            type: 'template',
            template: {
                name: 'pedido',
                language: { code: 'es' },
            },
        };
        const response = yield axios_1.default.post(url + `?access_token=${process.env.META_TOKEN}`, data, { headers: { 'Content-Type': 'application/json' } });
        return response.data;
    }
    catch (error) {
        console.error('Error enviando plantilla WhatsApp:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error('Error al enviar la plantilla de WhatsApp');
    }
});
exports.default = sendWhatsAppTemplate;
