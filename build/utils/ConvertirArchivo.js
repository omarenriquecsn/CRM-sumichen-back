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
const mime_types_1 = require("mime-types");
const pdfkit_1 = __importDefault(require("pdfkit"));
const office_to_pdf_1 = __importDefault(require("office-to-pdf"));
function convertirArchivo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(file);
        const mime = (0, mime_types_1.lookup)(file.originalname);
        if (typeof mime === 'string' && mime.includes('image')) {
            return new Promise((resolve, reject) => {
                try {
                    const doc = new pdfkit_1.default();
                    const buffers = [];
                    doc.on('data', (chunk) => buffers.push(chunk));
                    doc.on('end', () => {
                        const pdfBuffer = Buffer.concat(buffers);
                        resolve(pdfBuffer);
                    });
                    doc.image(file.buffer, 50, 50, { fit: [500, 700] });
                    doc.end();
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        if (mime === 'application/pdf') {
            return file.buffer;
        }
        if (typeof mime === 'string' &&
            (mime.includes('word') || mime.includes('excel'))) {
            return yield (0, office_to_pdf_1.default)(file.buffer);
        }
        if (typeof mime === 'string' && mime.includes('text')) {
            const doc = new pdfkit_1.default();
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.text(file.buffer.toString(), 50, 50);
            doc.end();
            return Buffer.concat(buffers);
        }
        // Placeholder: return the file buffer directly, or imp}lement your conversion logic here
        throw new Error('Tipo de archivo no soportado');
    });
}
exports.default = convertirArchivo;
