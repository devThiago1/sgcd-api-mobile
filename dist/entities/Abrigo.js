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
exports.Abrigos = void 0;
const typeorm_1 = require("typeorm");
let Abrigos = class Abrigos {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Abrigos.prototype, "id_abrigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Abrigos.prototype, "title_abrigo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 40 }),
    __metadata("design:type", String)
], Abrigos.prototype, "abrigo_type_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Abrigos.prototype, "bairro_abrigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Abrigos.prototype, "rua_abrigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Abrigos.prototype, "complemento_abrigo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 15 }),
    __metadata("design:type", String)
], Abrigos.prototype, "cep_abrigo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 7 }),
    __metadata("design:type", Number)
], Abrigos.prototype, "number_adress_abrigo", void 0);
Abrigos = __decorate([
    (0, typeorm_1.Entity)('abrigos')
], Abrigos);
exports.Abrigos = Abrigos;
