import request from 'supertest';
import { app } from '../../app';
import { AppDataSource } from '../../config/data-source';
import { ServiceDetail } from '../../entity/ServiceDetail';
import { TruckList } from '../../entity/TruckList';
import { MechanicDirectory } from '../../entity/MechanicDirectory';

describe('ServiceDetailController Integration Tests', () => {
  let truckListId: number;
  let mechanicDirectoryId: number; 

  beforeAll(async () => {
    await AppDataSource.initialize();
    const truckList = new TruckList();
    truckList.brand = "Parker";
    truckList.load = 5000;
    truckList.capacity = 10000;
    truckList.year = 2020;
    truckList.numberOfRepairs = 2;
    const savedTruck = await AppDataSource.getRepository(TruckList).save(truckList);
    truckListId = savedTruck.id;
    const mechanicDirectory = new MechanicDirectory();
    mechanicDirectory.name = "Erin";
    mechanicDirectory.surname = "Fletcher";
    mechanicDirectory.seniority = 5;
    mechanicDirectory.role = "Mechanic"
    mechanicDirectory.brandSpecialization = "Parker";
    const savedMechanic = await AppDataSource.getRepository(MechanicDirectory).save(mechanicDirectory);
    mechanicDirectoryId = savedMechanic.id;
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(ServiceDetail).clear();
  });

  afterAll(async () => {
    await AppDataSource.getRepository(TruckList).delete(truckListId);
    await AppDataSource.getRepository(MechanicDirectory).delete(mechanicDirectoryId);
    await AppDataSource.destroy();
  });



  it('GET /serviceDetails should return all serviceDetails', async () => {
    await request(app).post('/serviceDetails').send({
      truckListId: truckListId,
      mechanicDirectoryId: mechanicDirectoryId,
      estimatedTimeForRepair: 24
    });
    await request(app).post('/serviceDetails').send({
      truckListId: truckListId,
      mechanicDirectoryId: mechanicDirectoryId,
      estimatedTimeForRepair: 36
    });

    const response = await request(app)
      .get('/serviceDetails')
      .expect(200);

    expect(response.body.length).toBe(2);
  });

  it('GET /serviceDetails/:id should return a serviceDetail by id', async () => {
    const postResponse = await request(app)
      .post('/serviceDetails')
      .send({
        truckListId: truckListId,
        mechanicDirectoryId: mechanicDirectoryId,
        estimatedTimeForRepair: 12
      });

    const serviceDetailId = postResponse.body.id;
    const response = await request(app)
      .get(`/serviceDetails/${serviceDetailId}`)
      .expect(200);

    expect(response.body.id).toBe(serviceDetailId);
    expect(response.body.estimatedTimeForRepair).toBe(12);
  });

  it('PUT /serviceDetails/:id should update a serviceDetail', async () => {
    const postResponse = await request(app)
      .post('/serviceDetails')
      .send({
        truckListId: truckListId,
        mechanicDirectoryId: mechanicDirectoryId,
        estimatedTimeForRepair: 12
      });

    const serviceDetailId = postResponse.body.id;
    const response = await request(app)
      .put(`/serviceDetails/${serviceDetailId}`)
      .send({
        truckListId: truckListId,
        mechanicDirectoryId: mechanicDirectoryId,
        estimatedTimeForRepair: 36
      })
      .expect(200);

    expect(response.body.estimatedTimeForRepair).toBe(36);
  });

  it('DELETE /serviceDetails/:id should delete a serviceDetail', async () => {
    const postResponse = await request(app)
      .post('/serviceDetails')
      .send({
        truckListId: truckListId,
        mechanicDirectoryId: mechanicDirectoryId,
        estimatedTimeForRepair: 12
      });

    const serviceDetailId = postResponse.body.id;
    await request(app)
      .delete(`/serviceDetails/${serviceDetailId}`)
      .expect(204);

    await request(app)
      .get(`/serviceDetails/${serviceDetailId}`)
      .expect(404); 
  });
});
