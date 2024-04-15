import { DriverProfileService } from '../../services/DriverProfileService';
import { DriverProfile } from '../../entity/DriverProfile';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('DriverProfileService', () => {
  let driverProfileService: DriverProfileService;

  beforeEach(() => {
    jest.clearAllMocks();
    driverProfileService = new DriverProfileService();
  });

  it('should find all driverProfiles', async () => {
    const driverProfileArray: DriverProfile[] = [new DriverProfile(), new DriverProfile()];
    mockRepository.find.mockResolvedValue(driverProfileArray);
    const driverProfiles = await driverProfileService.findAll();
    expect(driverProfiles).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a driverProfile by id', async () => {
    const driverProfile = new DriverProfile();
    driverProfile.id = 1;
    mockRepository.findOneBy.mockResolvedValue(driverProfile);
    const result = await driverProfileService.findById(1);
    expect(result).toEqual(driverProfile);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new driverProfile', async () => {
    const driverProfileData = { name: 'Erin Fletcher', surname: 'Fletcher', seniority: 5, category: 'B' };
    const driverProfile = new DriverProfile();
    Object.assign(driverProfile, driverProfileData);

    mockRepository.create.mockReturnValue(driverProfile);
    mockRepository.save.mockResolvedValue(driverProfile);

    const newDriverProfile = await driverProfileService.create(driverProfileData);
    expect(newDriverProfile).toMatchObject(driverProfileData);
    expect(mockRepository.create).toHaveBeenCalledWith(driverProfileData);
    expect(mockRepository.save).toHaveBeenCalledWith(driverProfile);
  });

  it('should update an existing driverProfile', async () => {
    const driverProfileData = { id: 1, name: 'Erin Fletcher Updated', surname: 'Fletcher', seniority: 5, category: 'B' };
    const driverProfile = new DriverProfile();
    Object.assign(driverProfile, driverProfileData);

    mockRepository.findOneBy.mockResolvedValue(driverProfile);
    mockRepository.save.mockResolvedValue(driverProfile);

    const updatedDriverProfile = await driverProfileService.update(driverProfile.id, { name: 'Erin Fletcher Updated' });
    expect(updatedDriverProfile).toMatchObject(driverProfileData);
    expect(mockRepository.save).toHaveBeenCalledWith(driverProfile);
  });

  it('should delete a driverProfile', async () => {
    const driverProfileId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await driverProfileService.delete(driverProfileId);
    expect(mockRepository.delete).toHaveBeenCalledWith(driverProfileId);
  });
});
