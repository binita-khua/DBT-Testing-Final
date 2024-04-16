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
let CustomerList = class CustomerList {
    id;
    name;
    address;
    phoneNumber1;
    phoneNumber2;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CustomerList.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CustomerList.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CustomerList.prototype, "address", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CustomerList.prototype, "phoneNumber1", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CustomerList.prototype, "phoneNumber2", void 0);
CustomerList = __decorate([
    Entity('CustomerList')
], CustomerList);
export { CustomerList };
//# sourceMappingURL=CustomerList.js.map