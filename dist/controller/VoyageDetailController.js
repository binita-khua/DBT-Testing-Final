import { VoyageDetailService } from '../services/VoyageDetailService.js';
export class VoyageDetailController {
    voyageDetailService;
    constructor() {
        this.voyageDetailService = new VoyageDetailService();
    }
    async getAllVoyageDetails(req, res) {
        const voyageDetails = await this.voyageDetailService.findAll();
        res.json(voyageDetails);
    }
    async getVoyageDetailById(req, res) {
        const id = parseInt(req.params.id);
        const voyageDetail = await this.voyageDetailService.findById(id);
        if (voyageDetail) {
            res.json(voyageDetail);
        }
        else {
            res.status(404).send('VoyageDetail not found');
        }
    }
    async createVoyageDetail(req, res) {
        const newVoyageDetail = await this.voyageDetailService.create(req.body);
        res.status(201).json(newVoyageDetail);
    }
    async updateVoyageDetail(req, res) {
        const id = parseInt(req.params.id);
        const updatedVoyageDetail = await this.voyageDetailService.update(id, req.body);
        if (updatedVoyageDetail) {
            res.json(updatedVoyageDetail);
        }
        else {
            res.status(404).send('VoyageDetail not found');
        }
    }
    async deleteVoyageDetail(req, res) {
        const id = parseInt(req.params.id);
        await this.voyageDetailService.delete(id);
        res.status(204).send();
    }
}
//# sourceMappingURL=VoyageDetailController.js.map