import request from 'supertest';
import { app } from '../../app.js';
import { AppDataSource } from '../../config/data-source.js';
import { MechanicDirectory } from '../../entity/MechanicDirectory.js';
describe('MechanicDirectoryController Integration Tests', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    beforeEach(async () => {
        await AppDataSource.getRepository(MechanicDirectory).clear();
    });
    afterAll(async () => {
        await AppDataSource.destroy();
    });
    it('POST /mechanicDirectorys should create a new mechanicDirectory', async () => {
        const mechanicDirectoryData = { name: 'Erin', surname: 'Fletcher', seniority: 5, role: 'Mechanic', brandSpecialization: 'Parker' };
        const response = await request(app)
            .post('/mechanicDirectorys')
            .send(mechanicDirectoryData)
            .expect(201);
        expect(response.body.name).toBe(mechanicDirectoryData.name);
        expect(response.body.brandSpecialization).toBe(mechanicDirectoryData.brandSpecialization);
    });
    it('GET /mechanicDirectorys should return all mechanicDirectorys', async () => {
        await request(app).post('/mechanicDirectorys').send({ name: 'Diana', surname: 'Ruiz', seniority: 3, role: 'Mechanic', brandSpecialization: 'BMW' });
        await request(app).post('/mechanicDirectorys').send({ name: 'Justin', surname: 'Hernandez', seniority: 10, role: 'Mechanic', brandSpecialization: 'Audi' });
        const response = await request(app)
            .get('/mechanicDirectorys')
            .expect(200);
        expect(response.body.length).toBe(2);
    });
    it('GET /mechanicDirectorys/:id should return a mechanicDirectory by id', async () => {
        const postResponse = await request(app)
            .post('/mechanicDirectorys')
            .send({ name: 'Steven', surname: 'Reeves', seniority: 1, role: 'Mechanic', brandSpecialization: 'Mercedes' });
        const mechanicDirectoryId = postResponse.body.id;
        const response = await request(app)
            .get(`/mechanicDirectorys/${mechanicDirectoryId}`)
            .expect(200);
        expect(response.body.id).toBe(mechanicDirectoryId);
        expect(response.body.name).toBe('Steven');
    });
    it('PUT /mechanicDirectorys/:id should update a mechanicDirectory', async () => {
        const postResponse = await request(app)
            .post('/mechanicDirectorys')
            .send({ name: 'Dean', surname: 'Richardson', seniority: 2, role: 'Mechanic', brandSpecialization: 'Ford' });
        const mechanicDirectoryId = postResponse.body.id;
        const response = await request(app)
            .put(`/mechanicDirectorys/${mechanicDirectoryId}`)
            .send({ name: 'Yolanda', surname: 'Chan', seniority: 2, role: 'Mechanic', brandSpecialization: 'Toyota' })
            .expect(200);
        expect(response.body.name).toBe('Yolanda');
        expect(response.body.brandSpecialization).toBe('Toyota');
    });
    it('DELETE /mechanicDirectorys/:id should delete a mechanicDirectory', async () => {
        const postResponse = await request(app)
            .post('/mechanicDirectorys')
            .send({ name: 'Rebecca', surname: 'Carroll', seniority: 4, role: 'Mechanic', brandSpecialization: 'Honda' });
        const mechanicDirectoryId = postResponse.body.id;
        await request(app)
            .delete(`/mechanicDirectorys/${mechanicDirectoryId}`)
            .expect(204);
        await request(app)
            .get(`/mechanicDirectorys/${mechanicDirectoryId}`)
            .expect(404);
    });
});
//# sourceMappingURL=MechanicDirectoryController.integrationtest.js.map