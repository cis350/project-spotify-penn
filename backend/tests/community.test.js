const request = require('supertest');
const app = require('../server');
const { connect, closeMongoDBConnection } = require('../utils/dbUtils');
const { deleteTestDataFromNewArtistsDB } = require('../utils/testUtils');


describe('GET communities integration test', () => {
  test('the status code is 200 and response type', async () => {
    const response = await request(app).get('/communities');
    expect(response.status).toBe(200); // status code
    expect(response.type).toBe('application/json');
  });
});

describe('GET communities members', () => {
  test('the status code is 500 and unknown community message', async () => {
    const variable = 'dummy_variable';
    const response = await request(app).get(`/communities/members/${variable}`);
    expect(response.status).toBe(500); // status code
  });
});

describe('GET communities members 2', () => {
  test('the status code is 200', async () => {
    const variable = '64404d4c2a5ec69d98eb63d4';
    const response = await request(app).get(`/communities/members/${variable}`);
    expect(response.status).toBe(200); // status code
  });
});

describe('POST communities', () => {
  let db;
  let response;

  beforeAll(async () => {
  // Connect to the DB
    mongo = await connect();
    db = mongo.db();
    response = await request(app).post('/communities').send('name=delicious&description=kale');

    afterAll(async () => {
      try {
        await deleteTestDataFromNewArtistsDB(db, 'TestArtist');
        await mongo.close();
        await closeMongoDBConnection();
        return null;
      } catch (err) {
        return err;
      }
    });
      
    test('The status code is 201 and response type', () => {
      expect(response.status).toBe(201);
      // expect(response.type).toBe('application/json');
    });
  });
});

// describe('GET communities integration test', () => {
//   test('the status code is 201 and response type', () => {
//     expect(response.status).toBe(201); // status code
//     expect(response.type).toBe('application/json');
//   });

//   test('the new student is in the returned data', () => {
//     // expect the id of the new student to not be undefined
//     console.log('returned data id', JSON.parse(response.text).data.id);
//     expect(JSON.parse(response.text).data.id).not.toBe(undefined);
//   });

//   test('The new student is in the database', async () => {
//     // const insertedUser = await db.collection('students').findOne({ name: 'testCommunity' });
//     expect(insertedUser.name).toEqual('testCommunity');
//   });
// });
