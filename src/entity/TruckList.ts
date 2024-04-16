import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('TruckList')
export class TruckList {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, default: 'Unknown Brand' })
    brand!: string;

    @Column({ type: 'int', nullable: false })
    load!: number;

    @Column()
    capacity!: number;

    @Column()
    year!: number;

    @Column()
    numberOfRepairs!: number;
}
