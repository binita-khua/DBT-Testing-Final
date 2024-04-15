import { AppDataSource } from '../config/data-source';
import { DriverProfile } from '../entity/DriverProfile';

export class DriverProfileService {
    private driverProfileRepo = AppDataSource.getRepository(DriverProfile);

    async findAll() {
        return this.driverProfileRepo.find();
    }

    async findById(id: number) {
        return this.driverProfileRepo.findOneBy({ id });
    }

    async create(driverProfileData: Partial<DriverProfile>) {
        const driverProfile = this.driverProfileRepo.create(driverProfileData);
        return this.driverProfileRepo.save(driverProfile);
    }

    async update(id: number, driverProfileData: Partial<DriverProfile>) {
        let driverProfile = await this.findById(id);
        if (!driverProfile) return null;
        Object.assign(driverProfile, driverProfileData);
        return this.driverProfileRepo.save(driverProfile);
    }

    async delete(id: number) {
        return this.driverProfileRepo.delete(id);
    }
}
