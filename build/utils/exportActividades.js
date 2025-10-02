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
const actividadesServices_1 = require("../services/actividadesServices");
const usuariosServices_1 = require("../services/usuariosServices");
const clientesServices_1 = require("../services/clientesServices");
function exportActividadesToExcel() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryActividades = yield (0, actividadesServices_1.getActividadesService)();
        const queryUsuarios = yield (0, usuariosServices_1.getUsuariosService)();
        const queryClientes = yield (0, clientesServices_1.getClientesService)();
        const usuarios = queryUsuarios || [];
        if (usuarios.length === 0) {
            throw new Error('No hay usuarios para exportar');
        }
        const clientes = queryClientes || [];
        if (clientes.length === 0) {
            throw new Error('No hay clientes para exportar');
        }
        const actividades = Array.isArray(queryActividades) ? queryActividades : [];
        if (actividades.length === 0) {
            throw new Error('No hay actividades para exportar');
        }
        // Crear el libro y hoja de Excel
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Actividades');
        // Definir columnas con encabezados claros
        sheet.columns = [
            { header: 'Cliente', key: 'cliente', width: 63 },
            { header: 'Descripción', key: 'descripcion', width: 100 },
            { header: 'Fecha y Hora', key: 'fecha_hora', width: 20 },
            { header: 'Tipo de Actividad', key: 'tipo_actividad', width: 20 },
            { header: 'Estado', key: 'estado', width: 15 },
            { header: 'Vendedor', key: 'vendedor', width: 36 },
            { header: 'Creado En', key: 'fecha_creacion', width: 20 },
            { header: 'Actualizado En', key: 'fecha_actualizacion', width: 20 },
        ];
        // Mapear y agregar filas
        actividades.forEach((actividad) => {
            const cliente = clientes.find((c) => c.id === actividad.cliente_id);
            const vendedor = usuarios.find((u) => u.id === actividad.vendedor_id);
            const empresa = cliente ? cliente.empresa : 'N/A';
            const nombreVendedor = vendedor
                ? `${vendedor.nombre} ${vendedor.apellido}`
                : 'N/A';
            sheet.addRow({
                cliente: empresa,
                descripcion: actividad.descripcion,
                fecha_hora: actividad.fecha.toLocaleString(),
                tipo_actividad: actividad.tipo,
                estado: actividad.completado ? 'Completado' : 'Pendiente',
                vendedor: nombreVendedor,
                fecha_creacion: actividad.fecha_creacion,
                fecha_actualizacion: actividad.fecha_actualizacion,
            });
        });
        sheet.getRow(1).font = { bold: true };
        // Guardar el archivo en una ruta temporal
        const tempDir = path_1.default.join(__dirname, '../../temp');
        if (!fs_1.default.existsSync(tempDir)) {
            fs_1.default.mkdirSync(tempDir);
        }
        const filePath = path_1.default.join(tempDir, 'actividades.xlsx');
        yield workbook.xlsx.writeFile(filePath);
        return filePath;
    });
}
exports.default = exportActividadesToExcel;
