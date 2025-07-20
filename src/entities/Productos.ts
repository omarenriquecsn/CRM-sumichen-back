import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ type: 'varchar' })
  unidad_medida: string;
}
