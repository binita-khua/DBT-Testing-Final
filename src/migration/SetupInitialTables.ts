import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateDatabase1743197469428 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Dropping existing tables if they exist
        await queryRunner.query(`DROP TABLE IF EXISTS "service_detail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "driver_profile" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "voyage_detail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "freight_detail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "customer_list"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "employee_list"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "truck_list"`);

        // Creating new tables with corrections for PostgreSQL
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "truck_list" (
                "id" SERIAL PRIMARY KEY,
                "brand" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "load" INT NOT NULL DEFAULT 0,
                "capacity" INT NOT NULL DEFAULT 0,
                "year" INT NOT NULL DEFAULT 0,
                "numberOfRepairs" INT NOT NULL DEFAULT 0
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "employee_list" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "surname" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "seniority" INT NOT NULL DEFAULT 0,
                "role" VARCHAR(50) NOT NULL DEFAULT 'Unknown'
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "customer_list" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "address" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "phoneNumber1" VARCHAR(50) DEFAULT 'Unknown',
                "phoneNumber2" VARCHAR(50) DEFAULT 'Unknown'
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "freight_detail" (
                "id" SERIAL PRIMARY KEY,
                "customerID" INT,
                "weight" INT NOT NULL DEFAULT 0,
                "value" DECIMAL NOT NULL DEFAULT 0.0,
                "origin" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "destination" VARCHAR(255) NOT NULL DEFAULT 'Unknown'
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "voyage_detail" (
                "id" SERIAL PRIMARY KEY,
                "route" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
                "truckID" INT
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "service_detail" (
                "id" SERIAL PRIMARY KEY,
                "truckID" INT NOT NULL,
                "mechanicID" INT NOT NULL,
                "estimatedTimeForRepair" INT NOT NULL
            );
        `);

        // Insert example data into the newly created tables
        await queryRunner.query(`
            INSERT INTO "truck_list" ("brand", "load", "capacity", "year", "numberOfRepairs") VALUES
            ('Parker', 10000, 20000, 2015, 2),
            ('Isaiah', 15000, 25000, 2017, 1),
            ('Mercedes', 12000, 22000, 2016, 3);
        `);

        await queryRunner.query(`
            INSERT INTO "employee_list" ("name", "surname", "seniority", "role") VALUES
            ('Erin', 'Fletcher', 5, 'Driver'),
            ('Jane', 'Fletcher', 7, 'Mechanic'),
            ('Mike', 'Ruiz', 4, 'Driver');
        `);

        await queryRunner.query(`
            INSERT INTO "customer_list" ("name", "address", "phoneNumber1", "phoneNumber2") VALUES
            ('Acme Corp.', '123 Elm St, Somewhere', '555-9717', '829-4986'),
            ('Globex Corp.', '456 Oak St, Anywhere', '555-8765', '555-4321'),
            ('Initech', '789 Pine St, Everywhere', '555-0000', '555-1111');
        `);

        await queryRunner.query(`
            INSERT INTO "freight_detail" ("customerID", "weight", "value", "origin", "destination") VALUES
            (1, 1000, 5000.00, 'Somewhere', 'Anywhere'),
            (2, 2000, 12000.50, 'Anywhere', 'Everywhere'),
            (3, 1500, 7500.75, 'Somewhere', 'Everywhere');
        `);

        await queryRunner.query(`
            INSERT INTO "voyage_detail" ("route", "truckID") VALUES
            ('Somewhere-Anywhere', 1),
            ('Anywhere-Everywhere', 2),
            ('Somewhere-Everywhere', 3);
        `);

        await queryRunner.query(`
            INSERT INTO "service_detail" ("truckID", "mechanicID", "estimatedTimeForRepair") VALUES
            (1, 2, 5),
            (2, 2, 3),
            (3, 2, 4);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Clean up all the tables
        await queryRunner.query(`DROP TABLE IF EXISTS "service_detail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "driver_profile"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "voyage_detail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "freight_detail"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "customer_list"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "employee_list"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "truck_list"`);
    }
}
