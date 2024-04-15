import { AppDataSource } from '../config/data-source.js';
import { TruckList } from '../entity/TruckList.js';
export class TruckListService {
    truckListRepo = AppDataSource.getRepository(TruckList);
    async findAll() {
        return this.truckListRepo.find();
    }
    async findById(id) {
        return this.truckListRepo.findOneBy({ id });
    }
    async create(truckListData) {
        const truckList = this.truckListRepo.create(truckListData);
        return this.truckListRepo.save(truckList);
    }
    async update(id, truckListData) {
        let truckList = await this.findById(id);
        if (!truckList)
            return null;
        Object.assign(truckList, truckListData);
        return this.truckListRepo.save(truckList);
    }
    async delete(id) {
        return this.truckListRepo.delete(id);
    }
}
//# sourceMappingURL=TruckListService.js.map