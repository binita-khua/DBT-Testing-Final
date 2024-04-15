import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class CustomerList {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    phoneNumber1!: string;

    @Column()
    phoneNumber2!: string;
}
