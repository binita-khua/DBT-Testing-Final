import { AppDataSource } from '../config/data-source';
import { ServiceDetail } from '../entity/ServiceDetail';

export class ServiceDetailService {
    private serviceDetailRepo = AppDataSource.getRepository(ServiceDetail);

    async findAll() {
        return this.serviceDetailRepo.find({ relations: ['truckList', 'mechanicDirectory'] });
    }

    async findById(id: number) {
        return this.serviceDetailRepo.findOneBy({ id });
    }

    async create(serviceDetailData: Partial<ServiceDetail>) {
        const serviceDetail = this.serviceDetailRepo.create(serviceDetailData);
        return this.serviceDetailRepo.save(serviceDetail);
    }

    async update(id: number, serviceDetailData: Partial<ServiceDetail>) {
        let serviceDetail = await this.findById(id);
        if (!serviceDetail) return null;
        Object.assign(serviceDetail, serviceDetailData);
        return this.serviceDetailRepo.save(serviceDetail);
    }

    async delete(id: number) {
        return this.serviceDetailRepo.delete(id);
    }
}
