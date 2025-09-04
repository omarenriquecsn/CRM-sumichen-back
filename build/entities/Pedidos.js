"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const typeorm_1 = require("typeorm");
const Clientes_1 = require("./Clientes");
const Vendedores_1 = require("./Vendedores");
const Productos_pedido_1 = require("./Productos_pedido");
const TipoPagoEnum_1 = require("../enums/TipoPagoEnum");
const MonedaEnum_1 = require("../enums/MonedaEnum");
const TransporteEnum_1 = require("../enums/TransporteEnum");
const EstadoPedidoEnum_1 = require("../enums/EstadoPedidoEnum");
let Pedido = class Pedido {
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: () => "nextval('numero_seq')" }),
    __metadata("design:type", Number)
], Pedido.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    __metadata("design:type", String)
], Pedido.prototype, "cliente_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clientes_1.Cliente, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", Clientes_1.Cliente)
], Pedido.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Pedido.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Pedido.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "impuestos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fecha_entrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pedido.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoPagoEnum_1.TipoPagoEnum, default: TipoPagoEnum_1.TipoPagoEnum.CONTADO }),
    __metadata("design:type", String)
], Pedido.prototype, "tipo_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0, nullable: true }),
    __metadata("design:type", Number)
], Pedido.prototype, "dias_credito", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MonedaEnum_1.MonedaEnum, default: MonedaEnum_1.MonedaEnum.DOLARES }),
    __metadata("design:type", String)
], Pedido.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TransporteEnum_1.TransporteEnum,
        default: TransporteEnum_1.TransporteEnum.INTERNO,
        nullable: true,
    }),
    __metadata("design:type", String)
], Pedido.prototype, "transporte", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fecha_actualizacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Productos_pedido_1.ProductosPedido, (productos_pedido) => productos_pedido.pedido, { eager: true }),
    __metadata("design:type", Array)
], Pedido.prototype, "productos_pedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pedido.prototype, "evidencia_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoPedidoEnum_1.EstadoPedidoEnum,
        default: EstadoPedidoEnum_1.EstadoPedidoEnum.PENDIENTE,
    }),
    __metadata("design:type", String)
], Pedido.prototype, "estado", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)('pedidos')
], Pedido);
