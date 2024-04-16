import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {TruckList} from "./TruckList";
import {MechanicDirectory} from "./MechanicDirectory";

@Entity('ServiceDetail')
export class ServiceDetail {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => TruckList, truckList => truckList.id)
    truckList!: TruckList;

    @ManyToOne(() => MechanicDirectory, mechanicDirectory => mechanicDirectory.id)
    mechanicDirectory!: MechanicDirectory;

    @Column()
    estimatedTimeForRepair!: number; 
}
