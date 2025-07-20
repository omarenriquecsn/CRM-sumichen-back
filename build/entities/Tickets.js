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
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const Clientes_1 = require("./Clientes");
const Vendedores_1 = require("./Vendedores");
const EstadoTicketEnum_1 = require("../enums/EstadoTicketEnum");
const CategoriaTicketEnum_1 = require("../enums/CategoriaTicketEnum");
const PrioridadTicketEnium_1 = require("../enums/PrioridadTicketEnium");
let Ticket = class Ticket {
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    __metadata("design:type", String)
], Ticket.prototype, "cliente_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clientes_1.Cliente),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", Clientes_1.Cliente)
], Ticket.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendedor_id' }),
    __metadata("design:type", String)
], Ticket.prototype, "vendedor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendedores_1.Vendedor),
    (0, typeorm_1.JoinColumn)({ name: 'vendedor_id' }),
    __metadata("design:type", Vendedores_1.Vendedor)
], Ticket.prototype, "vendedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Ticket.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Ticket.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoTicketEnum_1.EstadoTicketEnum,
        default: EstadoTicketEnum_1.EstadoTicketEnum.ABIERTO,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PrioridadTicketEnium_1.PrioridadTicketEnum,
        default: PrioridadTicketEnium_1.PrioridadTicketEnum.MEDIA,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CategoriaTicketEnum_1.CategoriaTicketEnum,
        default: CategoriaTicketEnum_1.CategoriaTicketEnum.PRODUCTO,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Ticket.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Ticket.prototype, "fecha_actualizacion", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)('tickets')
], Ticket);
