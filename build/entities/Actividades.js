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
exports.Actividad = void 0;
const typeorm_1 = require("typeorm");
const Clientes_1 = require("./Clientes");
const Vendedores_1 = require("./Vendedores");
const ActividadesEnum_1 = require("../enums/ActividadesEnum");
let Actividad = class Actividad {
};
exports.Actividad = Actividad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Actividad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    __metadata("design:type", String)
], Actividad.prototype, "cliente_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clientes_1.Cliente, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", Clientes_1.Cliente)
], Actividad.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Actividad.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Actividad.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActividadesEnum_1.ActividadesEnum,
        default: ActividadesEnum_1.ActividadesEnum.LLAMADA,
    }),
    __metadata("design:type", String)
], Actividad.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Actividad.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Actividad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Actividad.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Actividad.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Actividad.prototype, "completado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Actividad.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Actividad.prototype, "fecha_actualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "id_tipo_actividad", void 0);
exports.Actividad = Actividad = __decorate([
    (0, typeorm_1.Entity)('actividades')
], Actividad);
