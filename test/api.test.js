// Importing modules
import mongoose from 'mongoose';
import { User } from '../src/database/models.js';
import fetch from 'node-fetch';

// Importing the HTTP server built with Express
import server from '../server.js';

// Constants. 'dotenv' doesn't work well with Jest
const { 
  PORT_EXAMPLE,
  DB_URL,
} = process.env;
const API_URL = `http://localhost:${PORT_EXAMPLE}/api/v1`
const TEST_USER = {
  email: 'user@domain.com',
  password: 'password',
  name: 'Username',
}

// Starting the HTTP server
const serverHandler = server.listen(PORT_EXAMPLE, () => {});

beforeEach(async () => {
  await mongoose.connect(DB_URL);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});

afterAll(async () => {
  serverHandler.close();
});

// Example healtchcheck test
describe('GET /user/healthcheck', () => {
  test('Should return the health of the service', async () => {
    // GIVEN

    // WHEN
    const response = await fetch(
      `${API_URL}/user/healthcheck`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();

    // THEN
    expect(data).toEqual({
      success: true,
      data: {
        status: 'healthy',
        dbConnectionState: 'connected',
        uptime: expect.anything(),
      },
      error: null,
    })
  });
});

// Example of a positive test case
describe('POST /user', () => {
  test('Should create a user', async () => {
    // GIVEN

    // WHEN
    const response = await fetch(`${API_URL}/user`,{
      method: 'POST',
      body: JSON.stringify(TEST_USER),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    
    // THEN
    expect(data).toEqual({
      success: true,
      data: {
        email: expect.anything(),
        password: expect.anything(),
        name: expect.anything(),
        _id: expect.anything(),
        __v: expect.anything(),
      },
      error: null,
    })
  });
});

// Example of a negative test case
describe('POST /user', () => {
  test('Should not create duplicated user', async () => {
    // GIVEN
    const user = await User.create(TEST_USER);
    await user.save();

    // WHEN
    const response = await fetch(`${API_URL}/user`,{
      method: 'POST',
      body: JSON.stringify(TEST_USER),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    
    // THEN
    expect(data).toEqual({
      success: false,
      data: null,
      error: {
        statusCode: 400,
        message: `User ${TEST_USER.email} already in database`
      },
    })
  });
});