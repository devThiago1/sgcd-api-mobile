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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Adress_1 = require("./Adress");
const Post_1 = require("./Post");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 40 }),
    __metadata("design:type", String)
], User.prototype, "first_name_user", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 40 }),
    __metadata("design:type", String)
], User.prototype, "last_name_user", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    __metadata("design:type", String)
], User.prototype, "number_user", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 60 }),
    __metadata("design:type", String)
], User.prototype, "cpf_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "email_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "password_user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => Adress_1.Adress),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Adress_1.Adress)
], User.prototype, "Adress", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Post_1.Posts, post => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
