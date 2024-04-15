import { Request, Response } from 'express';
import { DriverProfileService } from '../services/DriverProfileService';


export class DriverProfileController{
    private driverProfileService: DriverProfileService;

    constructor() {
        this.driverProfileService = new DriverProfileService();
    }

     async  getAllDriverProfiles(req: Request, res: Response) {
        const driverProfiles = await this.driverProfileService.findAll();
        res.json(driverProfiles);
    }

     async  getDriverProfileById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const driverProfile = await this.driverProfileService.findById(id);
        if (driverProfile) {
            res.json(driverProfile);
        } else {
            res.status(404).send('DriverProfile not found');
        }
    }

     async  createDriverProfile(req: Request, res: Response) {
        const newDriverProfile = await this.driverProfileService.create(req.body);
        res.status(201).json(newDriverProfile);
    }

     async  updateDriverProfile(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updatedDriverProfile = await this.driverProfileService.update(id, req.body);
        if (updatedDriverProfile) {
            res.json(updatedDriverProfile);
        } else {
            res.status(404).send('DriverProfile not found');
        }
    }

     async  deleteDriverProfile(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.driverProfileService.delete(id);
        res.status(204).send();
    }
}