import { CustomerListService } from '../../services/CustomerListService';
import { CustomerList } from '../../entity/CustomerList';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('CustomerListService', () => {
  let customerListService: CustomerListService;

  beforeEach(() => {
    jest.clearAllMocks();
    customerListService = new CustomerListService();
  });

  it('should find all customerLists', async () => {
    const customerListArray: CustomerList[] = [new CustomerList(), new CustomerList()];
    mockRepository.find.mockResolvedValue(customerListArray);
    const customerLists = await customerListService.findAll();
    expect(customerLists).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a customerList by id', async () => {
    const customerList = new CustomerList();
    customerList.id = 1;
    mockRepository.findOneBy.mockResolvedValue(customerList);
    const result = await customerListService.findById(1);
    expect(result).toEqual(customerList);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new customerList', async () => {
    const customerListData = { name: 'Erin Fletcher', address: '719 Katherine Flats St', phoneNumber1: '555-9717', phoneNumber2: '829-4986' };
    const customerList = new CustomerList();
    Object.assign(customerList, customerListData);

    mockRepository.create.mockReturnValue(customerList);
    mockRepository.save.mockResolvedValue(customerList);

    const newCustomerList = await customerListService.create(customerListData);
    expect(newCustomerList).toMatchObject(customerListData);
    expect(mockRepository.create).toHaveBeenCalledWith(customerListData);
    expect(mockRepository.save).toHaveBeenCalledWith(customerList);
  });

  it('should update an existing customerList', async () => {
    const customerListData = { id: 1, name: 'Erin Fletcher Updated', address: '719 Katherine Flats St', phoneNumber1: '555-9717', phoneNumber2: '829-4986' };
    const customerList = new CustomerList();
    Object.assign(customerList, customerListData);

    mockRepository.findOneBy.mockResolvedValue(customerList);
    mockRepository.save.mockResolvedValue(customerList);

    const updatedCustomerList = await customerListService.update(customerList.id, { name: 'Erin Fletcher Updated' });
    expect(updatedCustomerList).toMatchObject(customerListData);
    expect(mockRepository.save).toHaveBeenCalledWith(customerList);
  });

  it('should delete a customerList', async () => {
    const customerListId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await customerListService.delete(customerListId);
    expect(mockRepository.delete).toHaveBeenCalledWith(customerListId);
  });
});
