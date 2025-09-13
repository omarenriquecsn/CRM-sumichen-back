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
exports.ProductosPedido = void 0;
// src/entities/productos-pedido.entity.ts
const typeorm_1 = require("typeorm");
const Productos_1 = require("./Productos");
const Pedidos_1 = require("./Pedidos");
let ProductosPedido = class ProductosPedido {
};
exports.ProductosPedido = ProductosPedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductosPedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", String)
], ProductosPedido.prototype, "producto_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Producto, { eager: true, nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", Productos_1.Producto)
], ProductosPedido.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 4 }),
    __metadata("design:type", Number)
], ProductosPedido.prototype, "precio_unitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductosPedido.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductosPedido.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pedido_id' }),
    __metadata("design:type", String)
], ProductosPedido.prototype, "pedido_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pedidos_1.Pedido, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'pedido_id' }),
    __metadata("design:type", Pedidos_1.Pedido)
], ProductosPedido.prototype, "pedido", void 0);
exports.ProductosPedido = ProductosPedido = __decorate([
    (0, typeorm_1.Entity)('productos_pedido')
], ProductosPedido);
