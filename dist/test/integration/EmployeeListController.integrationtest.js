import request from 'supertest';
import { app } from '../../app.js';
import { AppDataSource } from '../../config/data-source.js';
import { EmployeeList } from '../../entity/EmployeeList.js';
describe('EmployeeListController Integration Tests', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    beforeEach(async () => {
        await AppDataSource.getRepository(EmployeeList).clear();
    });
    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await AppDataSource.destroy();
    });
    it('POST /employeeLists should create a new employeeList', async () => {
        const employeeListData = { name: 'Erin', surname: 'Fletcher', seniority: 5, role: 'Manager' };
        const response = await request(app)
            .post('/employeeLists')
            .send(employeeListData)
            .expect(201);
        expect(response.body.name).toBe(employeeListData.name);
        expect(response.body.seniority).toBe(employeeListData.seniority);
    });
    it('GET /employeeLists should return all employeeLists', async () => {
        const employeeData1 = { name: 'Diana', surname: 'Ruiz', seniority: 3, role: 'Developer' };
        const employeeData2 = { name: 'Justin', surname: 'Hernandez', seniority: 10, role: 'Developer' };
        await request(app).post('/employeeLists').send(employeeData1);
        await request(app).post('/employeeLists').send(employeeData2);
        const response = await request(app)
            .get('/employeeLists')
            .expect(200);
        expect(response.body.length).toBe(2);
    });
    it('GET /employeeLists/:id should return an employeeList by id', async () => {
        const postResponse = await request(app)
            .post('/employeeLists')
            .send({ name: 'Steven', surname: 'Reeves', seniority: 1, role: 'Intern' });
        const employeeListId = postResponse.body.id;
        const response = await request(app)
            .get(`/employeeLists/${employeeListId}`)
            .expect(200);
        expect(response.body.id).toBe(employeeListId);
        expect(response.body.name).toBe('Steven');
    });
    it('PUT /employeeLists/:id should update an employeeList', async () => {
        const postResponse = await request(app)
            .post('/employeeLists')
            .send({ name: 'Dean', surname: 'Richardson', seniority: 2, role: 'Intern' });
        const employeeListId = postResponse.body.id;
        const response = await request(app)
            .put(`/employeeLists/${employeeListId}`)
            .send({ name: 'Yolanda', surname: 'Chan', seniority: 2, role: 'Intern' })
            .expect(200);
        expect(response.body.name).toBe('Yolanda');
    });
    it('DELETE /employeeLists/:id should delete an employeeList', async () => {
        const postResponse = await request(app)
            .post('/employeeLists')
            .send({ name: 'Rebecca', surname: 'Carroll', seniority: 4, role: 'Analyst' });
        const employeeListId = postResponse.body.id;
        await request(app)
            .delete(`/employeeLists/${employeeListId}`)
            .expect(204);
        await request(app)
            .get(`/employeeLists/${employeeListId}`)
            .expect(404);
    });
});
//# sourceMappingURL=EmployeeListController.integrationtest.js.map