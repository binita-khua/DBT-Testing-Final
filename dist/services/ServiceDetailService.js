import { AppDataSource } from '../config/data-source.js';
import { ServiceDetail } from '../entity/ServiceDetail.js';
export class ServiceDetailService {
    serviceDetailRepo = AppDataSource.getRepository(ServiceDetail);
    async findAll() {
        return this.serviceDetailRepo.find({ relations: ['truckList', 'mechanicDirectory'] });
    }
    async findById(id) {
        return this.serviceDetailRepo.findOneBy({ id });
    }
    async create(serviceDetailData) {
        const serviceDetail = this.serviceDetailRepo.create(serviceDetailData);
        return this.serviceDetailRepo.save(serviceDetail);
    }
    async update(id, serviceDetailData) {
        let serviceDetail = await this.findById(id);
        if (!serviceDetail)
            return null;
        Object.assign(serviceDetail, serviceDetailData);
        return this.serviceDetailRepo.save(serviceDetail);
    }
    async delete(id) {
        return this.serviceDetailRepo.delete(id);
    }
}
//# sourceMappingURL=ServiceDetailService.js.map