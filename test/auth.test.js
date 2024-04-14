const supertest = require('supertest');
const app = require('../testApp');
const { connect } = require('./database');
const UserModel = require('../models/userModel');

// Test suite
describe('Authentication Tests', () => {
    let connection;
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })

    afterEach(async () => {
        await connection.cleanup()
    })
    
    // after hook
    afterAll(async () => {
        await connection.disconnect()
    })


    // Test case
    it('should successfully register a user', async () => {
        const response = await supertest(app)
        .post('/users/register')
        .set('content-type', 'application/json')
        .send({
            name: "Amarachi",
            password: "12345678",
            email: "amara@gmail.com",
        
        })

        // expectations
        expect(response.status).toEqual(200);
        
    })

    // Test case
    it('should successfully login a user', async () => {
        await UserModel.create({
            name: "Amarachi",
            password: "12345678",
            email: "amara@gmail.com",
        });

        const response = await supertest(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
            email: "amara@gmail.com",
            password: "12345678"
        })

        // expectations
        expect(response.status).toEqual(200);

        
    })

    it('should not successfully login a user, when user does not exist', async () => {
        await UserModel.create({
            name: "Amarachi",
            password: "12345678",
            email: "amara@gmail.com",
        });

        const response = await supertest(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
            email: "zee@example.com",
            password: "12345678"
        })

        // expectations
        expect(response.status).toEqual(401);
        expect(response.body).toMatchObject({
            message: 'Unauthorized',
        })
    })
})