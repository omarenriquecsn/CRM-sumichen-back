import { Pedido } from '../entities/Pedidos';
import ExcelJS from 'exceljs';
import { getPedidosService } from '../services/pedidosServices';
import fs from 'fs';
import path from 'path';

async function exportPedidosToExcel() {
  let lastExportPath = null;
  if (lastExportPath && fs.existsSync(lastExportPath)) {
    try {
      fs.unlinkSync(lastExportPath);
      console.log('Archivo anterior eliminado:', lastExportPath);
    } catch (err) {
      console.error('Error al eliminar archivo anterior:', err);
    }
  }

  // 1. Consulta los pedidos desde la base de datos
  const query = await getPedidosService();
  const pedidos = query || [];
  if (pedidos.length === 0) {
    throw new Error('No hay pedidos para exportar');
  }

  // 2. Crear el libro y hoja de Excel
  const workbook = new ExcelJS.Workbook();
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
  pedidos.forEach((pedido: Pedido) => {
    sheet.addRow({
      ...pedido,
      fecha_entrega: formatDate(pedido.fecha_entrega),
      fecha_creacion: formatDate(pedido.fecha_creacion),
      fecha_actualizacion: formatDate(pedido.fecha_actualizacion),
    });
  });

  // 5. Estilizar encabezado
  sheet.getRow(1).font = { bold: true };

  // 6. Guardar archivo temporal
  const fileName = `pedidos.xlsx`;
  const filePath = path.join(__dirname, 'exports', fileName);

  console.log(filePath);

  // Asegurar carpeta
  if (!fs.existsSync(path.join(__dirname, 'exports'))) {
    fs.mkdirSync(path.join(__dirname, 'exports'));
  }

  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

// Formato de fecha legible
function formatDate(date: string | Date) {
  return new Date(date).toLocaleString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export { exportPedidosToExcel };
