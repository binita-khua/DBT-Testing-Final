import request from 'supertest';
import { app } from '../../app';
import { AppDataSource } from '../../config/data-source';
import { FreightDetail } from '../../entity/FreightDetail';
import { CustomerList } from '../../entity/CustomerList';

describe('FreightDetailController Integration Tests', () => {
  let customerListId: number;

  beforeAll(async () => {
    await AppDataSource.initialize();
    const customerList = new CustomerList();
    customerList.name = "Test CustomerList";
    customerList.address = "149 Hall Fords St";
    customerList.phoneNumber1 = "863-4880";
    customerList.phoneNumber2 = "129-1829";
    const savedCustomer = await AppDataSource.getRepository(CustomerList).save(customerList);
    customerListId = savedCustomer.id;
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(FreightDetail).clear();
  });

  afterAll(async () => {
    await AppDataSource.getRepository(CustomerList).delete(customerListId);
    await AppDataSource.destroy();
  });

  it('POST /freightDetails should create a new freightDetail', async () => {
    const freightDetailData = {
      customerListId: customerListId,
      weight: 500,
      value: 1500.00,
      origin: "City A",
      destination: "City B"
    };
    const response = await request(app)
      .post('/freightDetails')
      .send(freightDetailData)
      .expect(201);

    expect(response.body.weight).toBe(freightDetailData.weight);
    expect(response.body.value).toBe(freightDetailData.value);
  });

  it('GET /freightDetails should return all freightDetails', async () => {
    await request(app).post('/freightDetails').send({
      customerListId: customerListId,
      weight: 100,
      value: 300.00,
      origin: "City X",
      destination: "City Y"
    });
    await request(app).post('/freightDetails').send({
      customerListId: customerListId,
      weight: 200,
      value: 450.00,
      origin: "City Z",
      destination: "City W"
    });

    const response = await request(app)
      .get('/freightDetails')
      .expect(200);

    expect(response.body.length).toBe(2);
  });

  it('GET /freightDetails/:id should return a freightDetail by id', async () => {
    const postResponse = await request(app)
      .post('/freightDetails')
      .send({
        customerListId: customerListId,
        weight: 120,
        value: 500.00,
        origin: "City S",
        destination: "City T"
      });

    const freightDetailId = postResponse.body.id;
    const response = await request(app)
      .get(`/freightDetails/${freightDetailId}`)
      .expect(200);

    expect(response.body.id).toBe(freightDetailId);
    expect(response.body.origin).toBe("City S");
  });

  it('PUT /freightDetails/:id should update a freightDetail', async () => {
    const postResponse = await request(app)
      .post('/freightDetails')
      .send({
        customerListId: customerListId,
        weight: 130,
        value: 600.00,
        origin: "City U",
        destination: "City V"
      });

    const freightDetailId = postResponse.body.id;
    const response = await request(app)
      .put(`/freightDetails/${freightDetailId}`)
      .send({
        weight: 135,
        value: 650.00,
        origin: "City U Updated",
        destination: "City V Updated"
      })
      .expect(200);

    expect(response.body.weight).toBe(135);
    expect(response.body.origin).toBe("City U Updated");
  });

  it('DELETE /freightDetails/:id should delete a freightDetail', async () => {
    const postResponse = await request(app)
      .post('/freightDetails')
      .send({
        customerListId: customerListId,
        weight: 140,
        value: 700.00,
        origin: "City Q",
        destination: "City R"
      });

    const freightDetailId = postResponse.body.id;
    await request(app)
      .delete(`/freightDetails/${freightDetailId}`)
      .expect(204);

    await request(app)
      .get(`/freightDetails/${freightDetailId}`)
      .expect(404); 
  });
});
