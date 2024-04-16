import {Entity, Column} from "typeorm";
import {EmployeeList} from "./EmployeeList";

@Entity('DriverProfile')
export class DriverProfile extends EmployeeList {
    @Column({ type: 'varchar', nullable: false, default: 'Unknown category' })
    category!: string;
}
