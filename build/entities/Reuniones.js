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
exports.Reunion = void 0;
const typeorm_1 = require("typeorm");
const Clientes_1 = require("./Clientes");
const Vendedores_1 = require("./Vendedores");
const TipoReunionEnum_1 = require("../enums/TipoReunionEnum");
const EstadoReunionEnum_1 = require("../enums/EstadoReunionEnum");
let Reunion = class Reunion {
};
exports.Reunion = Reunion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reunion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    __metadata("design:type", String)
], Reunion.prototype, "cliente_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clientes_1.Cliente),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", Clientes_1.Cliente)
], Reunion.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Reunion.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Reunion.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Reunion.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reunion.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reunion.prototype, "fecha_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reunion.prototype, "fecha_fin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reunion.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoReunionEnum_1.TipoReunionEnum,
        default: TipoReunionEnum_1.TipoReunionEnum.TELEFONICA,
    }),
    __metadata("design:type", String)
], Reunion.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoReunionEnum_1.EstadoReunionEnum,
        default: EstadoReunionEnum_1.EstadoReunionEnum.PROGRAMADA,
    }),
    __metadata("design:type", String)
], Reunion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Reunion.prototype, "recordatorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reunion.prototype, "enlace_reunion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reunion.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reunion.prototype, "fecha_actualizacion", void 0);
exports.Reunion = Reunion = __decorate([
    (0, typeorm_1.Entity)('reuniones')
], Reunion);
