import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {TruckList} from "./TruckList";
import {DriverProfile} from "./DriverProfile";
import {FreightDetail} from "./FreightDetail";

@Entity()
export class VoyageDetail {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    route!: string;

    @ManyToOne(() => TruckList, truckList => truckList.id)
    truckList!: TruckList;

    @ManyToMany(() => DriverProfile, driverProfile => driverProfile.id)
    @JoinTable()
    driverProfiles!: DriverProfile[];

    @ManyToMany(() => FreightDetail, freightDetail => freightDetail.id)
    @JoinTable()
    freightDetails!: FreightDetail[];
}
