var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let TruckList = class TruckList {
    id;
    brand;
    load;
    capacity;
    year;
    numberOfRepairs;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TruckList.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, default: 'Unknown Brand' }),
    __metadata("design:type", String)
], TruckList.prototype, "brand", void 0);
__decorate([
    Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], TruckList.prototype, "load", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], TruckList.prototype, "capacity", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], TruckList.prototype, "year", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], TruckList.prototype, "numberOfRepairs", void 0);
TruckList = __decorate([
    Entity('TruckList')
], TruckList);
export { TruckList };
//# sourceMappingURL=TruckList.js.map