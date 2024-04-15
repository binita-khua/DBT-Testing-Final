import {Entity, Column} from "typeorm";
import {EmployeeList} from "./EmployeeList";

@Entity()
export class MechanicDirectory extends EmployeeList {
    @Column()
    brandSpecialization!: string;
}
