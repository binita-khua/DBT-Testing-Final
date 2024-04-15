import { AppDataSource } from '../config/data-source';
import { CustomerList } from '../entity/CustomerList';

export class CustomerListService {
    private customerListRepo = AppDataSource.getRepository(CustomerList);

    async findAll() {
        return this.customerListRepo.find();
    }

    async findById(id: number) {
        return this.customerListRepo.findOneBy({ id });
    }

    async create(customerListData: Partial<CustomerList>) {
        const customerList = this.customerListRepo.create(customerListData);
        return this.customerListRepo.save(customerList);
    }

    async update(id: number, customerListData: Partial<CustomerList>) {
        let customerList = await this.findById(id);
        if (!customerList) return null;
        Object.assign(customerList, customerListData);
        return this.customerListRepo.save(customerList);
    }

    async delete(id: number) {
        return this.customerListRepo.delete(id);
    }
}
