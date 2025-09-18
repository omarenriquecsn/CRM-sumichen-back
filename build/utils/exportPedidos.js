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
exports.exportPedidosToExcel = exportPedidosToExcel;
const exceljs_1 = __importDefault(require("exceljs"));
const pedidosServices_1 = require("../services/pedidosServices");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function exportPedidosToExcel() {
    return __awaiter(this, void 0, void 0, function* () {
        let lastExportPath = null;
        if (lastExportPath && fs_1.default.existsSync(lastExportPath)) {
            try {
                fs_1.default.unlinkSync(lastExportPath);
                console.log('Archivo anterior eliminado:', lastExportPath);
            }
            catch (err) {
                console.error('Error al eliminar archivo anterior:', err);
            }
        }
        // 1. Consulta los pedidos desde la base de datos
        const query = yield (0, pedidosServices_1.getPedidosService)();
        const pedidos = query || [];
        if (pedidos.length === 0) {
            throw new Error('No hay pedidos para exportar');
        }
        // 2. Crear el libro y hoja de Excel
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Pedidos');
        // 3. Definir columnas con encabezados claros
        sheet.columns = [
            { header: 'Número de Pedido', key: 'numero', width: 15 },
            { header: 'Cliente ID', key: 'cliente_id', width: 36 },
            { header: 'Vendedor ID', key: 'vendedor_id', width: 36 },
            { header: 'Subtotal', key: 'subtotal', width: 15 },
            { header: 'Impuestos', key: 'impuestos', width: 15 },
            { header: 'Total', key: 'total', width: 15 },
            { header: 'Fecha de Entrega', key: 'fecha_entrega', width: 20 },
            { header: 'Tipo de Pago', key: 'tipo_pago', width: 15 },
            { header: 'Moneda', key: 'moneda', width: 10 },
            { header: 'Transporte', key: 'transporte', width: 15 },
            { header: 'Fecha de Creación', key: 'fecha_creacion', width: 20 },
            { header: 'Última Actualización', key: 'fecha_actualizacion', width: 20 },
            { header: 'Estado', key: 'estado', width: 15 },
            { header: 'Notas', key: 'notas', width: 30 },
            { header: 'Días de Crédito', key: 'dias_credito', width: 15 },
        ];
        // 4. Agregar filas con formato de fecha
        pedidos.forEach((pedido) => {
            sheet.addRow(Object.assign(Object.assign({}, pedido), { fecha_entrega: formatDate(pedido.fecha_entrega), fecha_creacion: formatDate(pedido.fecha_creacion), fecha_actualizacion: formatDate(pedido.fecha_actualizacion) }));
        });
        // 5. Estilizar encabezado
        sheet.getRow(1).font = { bold: true };
        // 6. Guardar archivo temporal
        const fileName = `pedidos.xlsx`;
        const filePath = path_1.default.join(__dirname, 'exports', fileName);
        console.log(filePath);
        // Asegurar carpeta
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, 'exports'))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, 'exports'));
        }
        yield workbook.xlsx.writeFile(filePath);
        return filePath;
    });
}
// Formato de fecha legible
function formatDate(date) {
    return new Date(date).toLocaleString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
