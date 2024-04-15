import { FreightDetailService } from '../services/FreightDetailService.js';
export class FreightDetailController {
    freightDetailService = new FreightDetailService();
    constructor() {
        this.freightDetailService = new FreightDetailService();
    }
    async getAllFreightDetails(req, res) {
        const freightDetails = await this.freightDetailService.findAll();
        res.json(freightDetails);
    }
    async getFreightDetailById(req, res) {
        const id = parseInt(req.params.id);
        const freightDetail = await this.freightDetailService.findById(id);
        if (freightDetail) {
            res.json(freightDetail);
        }
        else {
            res.status(404).send('FreightDetail not found');
        }
    }
    async createFreightDetail(req, res) {
        const newFreightDetail = await this.freightDetailService.create(req.body);
        res.status(201).json(newFreightDetail);
    }
    async updateFreightDetail(req, res) {
        const id = parseInt(req.params.id);
        const updatedFreightDetail = await this.freightDetailService.update(id, req.body);
        if (updatedFreightDetail) {
            res.json(updatedFreightDetail);
        }
        else {
            res.status(404).send('FreightDetail not found');
        }
    }
    async deleteFreightDetail(req, res) {
        const id = parseInt(req.params.id);
        await this.freightDetailService.delete(id);
        res.status(204).send();
    }
}
//# sourceMappingURL=FreightDetailController.js.map