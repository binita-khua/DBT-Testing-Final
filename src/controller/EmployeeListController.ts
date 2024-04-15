import { Request, Response } from 'express';
import { EmployeeListService } from '../services/EmployeeListService';


export class EmployeeListController {
    private employeeListService: EmployeeListService;

    constructor() {
        this.employeeListService = new EmployeeListService();
    }

     async  getAllEmployeeLists(req: Request, res: Response) {
        const employeeLists = await this.employeeListService.findAll();
        res.json(employeeLists);
    }

     async  getEmployeeListById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const employeeList = await this.employeeListService.findById(id);
        if (employeeList) {
            res.json(employeeList);
        } else {
            res.status(404).send('EmployeeList not found');
        }
    }

     async  createEmployeeList(req: Request, res: Response) {
        const newEmployeeList = await this.employeeListService.create(req.body);
        res.status(201).json(newEmployeeList);
    }

     async  updateEmployeeList(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updatedEmployeeList = await this.employeeListService.update(id, req.body);
        if (updatedEmployeeList) {
            res.json(updatedEmployeeList);
        } else {
            res.status(404).send('EmployeeList not found');
        }
    }

     async  deleteEmployeeList(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.employeeListService.delete(id);
        res.status(204).send();
    }
}