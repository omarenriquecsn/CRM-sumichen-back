import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Vendedor } from './Vendedores';

@Entity('metas')
export class Meta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vendedor_id' })
  vendedor_id: string;

  @ManyToOne(() => Vendedor, { nullable: false })
  @JoinColumn({ name: 'vendedor_id' })
  vendedor: Vendedor;

  @Column({ type: 'int' })
  mes: number;

  @Column({ type: 'int' })
  ano: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  objetivo_ventas: number;

  @Column({ type: 'int' })
  objetivo_clientes: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  ventas_actuales: number;

  @Column({ type: 'int', default: 0 })
  clientes_actuales: number;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_actualizacion: Date;
}
