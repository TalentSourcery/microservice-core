import axios from 'axios';
import { fork } from 'child_process';

const HOST = 'http://localhost:3000';
let child = null;

beforeAll(async () => {
  child = await fork('index.js');
});

afterAll(async () => {
  child.kill();
});

describe('Passing test', () => {
  test('YAY', async () => {

  });
})

// describe('POST /', () => {
//   test('Should create a user in database', async () => {
//     // GIVEN
//     const url = `${HOST}/api/v1/user/`;
//     const body = {
//       email: 'email@test.com',
//       password: 'password',
//       name: 'Testovich',
//     };

//     // WHEN
//     const response = await axios.post(url, body);

//     // THEN
//     expect(response.status).toBe(200);
//     expect(response.data).toEqual({
//       success: true,
//       data: expect.anything(),
//       error: null,
//     });
//   });
// });
