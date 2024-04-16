import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {CustomerList} from "./CustomerList";

@Entity('FreightDetail')
export class FreightDetail {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => CustomerList, customerList => customerList.id)
    customerList!: CustomerList;

    @Column()
    weight!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    value!: number;

    @Column()
    origin!: string;

    @Column()
    destination!: string;
}
