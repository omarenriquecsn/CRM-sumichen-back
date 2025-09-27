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
exports.exportMetasToExcel = exportMetasToExcel;
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const metasServices_1 = require("../services/metasServices");
const usuariosServices_1 = require("../services/usuariosServices");
function exportMetasToExcel() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryMetas = yield (0, metasServices_1.getMetasService)();
        const queryVendedores = yield (0, usuariosServices_1.getUsuariosService)();
        const vendedores = queryVendedores || [];
        if (vendedores.length === 0) {
            throw new Error('No hay vendedores para exportar');
        }
        const metas = queryMetas.filter((meta) => new Date(meta.fecha_creacion).getMonth() === new Date().getMonth()) || [];
        if (metas.length === 0) {
            throw new Error('No hay metas para exportar');
        }
        // Crear el libro y hoja de Excel
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Metas');
        // Definir columnas con encabezados claros
        sheet.columns = [
            { header: 'Vendedor', key: 'vendedor', width: 36 },
            { header: 'Año', key: 'ano', width: 10 },
            { header: 'Mes', key: 'mes', width: 15 },
            { header: 'Meta de Ventas', key: 'meta_ventas', width: 20 },
            {
                header: 'Meta de Nuevos Clientes',
                key: 'meta_nuevos_clientes',
                width: 25,
            },
            { header: 'Meta de Actividades', key: 'meta_actividades', width: 25 },
            { header: 'Meta de Llamadas', key: 'llamadas', width: 20 },
            { header: 'Meta de Reuniones', key: 'reuniones', width: 20 },
            { header: 'Meta de Emails', key: 'emails', width: 20 },
            { header: 'Meta de Tareas', key: 'tareas', width: 20 },
            { header: 'Fecha de Creación', key: 'fecha_creacion', width: 20 },
            { header: 'Última Actualización', key: 'fecha_actualizacion', width: 20 },
        ];
        // Mapear y agregar filas
        metas.forEach((meta) => {
            const vendedor = vendedores.find((v) => v.id === meta.vendedor_id);
            sheet.addRow({
                vendedor: vendedor ? `${vendedor.nombre} ${vendedor.apellido}` : 'N/A',
                ano: meta.ano,
                mes: meta.mes,
                meta_ventas: meta.objetivo_ventas,
                meta_nuevos_clientes: meta.objetivo_clientes,
                meta_actividades: meta.emails + meta.tareas + meta.llamadas + meta.reuniones,
                llamadas: meta.llamadas,
                reuniones: meta.reuniones,
                emails: meta.emails,
                tareas: meta.tareas,
                fecha_creacion: meta.fecha_creacion,
                fecha_actualizacion: meta.fecha_actualizacion,
            });
        });
        sheet.getRow(1).font = { bold: true };
        // Crear el directorio si no existe
        const dir = path_1.default.join(__dirname, '../../exports');
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        // Guardar el archivo
        const filePath = path_1.default.join(dir, 'metas.xlsx');
        yield workbook.xlsx.writeFile(filePath);
        return filePath;
    });
}
