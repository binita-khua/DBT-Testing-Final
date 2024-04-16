import { AppDataSource } from '../config/data-source';
import { VoyageDetail } from '../entity/VoyageDetail';

export class VoyageDetailService {
    private voyageDetailRepo = AppDataSource.getRepository(VoyageDetail);

    async findAll() {
        return this.voyageDetailRepo.find({
            relations: ['truckList', 'driverProfiles', 'freightDetails'],
        });
    }

    async findById(id: number) {
        return this.voyageDetailRepo.findOneBy({
            id,
        });
    }

    async create(voyageDetailData: Partial<VoyageDetail>) {
        const voyageDetail = this.voyageDetailRepo.create(voyageDetailData);
        return this.voyageDetailRepo.save(voyageDetail);
    }

    async update(id: number, voyageDetailData: Partial<VoyageDetail>) {
        let voyageDetail = await this.findById(id);
        if (!voyageDetail) return null;
        Object.assign(voyageDetail, voyageDetailData);
        return this.voyageDetailRepo.save(voyageDetail);
    }

    async delete(id: number) {
        return this.voyageDetailRepo.delete(id);
    }
}
