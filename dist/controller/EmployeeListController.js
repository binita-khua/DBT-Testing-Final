import { EmployeeListService } from '../services/EmployeeListService.js';
export class EmployeeListController {
    employeeListService;
    constructor() {
        this.employeeListService = new EmployeeListService();
    }
    async getAllEmployeeLists(req, res) {
        const employeeLists = await this.employeeListService.findAll();
        res.json(employeeLists);
    }
    async getEmployeeListById(req, res) {
        const id = parseInt(req.params.id);
        const employeeList = await this.employeeListService.findById(id);
        if (employeeList) {
            res.json(employeeList);
        }
        else {
            res.status(404).send('EmployeeList not found');
        }
    }
    async createEmployeeList(req, res) {
        const newEmployeeList = await this.employeeListService.create(req.body);
        res.status(201).json(newEmployeeList);
    }
    async updateEmployeeList(req, res) {
        const id = parseInt(req.params.id);
        const updatedEmployeeList = await this.employeeListService.update(id, req.body);
        if (updatedEmployeeList) {
            res.json(updatedEmployeeList);
        }
        else {
            res.status(404).send('EmployeeList not found');
        }
    }
    async deleteEmployeeList(req, res) {
        const id = parseInt(req.params.id);
        await this.employeeListService.delete(id);
        res.status(204).send();
    }
}
//# sourceMappingURL=EmployeeListController.js.map