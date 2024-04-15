import { TruckListService } from '../services/TruckListService.js';
export class TruckListController {
    truckListService;
    constructor() {
        this.truckListService = new TruckListService();
    }
    async getAllTruckLists(req, res) {
        const truckLists = await this.truckListService.findAll();
        res.json(truckLists);
    }
    async getTruckListById(req, res) {
        const id = parseInt(req.params.id);
        const truckList = await this.truckListService.findById(id);
        if (truckList) {
            res.json(truckList);
        }
        else {
            res.status(404).send('TruckList not found');
        }
    }
    async createTruckList(req, res) {
        const newTruckList = await this.truckListService.create(req.body);
        res.status(201).json(newTruckList);
    }
    async updateTruckList(req, res) {
        const id = parseInt(req.params.id);
        const updatedTruckList = await this.truckListService.update(id, req.body);
        if (updatedTruckList) {
            res.json(updatedTruckList);
        }
        else {
            res.status(404).send('TruckList not found');
        }
    }
    async deleteTruckList(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.truckListService.delete(id);
        if (result) {
            res.status(204).send();
        }
        else {
            res.status(404).send('TruckList not found');
        }
    }
}
//# sourceMappingURL=TruckListController.js.map