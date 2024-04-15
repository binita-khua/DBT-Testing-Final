import request from 'supertest';
import { app } from '../../app.js';
import { AppDataSource } from '../../config/data-source.js';
import { DriverProfile } from '../../entity/DriverProfile.js';
describe('DriverProfileController Integration Tests', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    beforeEach(async () => {
        const transactionEntityManager = AppDataSource.manager;
        await transactionEntityManager.transaction(async (transactionalEntityManager) => {
            await AppDataSource.getRepository(DriverProfile).clear();
        });
    });
    afterAll(async () => {
        await AppDataSource.destroy();
    });
    it('POST /driverProfiles should create a new driverProfile', async () => {
        const driverProfileData = { name: 'Erin', surname: 'Fletcher', seniority: 5, role: 'Driver', category: 'Class A' };
        const response = await request(app)
            .post('/driverProfiles')
            .send(driverProfileData)
            .expect(201);
        expect(response.body.name).toBe(driverProfileData.name);
        expect(response.body.category).toBe(driverProfileData.category);
    });
    it('GET /driverProfiles should return all driverProfiles', async () => {
        await request(app).post('/driverProfiles').send({ name: 'Diana', surname: 'Ruiz', seniority: 3, role: 'Driver', category: 'Class B' });
        await request(app).post('/driverProfiles').send({ name: 'Justin', surname: 'Hernandez', seniority: 10, role: 'Driver', category: 'Class C' });
        const response = await request(app)
            .get('/driverProfiles')
            .expect(200);
        expect(response.body.length).toBe(2);
    });
    it('GET /driverProfiles/:id should return a driverProfile by id', async () => {
        const postResponse = await request(app)
            .post('/driverProfiles')
            .send({ name: 'Steven', surname: 'Reeves', seniority: 1, role: 'Driver', category: 'Class D' });
        const driverProfileId = postResponse.body.id;
        const response = await request(app)
            .get(`/driverProfiles/${driverProfileId}`)
            .expect(200);
        expect(response.body.id).toBe(driverProfileId);
        expect(response.body.name).toBe('Steven');
    });
    it('PUT /driverProfiles/:id should update a driverProfile', async () => {
        const postResponse = await request(app)
            .post('/driverProfiles')
            .send({ name: 'Dean', surname: 'Richardson', seniority: 2, role: 'Driver', category: 'Class E' });
        const driverProfileId = postResponse.body.id;
        const response = await request(app)
            .put(`/driverProfiles/${driverProfileId}`)
            .send({ name: 'Yolanda', surname: 'Chan', seniority: 2, role: 'Driver', category: 'Class F' })
            .expect(200);
        expect(response.body.name).toBe('Yolanda');
        expect(response.body.category).toBe('Class F');
    });
    it('DELETE /driverProfiles/:id should delete a driverProfile', async () => {
        const postResponse = await request(app)
            .post('/driverProfiles')
            .send({ name: 'Rebecca', surname: 'Carroll', seniority: 4, role: 'Driver', category: 'Class G' });
        const driverProfileId = postResponse.body.id;
        await request(app)
            .delete(`/driverProfiles/${driverProfileId}`)
            .expect(204);
        await request(app)
            .get(`/driverProfiles/${driverProfileId}`)
            .expect(404);
    });
});
//# sourceMappingURL=DriverProfileController.integrationtest.js.map