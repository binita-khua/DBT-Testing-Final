import { TruckListService } from '../../services/TruckListService';
import { TruckList } from '../../entity/TruckList';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('TruckListService', () => {
  let truckListService: TruckListService;

  beforeEach(() => {
    jest.clearAllMocks();
    truckListService = new TruckListService();
  });

  it('should find all truckLists', async () => {
    const truckListArray: TruckList[] = [new TruckList(), new TruckList()];
    mockRepository.find.mockResolvedValue(truckListArray);
    const truckLists = await truckListService.findAll();
    expect(truckLists).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a truckList by id', async () => {
    const truckList = new TruckList();
    truckList.id = 1;
    mockRepository.findOneBy.mockResolvedValue(truckList);
    const result = await truckListService.findById(1);
    expect(result).toEqual(truckList);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new truckList', async () => {
    const truckListData = { brand: 'Parker', load: 5000, capacity: 10000, year: 2022, numberOfRepairs: 0 };
    const truckList = new TruckList();
    Object.assign(truckList, truckListData);

    mockRepository.create.mockReturnValue(truckList);
    mockRepository.save.mockResolvedValue(truckList);

    const newTruckList = await truckListService.create(truckListData);
    expect(newTruckList).toMatchObject(truckListData);
    expect(mockRepository.create).toHaveBeenCalledWith(truckListData);
    expect(mockRepository.save).toHaveBeenCalledWith(truckList);
  });

  it('should update an existing truckList', async () => {
    const truckListData = { id: 1, brand: 'Parker Updated', load: 5000, capacity: 10000, year: 2022, numberOfRepairs: 0 };
    const truckList = new TruckList();
    Object.assign(truckList, truckListData);

    mockRepository.findOneBy.mockResolvedValue(truckList);
    mockRepository.save.mockResolvedValue(truckList);

    const updatedTruckList = await truckListService.update(truckList.id, { brand: 'Parker Updated' });
    expect(updatedTruckList).toMatchObject(truckListData);
    expect(mockRepository.save).toHaveBeenCalledWith(truckList);
  });

  it('should delete a truckList', async () => {
    const truckListId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await truckListService.delete(truckListId);
    expect(mockRepository.delete).toHaveBeenCalledWith(truckListId);
  });
});
