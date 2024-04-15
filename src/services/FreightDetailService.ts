import { AppDataSource } from '../config/data-source';
import { FreightDetail } from '../entity/FreightDetail';

export class FreightDetailService {
    private freightDetailRepo = AppDataSource.getRepository(FreightDetail);

    async findAll() {
        return this.freightDetailRepo.find({
            relations: ['customerList'],
        });
    }

    async findById(id: number) {
        return this.freightDetailRepo.findOneBy({
            id,
        });
    }

    async create(freightDetailData: Partial<FreightDetail>) {
        const freightDetail = this.freightDetailRepo.create(freightDetailData);
        return this.freightDetailRepo.save(freightDetail);
    }

    async update(id: number, freightDetailData: Partial<FreightDetail>) {
        let freightDetail = await this.findById(id);
        if (!freightDetail) return null;
        Object.assign(freightDetail, freightDetailData);
        return this.freightDetailRepo.save(freightDetail);
    }

    async delete(id: number) {
        return this.freightDetailRepo.delete(id);
    }
}
