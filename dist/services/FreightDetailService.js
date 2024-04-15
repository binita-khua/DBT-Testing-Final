import { AppDataSource } from '../config/data-source.js';
import { FreightDetail } from '../entity/FreightDetail.js';
export class FreightDetailService {
    freightDetailRepo = AppDataSource.getRepository(FreightDetail);
    async findAll() {
        return this.freightDetailRepo.find({
            relations: ['customerList'],
        });
    }
    async findById(id) {
        return this.freightDetailRepo.findOneBy({
            id,
        });
    }
    async create(freightDetailData) {
        const freightDetail = this.freightDetailRepo.create(freightDetailData);
        return this.freightDetailRepo.save(freightDetail);
    }
    async update(id, freightDetailData) {
        let freightDetail = await this.findById(id);
        if (!freightDetail)
            return null;
        Object.assign(freightDetail, freightDetailData);
        return this.freightDetailRepo.save(freightDetail);
    }
    async delete(id) {
        return this.freightDetailRepo.delete(id);
    }
}
//# sourceMappingURL=FreightDetailService.js.map