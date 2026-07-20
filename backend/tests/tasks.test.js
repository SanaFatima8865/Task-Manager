const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
    test('GET /tasks should return all tasks', async () => {
        const response = await request(app).get('/tasks');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('GET /tasks/1 should return a task', async () => {
        const response = await request(app).get('/tasks/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
    })

    test('GET /tasks/999 should return 404', async () => {
        const response = await request(app).get('/tasks/999');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Task not found');
    })

    test('POST /tasks should create a new task', async () => {
        const response = await request(app).post('/tasks').send({
            title: "Learn Testing",
        })

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Learn Testing");
        expect(response.body.completed).toBe(false);
    })

    test('POST /tasks without title should return 400', async () => {
        const response = await request(app).post('/tasks').send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Title is required');
    })

    test('PUT /tasks/1 should update a task', async () => {
        const response = await request(app).put('/tasks/1').send({
            title: "Learn Node.js Updated",
            completed: true,
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Learn Node.js Updated");
        expect(response.body.completed).toBe(true);
    })

    test('PUT /tasks/999 should return 404', async () => {
        const response = await request(app).put('/tasks/999').send({
            title: "Task not found",
            completed: true,
        })

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Task not found');
    })

    test('Delete /tasks/1 should delete a task', async () => {
        const response = await request(app).delete('/tasks/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully');
    })
})