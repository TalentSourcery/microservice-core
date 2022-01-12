// Importing modules
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../src/database/models.js';
import fetch from 'node-fetch';

// Importing the HTTP server built with Express
import server from '../server.js';

// Creating instance of "MongoMemoryServer" and starting it
const mongod = await MongoMemoryServer.create();

// Constants
const DB_URI = mongod.getUri();
const { PORT_EXAMPLE } = process.env;
const API_URL = `http://localhost:${PORT_EXAMPLE}/api/v1`;
const TEST_USER = {
  email: 'user@domain.com',
  password: 'password',
  name: 'Username',
};

let serverHandler = null;
beforeAll(async () => {
  serverHandler = await server.listen(PORT_EXAMPLE, () => {});
});

beforeEach(async () => {
  await mongoose.connect(DB_URI);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  serverHandler.close();
  mongoose.disconnect();
  mongod.stop();
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
      },
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
    });
  });
});

// Example of a positive test case
describe('POST /user', () => {
  test('Should create a user', async () => {
    // GIVEN

    // WHEN
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      body: JSON.stringify(TEST_USER),
      headers: {
        'Content-Type': 'application/json',
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
    });
  });
});

// Example of a negative test case
describe('POST /user', () => {
  test('Should not create duplicated user', async () => {
    // GIVEN
    const user = await User.create(TEST_USER);
    await user.save();

    // WHEN
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      body: JSON.stringify(TEST_USER),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    // THEN
    expect(data).toEqual({
      success: false,
      data: null,
      error: {
        statusCode: 400,
        message: `User ${TEST_USER.email} already in database`,
      },
    });
  });
});
