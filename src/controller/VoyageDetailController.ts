import { Request, Response } from 'express';
import { VoyageDetailService } from '../services/VoyageDetailService';

export class VoyageDetailController{
    private voyageDetailService: VoyageDetailService;

    constructor() {
        this.voyageDetailService = new VoyageDetailService();
    }

    async  getAllVoyageDetails(req: Request, res: Response) {
        const voyageDetails = await this.voyageDetailService.findAll();
        res.json(voyageDetails);
    }

    async  getVoyageDetailById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const voyageDetail = await this.voyageDetailService.findById(id);
        if (voyageDetail) {
            res.json(voyageDetail);
        } else {
            res.status(404).send('VoyageDetail not found');
        }
    }

    async  createVoyageDetail(req: Request, res: Response) {
        const newVoyageDetail = await this.voyageDetailService.create(req.body);
        res.status(201).json(newVoyageDetail);
    }

    async  updateVoyageDetail(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updatedVoyageDetail = await this.voyageDetailService.update(id, req.body);
        if (updatedVoyageDetail) {
            res.json(updatedVoyageDetail);
        } else {
            res.status(404).send('VoyageDetail not found');
        }
    }

    async  deleteVoyageDetail(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.voyageDetailService.delete(id);
        res.status(204).send();
    }
}
