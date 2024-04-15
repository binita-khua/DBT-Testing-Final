import { Request, Response } from 'express';
import { MechanicDirectoryService } from '../services/MechanicDirectoryService';


export class MechanicDirectoryController{
    private mechanicDirectoryService: MechanicDirectoryService;

    constructor() {
        this.mechanicDirectoryService = new MechanicDirectoryService();
    }

     async  getAllMechanicDirectorys(req: Request, res: Response) {
        const mechanicDirectorys = await this.mechanicDirectoryService.findAll();
        res.json(mechanicDirectorys);
    }

     async  getMechanicDirectoryById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const mechanicDirectory = await this.mechanicDirectoryService.findById(id);
        if (mechanicDirectory) {
            res.json(mechanicDirectory);
        } else {
            res.status(404).send('MechanicDirectory not found');
        }
    }

     async  createMechanicDirectory(req: Request, res: Response) {
        const newMechanicDirectory = await this.mechanicDirectoryService.create(req.body);
        res.status(201).json(newMechanicDirectory);
    }

     async  updateMechanicDirectory(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updatedMechanicDirectory = await this.mechanicDirectoryService.update(id, req.body);
        if (updatedMechanicDirectory) {
            res.json(updatedMechanicDirectory);
        } else {
            res.status(404).send('MechanicDirectory not found');
        }
    }

     async  deleteMechanicDirectory(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.mechanicDirectoryService.delete(id);
        res.status(204).send();
    }
}