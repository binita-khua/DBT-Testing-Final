import { FreightDetailService } from '../../services/FreightDetailService';
import { FreightDetail } from '../../entity/FreightDetail';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('FreightDetailService', () => {
  let freightDetailService: FreightDetailService;

  beforeEach(() => {
    jest.clearAllMocks();
    freightDetailService = new FreightDetailService();
  });

  it('should find all freightDetails', async () => {
    const freightDetailArray: FreightDetail[] = [new FreightDetail(), new FreightDetail()];
    mockRepository.find.mockResolvedValue(freightDetailArray);
    const freightDetails = await freightDetailService.findAll();
    expect(freightDetails).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a freightDetail by id', async () => {
    const freightDetail = new FreightDetail();
    freightDetail.id = 1;
    mockRepository.findOneBy.mockResolvedValue(freightDetail);
    const result = await freightDetailService.findById(1);
    expect(result).toEqual(freightDetail);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new freightDetail', async () => {
    const freightDetailData = { origin: 'Origin', destination: 'Destination', name: 'FreightDetail 1' };
    const freightDetail = new FreightDetail();
    Object.assign(freightDetail, freightDetailData);

    mockRepository.create.mockReturnValue(freightDetail);
    mockRepository.save.mockResolvedValue(freightDetail);

    const newFreightDetail = await freightDetailService.create(freightDetailData);
    expect(newFreightDetail).toMatchObject(freightDetailData);
    expect(mockRepository.create).toHaveBeenCalledWith(freightDetailData);
    expect(mockRepository.save).toHaveBeenCalledWith(freightDetail);
  });

  it('should update an existing freightDetail', async () => {
    const freightDetailData = { id: 1, origin: 'Origin Updated', destination: 'Destination', name: 'FreightDetail 1' };
    const freightDetail = new FreightDetail();
    Object.assign(freightDetail, freightDetailData);

    mockRepository.findOneBy.mockResolvedValue(freightDetail);
    mockRepository.save.mockResolvedValue(freightDetail);

    const updatedFreightDetail = await freightDetailService.update(freightDetail.id, { origin: 'Origin Updated' });
    expect(updatedFreightDetail).toMatchObject(freightDetailData);
    expect(mockRepository.save).toHaveBeenCalledWith(freightDetail);
  });

  it('should delete a freightDetail', async () => {
    const freightDetailId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await freightDetailService.delete(freightDetailId);
    expect(mockRepository.delete).toHaveBeenCalledWith(freightDetailId);
  });
});
