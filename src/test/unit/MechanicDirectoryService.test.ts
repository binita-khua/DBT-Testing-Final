import { MechanicDirectoryService } from '../../services/MechanicDirectoryService';
import { MechanicDirectory } from '../../entity/MechanicDirectory';
import { AppDataSource } from '../../config/data-source';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => mockRepository);

describe('MechanicDirectoryService', () => {
  let mechanicDirectoryService: MechanicDirectoryService;

  beforeEach(() => {
    jest.clearAllMocks();
    mechanicDirectoryService = new MechanicDirectoryService();
  });

  it('should find all mechanicDirectorys', async () => {
    const mechanicDirectoryArray: MechanicDirectory[] = [new MechanicDirectory(), new MechanicDirectory()];
    mockRepository.find.mockResolvedValue(mechanicDirectoryArray);
    const mechanicDirectorys = await mechanicDirectoryService.findAll();
    expect(mechanicDirectorys).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find a mechanicDirectory by id', async () => {
    const mechanicDirectory = new MechanicDirectory();
    mechanicDirectory.id = 1;
    mockRepository.findOneBy.mockResolvedValue(mechanicDirectory);
    const result = await mechanicDirectoryService.findById(1);
    expect(result).toEqual(mechanicDirectory);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a new mechanicDirectory', async () => {
    const mechanicDirectoryData = { name: 'Erin Fletcher', surname: 'Fletcher', seniority: 5, brandSpecialization: 'Parker' };
    const mechanicDirectory = new MechanicDirectory();
    Object.assign(mechanicDirectory, mechanicDirectoryData);

    mockRepository.create.mockReturnValue(mechanicDirectory);
    mockRepository.save.mockResolvedValue(mechanicDirectory);

    const newMechanicDirectory = await mechanicDirectoryService.create(mechanicDirectoryData);
    expect(newMechanicDirectory).toMatchObject(mechanicDirectoryData);
    expect(mockRepository.create).toHaveBeenCalledWith(mechanicDirectoryData);
    expect(mockRepository.save).toHaveBeenCalledWith(mechanicDirectory);
  });

  it('should update an existing mechanicDirectory', async () => {
    const mechanicDirectoryData = { id: 1, name: 'Erin Fletcher Updated', surname: 'Fletcher', seniority: 5, brandSpecialization: 'Parker' };
    const mechanicDirectory = new MechanicDirectory();
    Object.assign(mechanicDirectory, mechanicDirectoryData);

    mockRepository.findOneBy.mockResolvedValue(mechanicDirectory);
    mockRepository.save.mockResolvedValue(mechanicDirectory);

    const updatedMechanicDirectory = await mechanicDirectoryService.update(mechanicDirectory.id, { name: 'Erin Fletcher Updated' });
    expect(updatedMechanicDirectory).toMatchObject(mechanicDirectoryData);
    expect(mockRepository.save).toHaveBeenCalledWith(mechanicDirectory);
  });

  it('should delete a mechanicDirectory', async () => {
    const mechanicDirectoryId = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await mechanicDirectoryService.delete(mechanicDirectoryId);
    expect(mockRepository.delete).toHaveBeenCalledWith(mechanicDirectoryId);
  });
});
