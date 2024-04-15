import express from 'express';
import { AppDataSource } from './config/data-source.js';
import { VoyageDetailController } from './controller/VoyageDetailController.js';
import { ServiceDetailController } from './controller/ServiceDetailController.js';
import { DriverProfileController } from './controller/DriverProfileController.js';
import { MechanicDirectoryController } from './controller/MechanicDirectoryController.js';
import { FreightDetailController } from './controller/FreightDetailController.js';
import { CustomerListController } from './controller/CustomerListController.js';
import { EmployeeListController } from './controller/EmployeeListController.js';
import { TruckListController } from './controller/TruckListController.js';
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
app.get('/truckLists', (req, res) => truckListController.getAllTruckLists(req, res));
app.get('/truckLists/:id', (req, res) => truckListController.getTruckListById(req, res));
app.post('/truckLists', (req, res) => truckListController.createTruckList(req, res));
app.put('/truckLists/:id', (req, res) => truckListController.updateTruckList(req, res));
app.delete('/truckLists/:id', (req, res) => truckListController.deleteTruckList(req, res));
// CustomerList routes
app.get('/customerLists', (req, res) => customerListController.getAllCustomerLists(req, res));
app.get('/customerLists/:id', (req, res) => customerListController.getCustomerListById(req, res));
app.post('/customerLists', (req, res) => customerListController.createCustomerList(req, res));
app.put('/customerLists/:id', (req, res) => customerListController.updateCustomerList(req, res));
app.delete('/customerLists/:id', (req, res) => customerListController.deleteCustomerList(req, res));
// VoyageDetail routes
app.get('/voyageDetails', (req, res) => voyageDetailController.getAllVoyageDetails(req, res));
app.get('/voyageDetails/:id', (req, res) => voyageDetailController.getVoyageDetailById(req, res));
app.post('/voyageDetails', (req, res) => voyageDetailController.createVoyageDetail(req, res));
app.put('/voyageDetails/:id', (req, res) => voyageDetailController.updateVoyageDetail(req, res));
app.delete('/voyageDetails/:id', (req, res) => voyageDetailController.deleteVoyageDetail(req, res));
// ServiceDetail routes
app.get('/serviceDetails', (req, res) => serviceDetailController.getAllServiceDetails(req, res));
app.get('/serviceDetails/:id', (req, res) => serviceDetailController.getServiceDetailById(req, res));
app.post('/serviceDetails', (req, res) => serviceDetailController.createServiceDetail(req, res));
app.put('/serviceDetails/:id', (req, res) => serviceDetailController.updateServiceDetail(req, res));
app.delete('/serviceDetails/:id', (req, res) => serviceDetailController.deleteServiceDetail(req, res));
// DriverProfile routes
app.get('/driverProfiles', (req, res) => driverProfileController.getAllDriverProfiles(req, res));
app.get('/driverProfiles/:id', (req, res) => driverProfileController.getDriverProfileById(req, res));
app.post('/driverProfiles', (req, res) => driverProfileController.createDriverProfile(req, res));
app.put('/driverProfiles/:id', (req, res) => driverProfileController.updateDriverProfile(req, res));
app.delete('/driverProfiles/:id', (req, res) => driverProfileController.deleteDriverProfile(req, res));
// MechanicDirectory routes
app.get('/mechanicDirectorys', (req, res) => mechanicDirectoryController.getAllMechanicDirectorys(req, res));
app.get('/mechanicDirectorys/:id', (req, res) => mechanicDirectoryController.getMechanicDirectoryById(req, res));
app.post('/mechanicDirectorys', (req, res) => mechanicDirectoryController.createMechanicDirectory(req, res));
app.put('/mechanicDirectorys/:id', (req, res) => mechanicDirectoryController.updateMechanicDirectory(req, res));
app.delete('/mechanicDirectorys/:id', (req, res) => mechanicDirectoryController.deleteMechanicDirectory(req, res));
// FreightDetail routes
app.get('/freightDetails', (req, res) => freightDetailController.getAllFreightDetails(req, res));
app.get('/freightDetails/:id', (req, res) => freightDetailController.getFreightDetailById(req, res));
app.post('/freightDetails', (req, res) => freightDetailController.createFreightDetail(req, res));
app.put('/freightDetails/:id', (req, res) => freightDetailController.updateFreightDetail(req, res));
app.delete('/freightDetails/:id', (req, res) => freightDetailController.deleteFreightDetail(req, res));
// EmployeeList routes
app.get('/employeeLists', (req, res) => employeeListController.getAllEmployeeLists(req, res));
app.get('/employeeLists/:id', (req, res) => employeeListController.getEmployeeListById(req, res));
app.post('/employeeLists', (req, res) => employeeListController.createEmployeeList(req, res));
app.put('/employeeLists/:id', (req, res) => employeeListController.updateEmployeeList(req, res));
app.delete('/employeeLists/:id', (req, res) => employeeListController.deleteEmployeeList(req, res));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
export default app;
//# sourceMappingURL=app.js.map