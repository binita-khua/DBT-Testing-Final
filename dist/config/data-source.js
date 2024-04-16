import { DataSource } from "typeorm";
import { TruckList } from "../entity/TruckList.js";
import { EmployeeList } from "../entity/EmployeeList.js";
import { CustomerList } from "../entity/CustomerList.js";
import { FreightDetail } from "../entity/FreightDetail.js";
import { VoyageDetail } from "../entity/VoyageDetail.js";
import { ServiceDetail } from "../entity/ServiceDetail.js";
import { DriverProfile } from "../entity/DriverProfile.js";
import { MechanicDirectory } from "../entity/MechanicDirectory.js";
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
//# sourceMappingURL=data-source.js.map