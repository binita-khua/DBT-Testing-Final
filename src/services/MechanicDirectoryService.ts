import { AppDataSource } from '../config/data-source';
import { MechanicDirectory } from '../entity/MechanicDirectory';

export class MechanicDirectoryService {
    private mechanicDirectoryRepo = AppDataSource.getRepository(MechanicDirectory);

    async findAll() {
        return this.mechanicDirectoryRepo.find();
    }

    async findById(id: number) {
        return this.mechanicDirectoryRepo.findOneBy({ id });
    }

    async create(mechanicDirectoryData: Partial<MechanicDirectory>) {
        const mechanicDirectory = this.mechanicDirectoryRepo.create(mechanicDirectoryData);
        return this.mechanicDirectoryRepo.save(mechanicDirectory);
    }

    async update(id: number, mechanicDirectoryData: Partial<MechanicDirectory>) {
        let mechanicDirectory = await this.findById(id);
        if (!mechanicDirectory) return null;
        Object.assign(mechanicDirectory, mechanicDirectoryData);
        return this.mechanicDirectoryRepo.save(mechanicDirectory);
    }

    async delete(id: number) {
        return this.mechanicDirectoryRepo.delete(id);
    }
}
