import request from 'supertest';
import { app } from '../../app';
import { AppDataSource } from '../../config/data-source';
import { VoyageDetail } from '../../entity/VoyageDetail';
import { TruckList } from '../../entity/TruckList';
import { DriverProfile } from '../../entity/DriverProfile';
import { FreightDetail } from '../../entity/FreightDetail';

describe('VoyageDetailController Integration Tests', () => {
  let truckListId: number;
  let driverProfileId: number;
  let freightDetailId: number;

  beforeAll(async () => {
    await AppDataSource.initialize();
    const truckList = new TruckList();
    truckList.brand = "Parker";
    truckList.capacity = 5000;
    truckList.load = 10000;
    truckList.numberOfRepairs = 2;
    truckList.year = 2020;
    const savedTruck = await AppDataSource.getRepository(TruckList).save(truckList);
    truckListId = savedTruck.id;

    const driverProfile = new DriverProfile();
    driverProfile.name = "Erin";
    driverProfile.surname = "Fletcher";
    driverProfile.seniority = 5;
    driverProfile.role = 'Mechanic';
    driverProfile.category = "Class A";
    const savedDriver = await AppDataSource.getRepository(DriverProfile).save(driverProfile);
    driverProfileId = savedDriver.id;

    const freightDetail = new FreightDetail();
    freightDetail.weight = 1000;
    freightDetail.value = 2000.00;
    freightDetail.origin = "City A";
    freightDetail.destination = "City B";
    
    const savedShipment = await AppDataSource.getRepository(FreightDetail).save(freightDetail);
    freightDetailId = savedShipment.id;
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(VoyageDetail).clear();
  });

  afterAll(async () => {
    await AppDataSource.getRepository(TruckList).delete(truckListId);
    await AppDataSource.getRepository(DriverProfile).delete(driverProfileId);
    await AppDataSource.getRepository(FreightDetail).delete(freightDetailId);
    await AppDataSource.destroy();
  });

  it('GET /voyageDetails should return all voyageDetails', async () => {
    await request(app).post('/voyageDetails').send({
      route: "Route 101",
      truckListId: truckListId,
      driversIds: [driverProfileId],
      shipmentsIds: [freightDetailId]
    });

    const response = await request(app)
      .get('/voyageDetails')
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /voyageDetails/:id should return a voyageDetail by id', async () => {
    const postResponse = await request(app)
      .post('/voyageDetails')
      .send({
        route: "Route 202",
        truckListId: truckListId,
        driversIds: [driverProfileId],
        shipmentsIds: [freightDetailId]
      });

    const voyageDetailId = postResponse.body.id;
    const response = await request(app)
      .get(`/voyageDetails/${voyageDetailId}`)
      .expect(200);

    expect(response.body.id).toBe(voyageDetailId);
    expect(response.body.route).toBe("Route 202");
  });

  it('PUT /voyageDetails/:id should update a voyageDetail', async () => {
    const postResponse = await request(app)
      .post('/voyageDetails')
      .send({
        route: "Route 303",
        truckListId: truckListId,
        driversIds: [driverProfileId],
        shipmentsIds: [freightDetailId]
      });

    const voyageDetailId = postResponse.body.id;
    const response = await request(app)
      .put(`/voyageDetails/${voyageDetailId}`)
      .send({
        route: "Updated Route 303",
        truckListId: truckListId,
        driversIds: [driverProfileId],
        shipmentsIds: [freightDetailId]
      })
      .expect(200);

    expect(response.body.route).toBe("Updated Route 303");
  });

  it('DELETE /voyageDetails/:id should delete a voyageDetail', async () => {
    const postResponse = await request(app)
      .post('/voyageDetails')
      .send({
        route: "Route 404",
        truckListId: truckListId,
        driversIds: [driverProfileId],
        shipmentsIds: [freightDetailId]
      });

    const voyageDetailId = postResponse.body.id;
    await request(app)
      .delete(`/voyageDetails/${voyageDetailId}`)
      .expect(204);

    await request(app)
      .get(`/voyageDetails/${voyageDetailId}`)
      .expect(404);  
  });
});
