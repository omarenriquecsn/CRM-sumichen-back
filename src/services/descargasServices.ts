import { exportPedidosToExcel } from '../utils/exportPedidos';

export const getDescargasPedidosService = async () => {
  // Lógica para obtener las descargas desde la base de datos

  return await exportPedidosToExcel();
};
