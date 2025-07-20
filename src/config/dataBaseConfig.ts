import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Vendedor } from '../entities/Vendedores';
import { Ticket } from '../entities/Tickets';
import { Actividad } from '../entities/Actividades';
import { Reunion } from '../entities/Reuniones';
import { Oportunidad } from '../entities/Oportunidades';
import { Pedido } from '../entities/Pedidos';
import { Producto } from '../entities/Productos';
import { ProductosPedido } from '../entities/Productos_pedido';
import { Meta } from '../entities/Metas';
import { Cliente } from '../entities/Clientes';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [
    Vendedor,
    Ticket,
    Actividad,
    Reunion,
    Oportunidad,
    Pedido,
    Producto,
    ProductosPedido,
    Meta,
    Cliente,
  ],
  migrations: ['src/database/migrations/**/*.ts'],
  dropSchema: false,
});
