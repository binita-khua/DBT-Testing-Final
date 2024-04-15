import { Request, Response } from 'express';
import { ServiceDetailService } from '../services/ServiceDetailService';

export class ServiceDetailController{
    private serviceDetailService: ServiceDetailService;

    constructor() {
        this.serviceDetailService = new ServiceDetailService();
    }

     async  getAllServiceDetails(req: Request, res: Response) {
        const serviceDetails = await this.serviceDetailService.findAll();
        res.json(serviceDetails);
    }

     async  getServiceDetailById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const serviceDetail = await this.serviceDetailService.findById(id);
        if (serviceDetail) {
            res.json(serviceDetail);
        } else {
            res.status(404).send('ServiceDetail not found');
        }
    }

     async  createServiceDetail(req: Request, res: Response) {
        const newServiceDetail = await this.serviceDetailService.create(req.body);
        res.status(201).json(newServiceDetail);
    }

     async  updateServiceDetail(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updatedServiceDetail = await this.serviceDetailService.update(id, req.body);
        if (updatedServiceDetail) {
            res.json(updatedServiceDetail);
        } else {
            res.status(404).send('ServiceDetail not found');
        }
    }

     async  deleteServiceDetail(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.serviceDetailService.delete(id);
        res.status(204).send();
    }
}