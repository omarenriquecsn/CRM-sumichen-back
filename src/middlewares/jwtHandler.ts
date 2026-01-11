import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();
export type SupabaseUser = {
  id: string;
  email: string;
  role: string;
  aud: string;
  created_at: string;
  updated_at: string;
  app_metadata: {
    provider: string;
    roles?: string[];
  };
  user_metadata: {
    nombre?: string;
    empresaId?: string;
    telefono?: string;
  };
};

const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) return res.status(500).json({ error: 'Error de clave secreta' });

  try {
    const decoded = jwt.verify(token, secret) as SupabaseUser;

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: 'Acceso denegado' });
  }
};

export default verificarToken;
