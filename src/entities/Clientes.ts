import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vendedor } from './Vendedores';
import { EtapaDeVentaEnum } from '../enums/EtapaDeVentaEnum';
import { EstadoClienteEnum } from '../enums/EstadoClienteEnum';
@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  rif: string;

  @Column({ name: 'vendedor_id' })
  vendedor_id: string;

  @ManyToOne(() => Vendedor)
  @JoinColumn({ name: 'vendedor_id' })
  vendedor: Vendedor;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono?: string;

  @Column()
  empresa: string;

  @Column({
    type: 'enum',
    enum: EstadoClienteEnum,
    default: EstadoClienteEnum.ACTIVO,
  })
  estado: EstadoClienteEnum;

  @Column({
    type: 'enum',
    enum: EtapaDeVentaEnum,
    default: EtapaDeVentaEnum.INICIAL,
  })
  etapa_venta: EtapaDeVentaEnum;

  @Column({ type: 'text', nullable: true })
  notas?: string;

  @Column({ nullable: true, default: 'sin direccion' })
  direccion: string;

  @Column({ nullable: true, default: 'valencia' })
  ciudad: string;

  @Column({ type: 'date', nullable: true, default: new Date() })
  fecha_creacion?: Date;

  @Column({ type: 'date', nullable: true, default: new Date() })
  fecha_actualizacion?: Date;
}
