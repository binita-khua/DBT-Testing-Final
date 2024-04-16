import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateDatabase1743197469428 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Dropping existing tables if they exist
        await queryRunner.query(`DROP TABLE IF EXISTS "ServiceDetail" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "DriverProfile" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "VoyageDetail" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "FreightDetail" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "CustomerList" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "EmployeeList" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "TruckList" CASCADE`);

        // Creating new tables with corrections for PostgreSQL
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "TruckList" (
                "id" SERIAL PRIMARY KEY,
                "brand" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "load" INT NOT NULL DEFAULT 0,
                "capacity" INT NOT NULL DEFAULT 0,
                "year" INT NOT NULL DEFAULT 0,
                "numberOfRepairs" INT NOT NULL DEFAULT 0
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "EmployeeList" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "surname" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "seniority" INT NOT NULL DEFAULT 0,
                "role" VARCHAR(50) NOT NULL DEFAULT 'Unknown'
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "CustomerList" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "address" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "phoneNumber1" VARCHAR(50) DEFAULT 'Unknown',
                "phoneNumber2" VARCHAR(50) DEFAULT 'Unknown'
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "FreightDetail" (
                "id" SERIAL PRIMARY KEY,
                "customerID" INT,
                "weight" INT NOT NULL DEFAULT 0,
                "value" DECIMAL NOT NULL DEFAULT 0.0,
                "origin" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "destination" VARCHAR(255) NOT NULL DEFAULT 'Unknown'
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "VoyageDetail" (
                "id" SERIAL PRIMARY KEY,
                "route" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "truckID" INT
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "ServiceDetail" (
                "id" SERIAL PRIMARY KEY,
                "truckID" INT NOT NULL,
                "mechanicID" INT NOT NULL,
                "estimatedTimeForRepair" INT NOT NULL
            );
        `);

        // Insert example data into the newly created tables
        await queryRunner.query(`
            INSERT INTO "TruckList" ("brand", "load", "capacity", "year", "numberOfRepairs") VALUES
            ('Parker', 10000, 20000, 2015, 2),
            ('Isaiah', 15000, 25000, 2017, 1),
            ('Mercedes', 12000, 22000, 2016, 3);
        `);

        await queryRunner.query(`
            INSERT INTO "EmployeeList" ("name", "surname", "seniority", "role") VALUES
            ('Erin', 'Fletcher', 5, 'Driver'),
            ('Jane', 'Fletcher', 7, 'Mechanic'),
            ('Mike', 'Ruiz', 4, 'Driver');
        `);

        await queryRunner.query(`
            INSERT INTO "CustomerList" ("name", "address", "phoneNumber1", "phoneNumber2") VALUES
            ('Acme Corp.', '123 Elm St, Somewhere', '555-9717', '829-4986'),
            ('Globex Corp.', '456 Oak St, Anywhere', '555-8765', '555-4321'),
            ('Initech', '789 Pine St, Everywhere', '555-0000', '555-1111');
        `);

        await queryRunner.query(`
            INSERT INTO "FreightDetail" ("customerID", "weight", "value", "origin", "destination") VALUES
            (1, 1000, 5000.00, 'Somewhere', 'Anywhere'),
            (2, 2000, 12000.50, 'Anywhere', 'Everywhere'),
            (3, 1500, 7500.75, 'Somewhere', 'Everywhere');
        `);

        await queryRunner.query(`
            INSERT INTO "VoyageDetail" ("route", "truckID") VALUES
            ('Somewhere-Anywhere', 1),
            ('Anywhere-Everywhere', 2),
            ('Somewhere-Everywhere', 3);
        `);

        await queryRunner.query(`
            INSERT INTO "ServiceDetail" ("truckID", "mechanicID", "estimatedTimeForRepair") VALUES
            (1, 2, 5),
            (2, 2, 3),
            (3, 2, 4);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Clean up all the tables
        await queryRunner.query(`DROP TABLE IF EXISTS "ServiceDetail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "DriverProfile"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "VoyageDetail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "FreightDetail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "CustomerList"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "EmployeeList"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "TruckList"`);
    }
}
