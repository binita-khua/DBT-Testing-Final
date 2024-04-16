var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CustomerList } from "./CustomerList.js";
let FreightDetail = class FreightDetail {
    id;
    customerList;
    weight;
    value;
    origin;
    destination;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], FreightDetail.prototype, "id", void 0);
__decorate([
    ManyToOne(() => CustomerList, customerList => customerList.id),
    __metadata("design:type", CustomerList)
], FreightDetail.prototype, "customerList", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], FreightDetail.prototype, "weight", void 0);
__decorate([
    Column('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], FreightDetail.prototype, "value", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], FreightDetail.prototype, "origin", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], FreightDetail.prototype, "destination", void 0);
FreightDetail = __decorate([
    Entity('FreightDetail')
], FreightDetail);
export { FreightDetail };
//# sourceMappingURL=FreightDetail.js.map