import { Request, Response } from "express";
import { getDescargasPedidosService } from "../services/descargasServices";

export const getDescargasPedidos = async (req: Request, res: Response) => {
    console.log('getDescargas called');
  try {
    const descargas = await getDescargasPedidosService();
    res.status(200).download(descargas, 'pedidos.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las descargas" });
  }
};
