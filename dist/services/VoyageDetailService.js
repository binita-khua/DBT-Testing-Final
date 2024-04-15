import { AppDataSource } from '../config/data-source.js';
import { VoyageDetail } from '../entity/Trips.js';
export class VoyageDetailService {
    voyageDetailRepo = AppDataSource.getRepository(VoyageDetail);
    async findAll() {
        return this.voyageDetailRepo.find({
            relations: ['truckList', 'driverProfiles', 'freightDetails'],
        });
    }
    async findById(id) {
        return this.voyageDetailRepo.findOneBy({
            id,
        });
    }
    async create(voyageDetailData) {
        const voyageDetail = this.voyageDetailRepo.create(voyageDetailData);
        return this.voyageDetailRepo.save(voyageDetail);
    }
    async update(id, voyageDetailData) {
        let voyageDetail = await this.findById(id);
        if (!voyageDetail)
            return null;
        Object.assign(voyageDetail, voyageDetailData);
        return this.voyageDetailRepo.save(voyageDetail);
    }
    async delete(id) {
        return this.voyageDetailRepo.delete(id);
    }
}
//# sourceMappingURL=VoyageDetailService.js.map