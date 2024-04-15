import { AppDataSource } from '../config/data-source.js';
import { DriverProfile } from '../entity/DriverProfile.js';
export class DriverProfileService {
    driverProfileRepo = AppDataSource.getRepository(DriverProfile);
    async findAll() {
        return this.driverProfileRepo.find();
    }
    async findById(id) {
        return this.driverProfileRepo.findOneBy({ id });
    }
    async create(driverProfileData) {
        const driverProfile = this.driverProfileRepo.create(driverProfileData);
        return this.driverProfileRepo.save(driverProfile);
    }
    async update(id, driverProfileData) {
        let driverProfile = await this.findById(id);
        if (!driverProfile)
            return null;
        Object.assign(driverProfile, driverProfileData);
        return this.driverProfileRepo.save(driverProfile);
    }
    async delete(id) {
        return this.driverProfileRepo.delete(id);
    }
}
//# sourceMappingURL=DriverProfileService.js.map