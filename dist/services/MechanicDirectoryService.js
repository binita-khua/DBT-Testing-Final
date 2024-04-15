import { AppDataSource } from '../config/data-source.js';
import { MechanicDirectory } from '../entity/MechanicDirectory.js';
export class MechanicDirectoryService {
    mechanicDirectoryRepo = AppDataSource.getRepository(MechanicDirectory);
    async findAll() {
        return this.mechanicDirectoryRepo.find();
    }
    async findById(id) {
        return this.mechanicDirectoryRepo.findOneBy({ id });
    }
    async create(mechanicDirectoryData) {
        const mechanicDirectory = this.mechanicDirectoryRepo.create(mechanicDirectoryData);
        return this.mechanicDirectoryRepo.save(mechanicDirectory);
    }
    async update(id, mechanicDirectoryData) {
        let mechanicDirectory = await this.findById(id);
        if (!mechanicDirectory)
            return null;
        Object.assign(mechanicDirectory, mechanicDirectoryData);
        return this.mechanicDirectoryRepo.save(mechanicDirectory);
    }
    async delete(id) {
        return this.mechanicDirectoryRepo.delete(id);
    }
}
//# sourceMappingURL=MechanicDirectoryService.js.map