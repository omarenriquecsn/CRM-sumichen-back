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
const clientesServices_1 = require("../services/clientesServices");
const usuariosServices_1 = require("../services/usuariosServices");
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
        const queryClientes = yield (0, clientesServices_1.getClientesService)();
        const queryVendedores = yield (0, usuariosServices_1.getUsuariosService)();
        const vendedores = queryVendedores || [];
        if (vendedores.length === 0) {
            throw new Error('No hay vendedores para exportar');
        }
        const clientes = queryClientes || [];
        if (clientes.length === 0) {
            throw new Error('No hay clientes para exportar');
        }
        const pedidos = query || [];
        if (pedidos.length === 0) {
            throw new Error('No hay pedidos para exportar');
        }
        // 2. Crear el libro y hoja de Excel
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Pedidos');
        // 3. Definir columnas con encabezados claros
        sheet.columns = [
            { header: 'Fecha de Creación', key: 'fecha_creacion', width: 20 },
            { header: 'Fecha de Entrega', key: 'fecha_entrega', width: 20 },
            { header: 'Número de Pedido', key: 'numero', width: 15 },
            { header: 'Cliente', key: 'cliente_id', width: 50 },
            { header: 'Productos', key: 'producto', width: 30 },
            { header: 'Cantidad', key: 'cantidad', width: 15 },
            { header: 'Precio Unitario', key: 'precio_unitario', width: 15 },
            { header: 'Total por Producto', key: 'total_producto', width: 15 },
            { header: 'Subtotal', key: 'subtotal', width: 15 },
            { header: 'Impuestos', key: 'impuestos', width: 15 },
            { header: 'IVA', key: 'iva', width: 15 },
            { header: 'Total', key: 'total', width: 15 },
            { header: 'Tipo de Pago', key: 'tipo_pago', width: 15 },
            { header: 'Días de Crédito', key: 'dias_credito', width: 15 },
            { header: 'Moneda', key: 'moneda', width: 10 },
            { header: 'Transporte', key: 'transporte', width: 15 },
            { header: 'Notas', key: 'notas', width: 30 },
            { header: 'Última Actualización', key: 'fecha_actualizacion', width: 20 },
            { header: 'Vendedor', key: 'vendedor_id', width: 36 },
            { header: 'Estado', key: 'estado', width: 15 },
        ];
        // 4. Agregar filas con formato de fecha
        pedidos.forEach((pedido) => {
            pedido.productos_pedido.forEach(pp => {
                var _a, _b, _c;
                sheet.addRow({
                    numero: pedido.numero,
                    cliente_id: ((_a = clientes.find(c => c.id === pedido.cliente_id)) === null || _a === void 0 ? void 0 : _a.empresa) || pedido.cliente_id,
                    vendedor_id: ((_b = vendedores.find(v => v.id === pedido.vendedor_id)) === null || _b === void 0 ? void 0 : _b.nombre) || pedido.vendedor_id,
                    subtotal: Number(pedido.subtotal),
                    impuestos: Number(pedido.impuestos),
                    iva: Number(pedido.subtotal) * Number(pedido.impuestos),
                    total: (Number(pedido.subtotal) * Number(pedido.impuestos)) + Number(pedido.subtotal),
                    fecha_entrega: formatDate(pedido.fecha_entrega),
                    tipo_pago: pedido.tipo_pago,
                    moneda: pedido.moneda,
                    transporte: pedido.transporte,
                    fecha_creacion: formatDate(pedido.fecha_creacion),
                    fecha_actualizacion: formatDate(pedido.fecha_actualizacion),
                    estado: pedido.estado,
                    notas: pedido.notas,
                    dias_credito: pedido.dias_credito,
                    producto: (_c = pp.producto) === null || _c === void 0 ? void 0 : _c.nombre,
                    cantidad: Number(pp.cantidad),
                    precio_unitario: Number(pp.precio_unitario),
                    total_producto: Number(pp.precio_unitario) * Number(pp.cantidad)
                });
            });
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
