import { AppDataSource } from '../config/data-source.js';
import { CustomerList } from '../entity/CustomerList.js';
export class CustomerListService {
    customerListRepo = AppDataSource.getRepository(CustomerList);
    async findAll() {
        return this.customerListRepo.find();
    }
    async findById(id) {
        return this.customerListRepo.findOneBy({ id });
    }
    async create(customerListData) {
        const customerList = this.customerListRepo.create(customerListData);
        return this.customerListRepo.save(customerList);
    }
    async update(id, customerListData) {
        let customerList = await this.findById(id);
        if (!customerList)
            return null;
        Object.assign(customerList, customerListData);
        return this.customerListRepo.save(customerList);
    }
    async delete(id) {
        return this.customerListRepo.delete(id);
    }
}
//# sourceMappingURL=CustomerListService.js.map