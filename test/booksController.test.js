const supertest = require('supertest');
const app = require('../testApp')
const { connect } = require('./database');
const UserModel = require('../models/userModel');

// Test suite
describe('Books Route Tests', () => {
    let connection;
    let token;
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })})

    beforeEach(async() => {
        // create a user
        const user = await UserModel.create({
          name: "Amarachi",
          password: "12345678",
          email: "amara@gmail.com",
        })
      

        // login that user
        const response = await supertest(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: "amara@gmail.com",
            password: "12345678"
        })

        // store the token in a global object
        token = response.body.token
    })

    afterEach(async () => {
        await connection.cleanup()
    })
    
    // after hook
    afterAll(async () => {
        await connection.disconnect()
    })

    // test case
    it('should return a book', async () => {
        const response = await supertest(app).get('/posts/:id')
        .set('authorization', `Bearer ${token}`)
        .set('content-type', 'application/json')

        expect(response.status).toEqual(200);
    })


