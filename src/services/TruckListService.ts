import { AppDataSource } from '../config/data-source';
import { TruckList } from '../entity/TruckList';

export class TruckListService {
    private truckListRepo = AppDataSource.getRepository(TruckList);

    async findAll() { 
        return this.truckListRepo.find();
    }

    async findById(id: number) {
        return this.truckListRepo.findOneBy({ id });
    }

    async create(truckListData: Partial<TruckList>) {
        const truckList = this.truckListRepo.create(truckListData);
        return this.truckListRepo.save(truckList);
    }

    async update(id: number, truckListData: Partial<TruckList>) {
        let truckList = await this.findById(id);
        if (!truckList) return null;
        Object.assign(truckList, truckListData);
        return this.truckListRepo.save(truckList);
    }

    async delete(id: number) {
        return this.truckListRepo.delete(id);
    }
}
