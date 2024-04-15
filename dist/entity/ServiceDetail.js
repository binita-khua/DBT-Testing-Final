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
import { TruckList } from "./TruckList.js";
import { MechanicDirectory } from "./MechanicDirectory.js";
let ServiceDetail = class ServiceDetail {
    id;
    truckList;
    mechanicDirectory;
    estimatedTimeForRepair;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ServiceDetail.prototype, "id", void 0);
__decorate([
    ManyToOne(() => TruckList, truckList => truckList.id),
    __metadata("design:type", TruckList)
], ServiceDetail.prototype, "truckList", void 0);
__decorate([
    ManyToOne(() => MechanicDirectory, mechanicDirectory => mechanicDirectory.id),
    __metadata("design:type", MechanicDirectory)
], ServiceDetail.prototype, "mechanicDirectory", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ServiceDetail.prototype, "estimatedTimeForRepair", void 0);
ServiceDetail = __decorate([
    Entity()
], ServiceDetail);
export { ServiceDetail };
//# sourceMappingURL=ServiceDetail.js.map