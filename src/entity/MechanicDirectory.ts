import {Entity, Column} from "typeorm";
import {EmployeeList} from "./EmployeeList";

@Entity('MechanicDirectory')
export class MechanicDirectory extends EmployeeList {
    @Column()
    brandSpecialization!: string;
}
