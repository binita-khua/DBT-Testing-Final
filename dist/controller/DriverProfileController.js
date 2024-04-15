import { DriverProfileService } from '../services/DriverProfileService.js';
export class DriverProfileController {
    driverProfileService;
    constructor() {
        this.driverProfileService = new DriverProfileService();
    }
    async getAllDriverProfiles(req, res) {
        const driverProfiles = await this.driverProfileService.findAll();
        res.json(driverProfiles);
    }
    async getDriverProfileById(req, res) {
        const id = parseInt(req.params.id);
        const driverProfile = await this.driverProfileService.findById(id);
        if (driverProfile) {
            res.json(driverProfile);
        }
        else {
            res.status(404).send('DriverProfile not found');
        }
    }
    async createDriverProfile(req, res) {
        const newDriverProfile = await this.driverProfileService.create(req.body);
        res.status(201).json(newDriverProfile);
    }
    async updateDriverProfile(req, res) {
        const id = parseInt(req.params.id);
        const updatedDriverProfile = await this.driverProfileService.update(id, req.body);
        if (updatedDriverProfile) {
            res.json(updatedDriverProfile);
        }
        else {
            res.status(404).send('DriverProfile not found');
        }
    }
    async deleteDriverProfile(req, res) {
        const id = parseInt(req.params.id);
        await this.driverProfileService.delete(id);
        res.status(204).send();
    }
}
//# sourceMappingURL=DriverProfileController.js.map