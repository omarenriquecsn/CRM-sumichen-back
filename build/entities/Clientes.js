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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const Vendedores_1 = require("./Vendedores");
const EtapaDeVentaEnum_1 = require("../enums/EtapaDeVentaEnum");
const EstadoClienteEnum_1 = require("../enums/EstadoClienteEnum");
let Cliente = class Cliente {
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Cliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "rif", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Cliente.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Cliente.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cliente.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cliente.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoClienteEnum_1.EstadoClienteEnum,
        default: EstadoClienteEnum_1.EstadoClienteEnum.ACTIVO,
    }),
    __metadata("design:type", String)
], Cliente.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EtapaDeVentaEnum_1.EtapaDeVentaEnum,
        default: EtapaDeVentaEnum_1.EtapaDeVentaEnum.INICIAL,
    }),
    __metadata("design:type", String)
], Cliente.prototype, "etapa_venta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'sin direccion' }),
    __metadata("design:type", String)
], Cliente.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'valencia' }),
    __metadata("design:type", String)
], Cliente.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, default: new Date() }),
    __metadata("design:type", Date)
], Cliente.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, default: new Date() }),
    __metadata("design:type", Date)
], Cliente.prototype, "fecha_actualizacion", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)('clientes')
], Cliente);
