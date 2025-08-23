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
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_lib_1 = require("pdf-lib");
function unirPDFS(buffers) {
    return __awaiter(this, void 0, void 0, function* () {
        const mergedPdf = yield pdf_lib_1.PDFDocument.create();
        for (const buffer of buffers) {
            const pdf = yield pdf_lib_1.PDFDocument.load(buffer);
            const copiedPages = yield mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const pdfBytes = yield mergedPdf.save();
        return Buffer.from(pdfBytes);
    });
}
exports.default = unirPDFS;
