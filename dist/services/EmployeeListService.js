import { AppDataSource } from '../config/data-source.js';
import { EmployeeList } from '../entity/EmployeeList.js';
export class EmployeeListService {
    employeeListRepo = AppDataSource.getRepository(EmployeeList);
    async findAll() {
        return this.employeeListRepo.find();
    }
    async findById(id) {
        return this.employeeListRepo.findOneBy({ id });
    }
    async create(employeeListData) {
        const employeeList = this.employeeListRepo.create(employeeListData);
        return this.employeeListRepo.save(employeeList);
    }
    async update(id, employeeListData) {
        let employeeList = await this.findById(id);
        if (!employeeList)
            return null;
        Object.assign(employeeList, employeeListData);
        return this.employeeListRepo.save(employeeList);
    }
    async delete(id) {
        return this.employeeListRepo.delete(id);
    }
}
//# sourceMappingURL=EmployeeListService.js.map