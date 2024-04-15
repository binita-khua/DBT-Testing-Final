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
let EmployeeList = class EmployeeList {
    id;
    name;
    surname;
    seniority;
    role;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EmployeeList.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, default: 'Unknown name' }),
    __metadata("design:type", String)
], EmployeeList.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, default: 'Unknown surname' }),
    __metadata("design:type", String)
], EmployeeList.prototype, "surname", void 0);
__decorate([
    Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EmployeeList.prototype, "seniority", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, default: 'Unknown role' }),
    __metadata("design:type", String)
], EmployeeList.prototype, "role", void 0);
EmployeeList = __decorate([
    Entity()
], EmployeeList);
export { EmployeeList };
//# sourceMappingURL=EmployeeList.js.map