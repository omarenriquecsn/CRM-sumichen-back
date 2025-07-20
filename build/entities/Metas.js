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
exports.Meta = void 0;
const typeorm_1 = require("typeorm");
const Vendedores_1 = require("./Vendedores");
let Meta = class Meta {
};
exports.Meta = Meta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Meta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Meta.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Meta.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Meta.prototype, "mes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Meta.prototype, "ano", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Meta.prototype, "objetivo_ventas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Meta.prototype, "objetivo_clientes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Meta.prototype, "ventas_actuales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Meta.prototype, "clientes_actuales", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Meta.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Meta.prototype, "fecha_actualizacion", void 0);
exports.Meta = Meta = __decorate([
    (0, typeorm_1.Entity)('metas')
], Meta);
