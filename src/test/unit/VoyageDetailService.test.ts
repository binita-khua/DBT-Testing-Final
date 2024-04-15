import { VoyageDetailService } from '../../services/VoyageDetailService';
import { VoyageDetail } from '../../entity/Trips';
import { AppDataSource } from '../../config/data-source';
import { DriverProfile } from '../../entity/DriverProfile';
import { FreightDetail } from '../../entity/FreightDetail';
import { TruckList } from '../../entity/TruckList';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};
const driverProfile1 = new DriverProfile();
const driverProfile2 = new DriverProfile();
const freightDetail1 = new FreightDetail();
const freightDetail2 = new FreightDetail();

const voyageDetailData = {
  route: 'Route 1',
  truckList: new TruckList(),
  driverProfiles: [driverProfile1, driverProfile2], 
  freightDetails: [freightDetail1, freightDetail2], 
};
(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('VoyageDetailService', () => {
  let voyageDetailService: VoyageDetailService;

  beforeEach(() => {
    jest.clearAllMocks();
    voyageDetailService = new VoyageDetailService();
  });

  it('should find all voyageDetails', async () => {
    const voyageDetailArray: VoyageDetail[] = [new VoyageDetail(), new VoyageDetail()];
    mockRepository.find.mockResolvedValue(voyageDetailArray);
    const voyageDetails = await voyageDetailService.findAll();
    expect(voyageDetails).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a voyageDetail by id', async () => {
    const voyageDetail = new VoyageDetail();
    voyageDetail.id = 1;
    mockRepository.findOneBy.mockResolvedValue(voyageDetail);
    const result = await voyageDetailService.findById(1);
    expect(result).toEqual(voyageDetail);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new voyageDetail', async () => {
    const voyageDetailData = { route: 'Route 1',  driverProfiles: [driverProfile1, driverProfile2 ], freightDetails: [freightDetail1, freightDetail2] };
    const voyageDetail = new VoyageDetail();
    Object.assign(voyageDetail, voyageDetailData);

    mockRepository.create.mockReturnValue(voyageDetail);
    mockRepository.save.mockResolvedValue(voyageDetail);

    const newVoyageDetail = await voyageDetailService.create(voyageDetailData);
    expect(newVoyageDetail).toMatchObject(voyageDetailData);
    expect(mockRepository.create).toHaveBeenCalledWith(voyageDetailData);
    expect(mockRepository.save).toHaveBeenCalledWith(voyageDetail);
  });

  it('should update an existing voyageDetail', async () => {
    const voyageDetailData = { id: 1, route: 'Route 1 Updated', driverProfiles: [driverProfile1, driverProfile2 ], freightDetails: [freightDetail1, freightDetail2] };
    const voyageDetail = new VoyageDetail();
    Object.assign(voyageDetail, voyageDetailData);

    mockRepository.findOneBy.mockResolvedValue(voyageDetail);
    mockRepository.save.mockResolvedValue(voyageDetail);

    const updatedVoyageDetail = await voyageDetailService.update(voyageDetail.id, { route: 'Route 1 Updated' });
    expect(updatedVoyageDetail).toMatchObject(voyageDetailData);
    expect(mockRepository.save).toHaveBeenCalledWith(voyageDetail);
  });

  it('should delete a voyageDetail', async () => {
    const voyageDetailId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await voyageDetailService.delete(voyageDetailId);
    expect(mockRepository.delete).toHaveBeenCalledWith(voyageDetailId);
  });
});
