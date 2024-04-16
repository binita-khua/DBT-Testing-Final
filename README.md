### Configuration Requirements
Before staring, ensure to modify the database configurations in the following files to match your local or production environment settings:

- `ormconfig.ts`
- `docker-compose.yml`
- `src/data-source.ts`

These files should be updated with your specific PostgreSQL settings:
```typescript
{
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // Change to your PostgreSQL username
  password: "password", // Change to your PostgreSQL password
  database: "postgres"  // Change to your PostgreSQL database name
}
```

1. Load dependencies:
   ```
   npm install
   ```

2. Construct the project:
   ```
   npm run build
   ```

## Application Usage

### Starting the Application via NPM
Launch the server:
```
npm start
```

## Test Procedures

### Conduct Unit Tests
Execute unit tests:
```
npm run test:unit
```

### Conduct Integration Tests
Perform integration tests:
```
npm run test:integration
```

### Conduct Comprehensive Testing
Perform all available tests:
```
npm test
```

## Database Migrations

### Execute Migrations
Implement or revert migrations:
```
npm run migration:run
```
```
npm run migration:revert
```

## API Services

### Truck Operations
- **GET /truckLists**: List all trucks.
- **GET /truckLists/{id}**: Fetch a specific truck's details.
- **POST /truckLists**: Introduce a new truck.
- **PUT /truckLists/{id}**: Update an existing truck.
- **DELETE /truckLists/{id}**: Remove a truck.

### Customer Relations
- **GET /customerLists**: Retrieve all customer data.
- **GET /customerLists/{id}**: Access details of a specific customer.
- **POST /customerLists**: Enroll a new customer.
- **PUT /customerLists/{id}**: Refresh an existing customer's details.
- **DELETE /customerLists/{id}**: Expunge a customer from records.

### Trip Scheduling
- **GET /voyageDetails**: Access all voyages.
- **GET /voyageDetails/{id}**: Get details of a particular voyage.
- **POST /voyageDetails**: Schedule a new voyage.
- **PUT /voyageDetails/{id}**: Modify details of an existing voyage.
- **DELETE /voyageDetails/{id}**: Cancel a voyage.

### Maintenance and Service
- **GET /serviceDetails**: Overview all services.
- **GET /serviceDetails/{id}**: Detail a specific service.
- **POST /serviceDetails**: Log a new service.
- **PUT /serviceDetails/{id}**: Amend an existing service.
- **DELETE /serviceDetails/{id}**: Discontinue a service.

### Driver Management
- **GET /driverProfiles**: List all drivers.
- **GET /driverProfiles/{id}**: Detail a specific driver.
- **POST /driverProfiles**: Register a new driver.
- **PUT /driverProfiles/{id}**: Update a driver's profile.
- **DELETE /driverProfiles/{id}**: Discharge a driver.

### Mechanics Operations
- **GET /mechanicDirectorys**: List all mechanics.
- **GET /mechanicDirectorys/{id}**: Retrieve a mechanic's details.
- **POST /mechanicDirectorys**: Add a new mechanic.
- **PUT /mechanicDirectorys/{id}**: Revise a mechanic's information.
- **DELETE /mechanicDirectorys/{id}**: Remove a mechanic.

### Shipment Handling
- **GET /freightDetails**: Display all freight information.
- **GET /freightDetails/{id}**: Get details of a specific freight.
- **POST /freightDetails**: Add a new freight.
- **PUT /freightDetails/{id}**: Update freight information.
- **DELETE /freightDetails/{id}**: Delete a freight record.

### Employee Management
- **GET /employeeLists**: Enumerate all employees.
- **GET /employeeLists/{id}**: Acquire specifics of an employee.
- **POST /employeeLists**: Introduce new employee details.
- **PUT /employeeLists/{id}**: Amend existing employee details.
- **DELETE /employeeLists/{id}**: Terminate an employee.
