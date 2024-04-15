import { ServiceDetailService } from '../../services/ServiceDetailService';
import { ServiceDetail } from '../../entity/ServiceDetail';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('ServiceDetailService', () => {
  let serviceDetailService: ServiceDetailService;

  beforeEach(() => {
    jest.clearAllMocks();
    serviceDetailService = new ServiceDetailService();
  });

  it('should find all serviceDetails', async () => {
    const serviceDetailArray: ServiceDetail[] = [new ServiceDetail(), new ServiceDetail()];
    mockRepository.find.mockResolvedValue(serviceDetailArray);
    const serviceDetails = await serviceDetailService.findAll();
    expect(serviceDetails).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a serviceDetail by id', async () => {
    const serviceDetail = new ServiceDetail();
    serviceDetail.id = 1;
    mockRepository.findOneBy.mockResolvedValue(serviceDetail);
    const result = await serviceDetailService.findById(1);
    expect(result).toEqual(serviceDetail);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new serviceDetail', async () => {
    const serviceDetailData = { mechanicDirectoryId: 1, truckListId: 1, estimatedTimeForRepair: 2 };
    const serviceDetail = new ServiceDetail();
    Object.assign(serviceDetail, serviceDetailData);

    mockRepository.create.mockReturnValue(serviceDetail);
    mockRepository.save.mockResolvedValue(serviceDetail);

    const newServiceDetail = await serviceDetailService.create(serviceDetailData);
    expect(newServiceDetail).toMatchObject(serviceDetailData);
    expect(mockRepository.create).toHaveBeenCalledWith(serviceDetailData);
    expect(mockRepository.save).toHaveBeenCalledWith(serviceDetail);
  });

  it('should update an existing serviceDetail', async () => {
    const serviceDetailData = { id: 1, mechanicDirectoryId: 1, truckListId: 1, estimatedTimeForRepair: 2 };
    const serviceDetail = new ServiceDetail();
    Object.assign(serviceDetail, serviceDetailData);

    mockRepository.findOneBy.mockResolvedValue(serviceDetail);
    mockRepository.save.mockResolvedValue(serviceDetail);

    const updatedServiceDetail = await serviceDetailService.update(serviceDetail.id, { estimatedTimeForRepair: 2 });
    expect(updatedServiceDetail).toMatchObject(serviceDetailData);
    expect(mockRepository.save).toHaveBeenCalledWith(serviceDetail);
  });

  it('should delete a serviceDetail', async () => {
    const serviceDetailId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await serviceDetailService.delete(serviceDetailId);
    expect(mockRepository.delete).toHaveBeenCalledWith(serviceDetailId);
  });
});
