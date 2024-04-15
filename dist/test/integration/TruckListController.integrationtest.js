import request from 'supertest';
import { app } from '../../app.js';
import { AppDataSource } from '../../config/data-source.js';
import { TruckList } from '../../entity/TruckList.js';
describe('TruckListController Integration Tests', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    beforeEach(async () => {
        await AppDataSource.getRepository(TruckList).clear();
    });
    afterAll(async () => {
        await AppDataSource.destroy();
    });
    it('POST /truckLists should create a new truckList', async () => {
        const truckListData = { brand: 'Parker', load: 5000, capacity: 10000, year: 2014, numberOfRepairs: 2 };
        const response = await request(app)
            .post('/truckLists')
            .send(truckListData)
            .expect(201);
        expect(response.body.brand).toBe(truckListData.brand);
        expect(response.body.load).toBe(truckListData.load);
    });
    it('GET /truckLists should return all truckLists', async () => {
        await request(app).post('/truckLists').send({ brand: 'Parker', load: 5000, capacity: 10000, year: 2020, numberOfRepairs: 2 });
        await request(app).post('/truckLists').send({ brand: 'Isaiah', load: 6000, capacity: 20000, year: 2021, numberOfRepairs: 3 });
        const response = await request(app)
            .get('/truckLists')
            .expect(200);
        expect(response.body.length).toBe(2);
    });
    it('GET /truckLists/:id should return a truckList by id', async () => {
        const postResponse = await request(app)
            .post('/truckLists')
            .send({ brand: 'Gillespie', load: 7000, capacity: 15000, year: 2022, numberOfRepairs: 2 });
        const truckListId = postResponse.body.id;
        const response = await request(app)
            .get(`/truckLists/${truckListId}`)
            .expect(200);
        expect(response.body.id).toBe(truckListId);
        expect(response.body.brand).toBe('Gillespie');
    });
    it('PUT /truckLists/:id should update a truckList', async () => {
        const postResponse = await request(app)
            .post('/truckLists')
            .send({ brand: 'Gillespie', load: 7000, capacity: 15000, year: 2022, numberOfRepairs: 2 });
        const truckListId = postResponse.body.id;
        const response = await request(app)
            .put(`/truckLists/${truckListId}`)
            .send({ brand: 'Gillespie', load: 7500, capacity: 12000, year: 2023, numberOfRepairs: 3 })
            .expect(200);
        expect(response.body.load).toBe(7500);
    });
    it('DELETE /truckLists/:id should delete a truckList', async () => {
        const postResponse = await request(app)
            .post('/truckLists')
            .send({ brand: 'Gillespie', load: 7000, capacity: 15000, year: 2022, numberOfRepairs: 2 });
        const truckListId = postResponse.body.id;
        await request(app)
            .delete(`/truckLists/${truckListId}`)
            .expect(204);
        const response = await request(app)
            .get(`/truckLists/${truckListId}`)
            .expect(404);
    });
});
//# sourceMappingURL=TruckListController.integrationtest.js.map