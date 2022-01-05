import mongoose from 'mongoose';
import { User } from '../src/database/models.js';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test-db');
});

afterAll(async () => {
  mongoose.disconnect();
});

describe('GET /user/healthcheck', () => {
  test('Should return the health of the service', async () => {
    // GIVEN

    // WHEN
    const response = await axios({
      url: `${API_URL}/user/healthcheck`,
      method: 'GET',
    });
    
    // THEN
    expect(response.data).toEqual({
      success: true,
      data: {
        status: 'healthy',
        dbConnectionState: 'connected',
        uptime: expect.anything(),
      },
      error: null,
    })
  });
})