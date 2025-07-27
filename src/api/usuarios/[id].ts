import type { Request, Response } from 'express';

const allowedOrigins = [
  'http://localhost:5173',
  'https://crm-sumichen.vercel.app',
  'https://crm-sumichen-back.vercel.app'
];

export default async function handler(req: Request, res: Response) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Tu lógica aquí
  const { id } = req.query;
  // Simulación de respuesta
  res.status(200).json({ usuario: { id, nombre: 'Ejemplo' } });
}