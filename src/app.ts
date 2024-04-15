import express, { Request, Response } from 'express';
import { AppDataSource } from './config/data-source';

import { VoyageDetailController } from './controller/VoyageDetailController';
import { ServiceDetailController } from './controller/ServiceDetailController';
import { DriverProfileController } from './controller/DriverProfileController';
import { MechanicDirectoryController } from './controller/MechanicDirectoryController';
import { FreightDetailController } from './controller/FreightDetailController';
import { CustomerListController } from './controller/CustomerListController';
import { EmployeeListController } from './controller/EmployeeListController';
import { TruckListController } from './controller/TruckListController';

AppDataSource.initialize().then(() => {
    console.log("Data source initialized.");
}).catch(error => console.log("Error during Data Source initialization:", error));

export const app = express();
app.use(express.json());

const voyageDetailController = new VoyageDetailController();
const serviceDetailController = new ServiceDetailController();
const driverProfileController = new DriverProfileController();
const mechanicDirectoryController = new MechanicDirectoryController();
const freightDetailController = new FreightDetailController();
const customerListController = new CustomerListController();
const employeeListController = new EmployeeListController();
const truckListController = new TruckListController();

// TruckList routes
app.get('/truckLists', (req: Request, res: Response) => truckListController.getAllTruckLists(req, res));
app.get('/truckLists/:id', (req: Request, res: Response) => truckListController.getTruckListById(req, res));
app.post('/truckLists', (req: Request, res: Response) => truckListController.createTruckList(req, res));
app.put('/truckLists/:id', (req: Request, res: Response) => truckListController.updateTruckList(req, res));
app.delete('/truckLists/:id', (req: Request, res: Response) => truckListController.deleteTruckList(req, res));

// CustomerList routes
app.get('/customerLists', (req: Request, res: Response) => customerListController.getAllCustomerLists(req, res));
app.get('/customerLists/:id', (req: Request, res: Response) => customerListController.getCustomerListById(req, res));
app.post('/customerLists', (req: Request, res: Response) => customerListController.createCustomerList(req, res));
app.put('/customerLists/:id', (req: Request, res: Response) => customerListController.updateCustomerList(req, res));
app.delete('/customerLists/:id', (req: Request, res: Response) => customerListController.deleteCustomerList(req, res));

// VoyageDetail routes
app.get('/voyageDetails', (req: Request, res: Response) => voyageDetailController.getAllVoyageDetails(req, res));
app.get('/voyageDetails/:id', (req: Request, res: Response) => voyageDetailController.getVoyageDetailById(req, res));
app.post('/voyageDetails', (req: Request, res: Response) => voyageDetailController.createVoyageDetail(req, res));
app.put('/voyageDetails/:id', (req: Request, res: Response) => voyageDetailController.updateVoyageDetail(req, res));
app.delete('/voyageDetails/:id', (req: Request, res: Response) => voyageDetailController.deleteVoyageDetail(req, res));

// ServiceDetail routes
app.get('/serviceDetails', (req: Request, res: Response) => serviceDetailController.getAllServiceDetails(req, res));
app.get('/serviceDetails/:id', (req: Request, res: Response) => serviceDetailController.getServiceDetailById(req, res));
app.post('/serviceDetails', (req: Request, res: Response) => serviceDetailController.createServiceDetail(req, res));
app.put('/serviceDetails/:id', (req: Request, res: Response) => serviceDetailController.updateServiceDetail(req, res));
app.delete('/serviceDetails/:id', (req: Request, res: Response) => serviceDetailController.deleteServiceDetail(req, res));

// DriverProfile routes
app.get('/driverProfiles', (req: Request, res: Response) => driverProfileController.getAllDriverProfiles(req, res));
app.get('/driverProfiles/:id', (req: Request, res: Response) => driverProfileController.getDriverProfileById(req, res));
app.post('/driverProfiles', (req: Request, res: Response) => driverProfileController.createDriverProfile(req, res));
app.put('/driverProfiles/:id', (req: Request, res: Response) => driverProfileController.updateDriverProfile(req, res));
app.delete('/driverProfiles/:id', (req: Request, res: Response) => driverProfileController.deleteDriverProfile(req, res));

// MechanicDirectory routes
app.get('/mechanicDirectorys', (req: Request, res: Response) => mechanicDirectoryController.getAllMechanicDirectorys(req, res));
app.get('/mechanicDirectorys/:id', (req: Request, res: Response) => mechanicDirectoryController.getMechanicDirectoryById(req, res));
app.post('/mechanicDirectorys', (req: Request, res: Response) => mechanicDirectoryController.createMechanicDirectory(req, res));
app.put('/mechanicDirectorys/:id', (req: Request, res: Response) => mechanicDirectoryController.updateMechanicDirectory(req, res));
app.delete('/mechanicDirectorys/:id', (req: Request, res: Response) => mechanicDirectoryController.deleteMechanicDirectory(req, res));

// FreightDetail routes
app.get('/freightDetails', (req: Request, res: Response) => freightDetailController.getAllFreightDetails(req, res));
app.get('/freightDetails/:id', (req: Request, res: Response) => freightDetailController.getFreightDetailById(req, res));
app.post('/freightDetails', (req: Request, res: Response) => freightDetailController.createFreightDetail(req, res));
app.put('/freightDetails/:id', (req: Request, res: Response) => freightDetailController.updateFreightDetail(req, res));
app.delete('/freightDetails/:id', (req: Request, res: Response) => freightDetailController.deleteFreightDetail(req, res));

// EmployeeList routes
app.get('/employeeLists', (req: Request, res: Response) => employeeListController.getAllEmployeeLists(req, res));
app.get('/employeeLists/:id', (req: Request, res: Response) => employeeListController.getEmployeeListById(req, res));
app.post('/employeeLists', (req: Request, res: Response) => employeeListController.createEmployeeList(req, res));
app.put('/employeeLists/:id', (req: Request, res: Response) => employeeListController.updateEmployeeList(req, res));
app.delete('/employeeLists/:id', (req: Request, res: Response) => employeeListController.deleteEmployeeList(req, res));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
