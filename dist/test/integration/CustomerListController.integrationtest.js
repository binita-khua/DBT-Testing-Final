import request from 'supertest';
import { app } from '../../app.js';
import { AppDataSource } from '../../config/data-source.js';
import { CustomerList } from '../../entity/CustomerList.js';
describe('CustomerListController Integration Tests', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    beforeEach(async () => {
        await AppDataSource.getRepository(CustomerList).clear();
    });
    afterAll(async () => {
        await AppDataSource.destroy();
    });
    it('POST /customerLists should create a new customerList', async () => {
        const customerListData = {
            name: 'Erin Fletcher',
            address: '719 Katherine Flats St',
            phoneNumber1: '555-9717',
            phoneNumber2: '829-4986'
        };
        const response = await request(app)
            .post('/customerLists')
            .send(customerListData)
            .expect(201);
        expect(response.body.name).toBe(customerListData.name);
        expect(response.body.address).toBe(customerListData.address);
        expect(response.body.phoneNumber1).toBe(customerListData.phoneNumber1);
        expect(response.body.phoneNumber2).toBe(customerListData.phoneNumber2);
    });
    it('GET /customerLists should return all customerLists', async () => {
        await request(app).post('/customerLists').send({
            name: 'Diana Ruiz',
            address: '947 Michael Alley St',
            phoneNumber1: '316-4713',
            phoneNumber2: '221-7327'
        });
        await request(app).post('/customerLists').send({
            name: 'Justin Hernandez',
            address: '697 Hubbard Camp St',
            phoneNumber1: '686-8769',
            phoneNumber2: '997-9883'
        });
        const response = await request(app)
            .get('/customerLists')
            .expect(200);
        expect(response.body.length).toBe(2);
    });
    it('GET /customerLists/:id should return a customerList by id', async () => {
        const postResponse = await request(app)
            .post('/customerLists')
            .send({
            name: 'Steven Reeves',
            address: '140 Watts Falls St',
            phoneNumber1: '904-2506',
            phoneNumber2: '894-1174'
        });
        const customerListId = postResponse.body.id;
        const response = await request(app)
            .get(`/customerLists/${customerListId}`)
            .expect(200);
        expect(response.body.id).toBe(customerListId);
        expect(response.body.name).toBe('Steven Reeves');
    });
    it('PUT /customerLists/:id should update a customerList', async () => {
        const postResponse = await request(app)
            .post('/customerLists')
            .send({
            name: 'Dean Richardson',
            address: '215 Matthew Loaf St',
            phoneNumber1: '829-4986',
            phoneNumber2: '251-3356'
        });
        const customerListId = postResponse.body.id;
        const response = await request(app)
            .put(`/customerLists/${customerListId}`)
            .send({
            name: 'Yolanda Chan',
            address: '215 Matthew Loaf St',
            phoneNumber1: '829-4986',
            phoneNumber2: '251-3356'
        })
            .expect(200);
        expect(response.body.name).toBe('Yolanda Chan');
    });
    it('DELETE /customerLists/:id should delete a customerList', async () => {
        const postResponse = await request(app)
            .post('/customerLists')
            .send({
            name: 'Rebecca Carroll',
            address: '701 Mia Cove St',
            phoneNumber1: '221-7327',
            phoneNumber2: '963-3678'
        });
        const customerListId = postResponse.body.id;
        await request(app)
            .delete(`/customerLists/${customerListId}`)
            .expect(204);
        await request(app)
            .get(`/customerLists/${customerListId}`)
            .expect(404);
    });
});
//# sourceMappingURL=CustomerListController.integrationtest.js.map