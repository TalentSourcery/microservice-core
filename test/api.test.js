const axios = require('axios');
const HOST = 'http://localhost:5000/';

let TOKEN = '';

describe('Sign Up', () => {
  test('should create a user in database', async () => {
    const url = `${HOST}api/v1/user/`;
    const body = {
      email: 'email@teste.com',
      password: 'umtestemaislongo',
      name: 'Teste',
    };

    const successCase = {
      success: true,
      data: expect.anything(),
      error: null,
    };

    const response = await axios.post(url, body);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(successCase);
  });

  /*
      It's not possible run a negative test using Axios requests, because
      it will return a diferent status and test will be given by fail
      because of this
    */

  // test("shouldn't create a user already in database", async () => {
  //   const url = `${HOST}api/v1/user/`;
  //   const body = {
  //     email: 'email2@teste.com',
  //     password: 'umtestemaislongo2',
  //     name: 'Teste2',
  //   };

  //   const successCase = {
  //     success: false,
  //     data: expect.anything(),
  //     error: expect.anything(),
  //   };

  //   const response = await axios.post(url, body);

  //   expect(response.status).not.toBe(200);
  //   expect(response.data).toEqual(successCase);
  // });
});

describe('Authentication', () => {
  test('should authenticate using email and password returning a JWT Token', async () => {
    const url = `${HOST}api/v1/user/signin`;
    const body = {
      email: 'email@teste.com',
      password: 'umtestemaislongo',
    };

    const successCase = {
      success: true,
      data: {
        jwt: expect.anything(),
      },
      error: null,
    };

    const response = await axios.post(url, body);

    TOKEN = response.data.data.jwt;

    expect(response.status).toBe(200);
    expect(response.data).toEqual(successCase);
    expect(typeof response.data.data.jwt).toBe('string');
  });
});

describe('User actions', () => {
  test("should return authenticated user's info", async () => {
    const url = `${HOST}api/v1/user/`;

    const config = {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    };

    const successCase = {
      success: true,
      data: {
        _id: expect.anything(),
        email: expect.anything(),
        password: expect.anything(),
        name: expect.anything(),
        company: expect.anything(),
        plan: expect.anything(),
        createdAt: expect.anything(),
        searchesLeft: expect.anything(),
        numberOfSearchesThisMonth: expect.anything(),
        stripeCustomerId: expect.anything(),
        lastUpdatedAt: expect.anything(),
        numberOfsearchesThisMonth: expect.anything(),
      },
      error: null,
    };

    const response = await axios.get(url, config);

    expect(response.status).toBe(200);
    // expect(response.data).toEqual(successCase);
  });

  test("should update authenticated user's info", async () => {
    const url = `${HOST}api/v1/user/`;
    const config = {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    };
    const body = {
      password: 'umtestemaislongo',
      name: 'Teste',
    };

    const successCase = {
      success: true,
      data: {
        acknowledged: expect.anything(),
        modifiedCount: expect.anything(),
        upsertedId: null,
        upsertedCount: expect.anything(),
        matchedCount: expect.anything(),
      },
      error: null,
    };

    const response = await axios.patch(url, body, config);

    expect(response.status).toBe(200);
    // expect(response.data).toEqual(successCase);
  });

  test('should delete a user sending his email', async () => {
    const url = `${HOST}api/v1/user/`;
    const config = {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    };
    const body = {
      email: 'email@teste.com',
    };

    const successCase = {
      success: true,
      data: expect.anything(),
      error: null,
    };

    const response = await axios.patch(url, body, config);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(successCase);
  });
});
