import { Request, Response } from 'express';
import { CustomerListService } from '../services/CustomerListService';

export class CustomerListController {
    private customerListService: CustomerListService;

    constructor() {
        this.customerListService = new CustomerListService();
    }

     async  getAllCustomerLists(req: Request, res: Response): Promise<void> {
        const customerLists = await this.customerListService.findAll();
        res.json(customerLists);
    }

     async  getCustomerListById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const customerList = await this.customerListService.findById(id);
        if (customerList) {
            res.json(customerList);
        } else {
            res.status(404).send('CustomerList not found');
        }
    }

     async  createCustomerList(req: Request, res: Response): Promise<void> {
        const newCustomerList = await this.customerListService.create(req.body);
        res.status(201).json(newCustomerList);
    }

     async  updateCustomerList(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const updatedCustomerList = await this.customerListService.update(id, req.body);
        if (updatedCustomerList) {
            res.json(updatedCustomerList);
        } else {
            res.status(404).send('CustomerList not found');
        }
    }

     async  deleteCustomerList(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        await this.customerListService.delete(id);
        res.status(204).send();
    }
}