import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class EmployeeList {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, default: 'Unknown name' })
    name!: string;

    @Column({ type: 'varchar', nullable: false, default: 'Unknown surname' })
    surname!: string;

    @Column({ type: 'int', nullable: false })
    seniority!: number;

    @Column({ type: 'varchar', nullable: false, default: 'Unknown role' })
    role!: string;
}
