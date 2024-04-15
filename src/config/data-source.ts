import { DataSource } from "typeorm";
import { TruckList } from "../entity/TruckList";
import { EmployeeList } from "../entity/EmployeeList";
import { CustomerList } from "../entity/CustomerList";
import { FreightDetail } from "../entity/FreightDetail";
import { VoyageDetail } from "../entity/Trips";
import { ServiceDetail } from "../entity/ServiceDetail";
import { DriverProfile } from "../entity/DriverProfile";
import { MechanicDirectory } from "../entity/MechanicDirectory";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", // Change to your PostgreSQL username
    password: "password", // Change to your PostgreSQL password
    database: "postgres", // Change to your PostgreSQL database name
    entities: [
        TruckList,
        EmployeeList,
        CustomerList,
        FreightDetail,
        VoyageDetail,
        ServiceDetail,
        DriverProfile,
        MechanicDirectory
    ],
    migrations: ["dist/migration/**/*.js"],
    synchronize: true,           
    logging: false
});
