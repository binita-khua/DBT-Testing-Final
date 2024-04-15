import { ServiceDetailService } from '../services/ServiceDetailService.js';
export class ServiceDetailController {
    serviceDetailService;
    constructor() {
        this.serviceDetailService = new ServiceDetailService();
    }
    async getAllServiceDetails(req, res) {
        const serviceDetails = await this.serviceDetailService.findAll();
        res.json(serviceDetails);
    }
    async getServiceDetailById(req, res) {
        const id = parseInt(req.params.id);
        const serviceDetail = await this.serviceDetailService.findById(id);
        if (serviceDetail) {
            res.json(serviceDetail);
        }
        else {
            res.status(404).send('ServiceDetail not found');
        }
    }
    async createServiceDetail(req, res) {
        const newServiceDetail = await this.serviceDetailService.create(req.body);
        res.status(201).json(newServiceDetail);
    }
    async updateServiceDetail(req, res) {
        const id = parseInt(req.params.id);
        const updatedServiceDetail = await this.serviceDetailService.update(id, req.body);
        if (updatedServiceDetail) {
            res.json(updatedServiceDetail);
        }
        else {
            res.status(404).send('ServiceDetail not found');
        }
    }
    async deleteServiceDetail(req, res) {
        const id = parseInt(req.params.id);
        await this.serviceDetailService.delete(id);
        res.status(204).send();
    }
}
//# sourceMappingURL=ServiceDetailController.js.map