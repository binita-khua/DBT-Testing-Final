import { EmployeeListService } from '../../services/EmployeeListService';
import { EmployeeList } from '../../entity/EmployeeList';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('EmployeeListService', () => {
  let employeeListService: EmployeeListService;

  beforeEach(() => {
    jest.clearAllMocks();
    employeeListService = new EmployeeListService();
  });

  it('should find all employeeLists', async () => {
    const employeeListArray: EmployeeList[] = [new EmployeeList(), new EmployeeList()];
    mockRepository.find.mockResolvedValue(employeeListArray);
    const employeeLists = await employeeListService.findAll();
    expect(employeeLists).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find an employeeList by id', async () => {
    const employeeList = new EmployeeList();
    employeeList.id = 1;
    mockRepository.findOneBy.mockResolvedValue(employeeList);
    const result = await employeeListService.findById(1);
    expect(result).toEqual(employeeList);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new employeeList', async () => {
    const employeeListData = { name: 'Erin Fletcher', surname: 'Fletcher', seniority: 5 };
    const employeeList = new EmployeeList();
    Object.assign(employeeList, employeeListData);

    mockRepository.create.mockReturnValue(employeeList);
    mockRepository.save.mockResolvedValue(employeeList);

    const newEmployeeList = await employeeListService.create(employeeListData);
    expect(newEmployeeList).toMatchObject(employeeListData);
    expect(mockRepository.create).toHaveBeenCalledWith(employeeListData);
    expect(mockRepository.save).toHaveBeenCalledWith(employeeList);
  });

  it('should update an existing employeeList', async () => {
    const employeeListData = { id: 1, name: 'Erin Fletcher Updated', surname: 'Fletcher', seniority: 5 };
    const employeeList = new EmployeeList();
    Object.assign(employeeList, employeeListData);

    mockRepository.findOneBy.mockResolvedValue(employeeList);
    mockRepository.save.mockResolvedValue(employeeList);

    const updatedEmployeeList = await employeeListService.update(employeeList.id, { name: 'Erin Fletcher Updated' });
    expect(updatedEmployeeList).toMatchObject(employeeListData);
    expect(mockRepository.save).toHaveBeenCalledWith(employeeList);
  });

  it('should delete an employeeList', async () => {
    const employeeListId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await employeeListService.delete(employeeListId);
    expect(mockRepository.delete).toHaveBeenCalledWith(employeeListId);
  });
});
