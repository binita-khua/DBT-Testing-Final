import { AppDataSource } from '../config/data-source';
import { EmployeeList } from '../entity/EmployeeList';

export class EmployeeListService {
    private employeeListRepo = AppDataSource.getRepository(EmployeeList);

    async findAll() {
        return this.employeeListRepo.find();
    }

    async findById(id: number) {
        return this.employeeListRepo.findOneBy({ id });
    }

    async create(employeeListData: Partial<EmployeeList>) {
        const employeeList = this.employeeListRepo.create(employeeListData);
        return this.employeeListRepo.save(employeeList);
    }

    async update(id: number, employeeListData: Partial<EmployeeList>) {
        let employeeList = await this.findById(id);
        if (!employeeList) return null;
        Object.assign(employeeList, employeeListData);
        return this.employeeListRepo.save(employeeList);
    }

    async delete(id: number) {
        return this.employeeListRepo.delete(id);
    }
}
