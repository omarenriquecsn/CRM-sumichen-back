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
exports.Oportunidad = void 0;
const typeorm_1 = require("typeorm");
const Clientes_1 = require("./Clientes");
const Vendedores_1 = require("./Vendedores");
const EtapaDeVentaEnum_1 = require("../enums/EtapaDeVentaEnum");
let Oportunidad = class Oportunidad {
};
exports.Oportunidad = Oportunidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Oportunidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id', unique: true }),
    __metadata("design:type", String)
], Oportunidad.prototype, "cliente_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clientes_1.Cliente, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", Clientes_1.Cliente)
], Oportunidad.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Oportunidad.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Oportunidad.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Oportunidad.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Oportunidad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Oportunidad.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Oportunidad.prototype, "probabilidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EtapaDeVentaEnum_1.EtapaDeVentaEnum,
        default: EtapaDeVentaEnum_1.EtapaDeVentaEnum.INICIAL,
        nullable: true,
    }),
    __metadata("design:type", String)
], Oportunidad.prototype, "etapa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Oportunidad.prototype, "fecha_cierre_estimada", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Oportunidad.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Oportunidad.prototype, "fecha_actualizacion", void 0);
exports.Oportunidad = Oportunidad = __decorate([
    (0, typeorm_1.Entity)('oportunidades')
], Oportunidad);
