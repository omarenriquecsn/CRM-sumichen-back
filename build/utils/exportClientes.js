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
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const clientesServices_1 = require("../services/clientesServices");
const usuariosServices_1 = require("../services/usuariosServices");
function exportClientesToExcel() {
    return __awaiter(this, void 0, void 0, function* () {
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
        // Crear el libro y hoja de Excel
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Clientes');
        // Definir columnas con encabezados claros
        sheet.columns = [
            { header: 'Rif', key: 'rif', width: 15 },
            { header: 'Empresa', key: 'empresa', width: 63 },
            { header: 'Contacto', key: 'contacto', width: 40 },
            { header: 'Teléfono', key: 'telefono', width: 20 },
            { header: 'Email', key: 'email', width: 45 },
            { header: 'Dirección', key: 'direccion', width: 50 },
            { header: 'Ciudad', key: 'ciudad', width: 20 },
            { header: 'Estado', key: 'estado', width: 15 },
            { header: 'Vendedor', key: 'vendedor', width: 36 },
            { header: 'Etapa Pipeline', key: 'etapa_venta', width: 15 },
            { header: 'Fecha de Creación', key: 'fecha_creacion', width: 20 },
            { header: 'Última Actualización', key: 'fecha_actualizacion', width: 20 },
            { header: 'Notas', key: 'notas', width: 100 },
        ];
        // Mapear y agregar filas
        clientes.forEach((cliente) => {
            const vendedor = vendedores.find((v) => v.id === cliente.vendedor_id);
            sheet.addRow({
                rif: cliente.rif,
                empresa: cliente.empresa,
                contacto: `${cliente.nombre} ${cliente.apellido}`,
                telefono: cliente.telefono || 'N/A',
                email: cliente.email,
                direccion: cliente.direccion || 'N/A',
                ciudad: cliente.ciudad || 'N/A',
                estado: cliente.estado,
                etapa_venta: cliente.etapa_venta,
                notas: cliente.notas || 'N/A',
                vendedor: vendedor ? `${vendedor.nombre} ${vendedor.apellido}` : 'N/A',
                fecha_creacion: cliente.fecha_creacion
                    ? cliente.fecha_creacion
                    : 'N/A',
                fecha_actualizacion: cliente.fecha_actualizacion
                    ? cliente.fecha_actualizacion
                    : 'N/A',
            });
        });
        // Formatear encabezados
        sheet.getRow(1).font = { bold: true };
        // Crear directorio si no existe
        const exportDir = path_1.default.join(__dirname, '../../exports');
        if (!fs_1.default.existsSync(exportDir)) {
            fs_1.default.mkdirSync(exportDir);
        }
        // Guardar el archivo
        const filePath = path_1.default.join(exportDir, 'clientes.xlsx');
        yield workbook.xlsx.writeFile(filePath);
        return filePath;
    });
}
exports.default = exportClientesToExcel;
