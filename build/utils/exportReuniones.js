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
const reunionesServices_1 = require("../services/reunionesServices");
const usuariosServices_1 = require("../services/usuariosServices");
const clientesServices_1 = require("../services/clientesServices");
function exportReunionesToExcel() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryReuniones = yield (0, reunionesServices_1.getReunionesService)();
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
        const reuniones = queryReuniones.filter((meta) => new Date(meta.fecha_creacion).getMonth() === new Date().getMonth()) || [];
        if (reuniones.length === 0) {
            throw new Error('No hay reuniones para exportar');
        }
        // Crear el libro y hoja de Excel
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Reuniones');
        // Definir columnas con encabezados claros
        sheet.columns = [
            { header: 'Cliente', key: 'cliente', width: 63 },
            { header: 'Descripción', key: 'descripcion', width: 100 },
            { header: 'Fecha y Hora', key: 'fecha_hora', width: 20 },
            { header: 'Ubicación', key: 'ubicacion', width: 30 },
            { header: 'Estado', key: 'estado', width: 15 },
            { header: 'Vendedor', key: 'vendedor', width: 36 },
            { header: 'Creado En', key: 'fecha_creacion', width: 20 },
            { header: 'Actualizado En', key: 'fecha_actualizacion', width: 20 },
        ];
        // Mapear y agregar filas
        reuniones.forEach((reunion) => {
            const cliente = clientes.find((c) => c.id === reunion.cliente_id);
            const vendedor = usuarios.find((u) => u.id === reunion.vendedor_id);
            const empresa = cliente ? cliente.empresa : 'N/A';
            const nombreVendedor = vendedor
                ? `${vendedor.nombre} ${vendedor.apellido}`
                : 'N/A';
            sheet.addRow({
                cliente: empresa,
                descripcion: reunion.descripcion,
                fecha_hora: reunion.fecha_inicio.toLocaleString(),
                ubicacion: reunion.ubicacion,
                estado: reunion.estado,
                vendedor: nombreVendedor,
                fecha_creacion: reunion.fecha_creacion,
                fecha_actualizacion: reunion.fecha_actualizacion,
            });
        });
        sheet.getRow(1).font = { bold: true };
        // 6. Guardar archivo temporal
        const fileName = `reuniones.xlsx`;
        const filePath = path_1.default.join(__dirname, 'exports', fileName);
        // 7. Eliminar archivo anterior si existe
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        // Asegurar carpeta
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, 'exports'))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, 'exports'));
        }
        yield workbook.xlsx.writeFile(filePath);
        return filePath;
    });
}
exports.default = exportReunionesToExcel;
