const request = require('supertest');
const app = require('../server');
// const { connect, closeMongoDBConnection } = require('../utils/dbUtils');
// const { deleteTestDataFromNewArtistsDB } = require('../utils/testUtils');

describe('GET communities integration test', () => {
  test('the status code is 200 and response type', async () => {
    const response = await request(app).get('/communities').set('Authorization', 'admin@upenn.edu');
    expect(response.status).toBe(200); // status code
    expect(response.type).toBe('application/json');
  });
});

describe('GET communities members', () => {
  test('Invalid ID = the status code is 500 and unknown community message', async () => {
    const variable = 'invalidID';
    const response = await request(app).get(`/communities/members/${variable}`).set('Authorization', 'admin@upenn.edu');
    expect(response.status).toBe(500); // status code
  });

  test('Nonexistent ID = the status code is 404 and unknown community message', async () => {
    const variable = '54201d4c2a5ec69d98ec63d4';
    const response = await request(app).get(`/communities/members/${variable}`).set('Authorization', 'admin@upenn.edu');
    expect(response.status).toBe(404); // status code
  });

  test('correct = the status code is 200', async () => {
    const variable = '64404d4c2a5ec69d98eb63d4';
    const response = await request(app).get(`/communities/members/${variable}`).set('Authorization', 'admin@upenn.edu');
    expect(response.status).toBe(200); // status code

    // toggle back
    const response2 = await request(app).get(`/communities/members/${variable}`).set('Authorization', 'admin@upenn.edu');
    expect(response2.status).toBe(200); // status code
  });
});

// describe('POST communities', () => {
//   let db;
//   let response;

//   beforeAll(async () => {
//   // Connect to the DB
//     mongo = await connect();
//     console.log('line 38');
//     db = mongo.db();
//     console.log('line 40');
//     response = await request(app).post('/communities');
//     console.log('line 42');
//   });
//   afterAll(async () => {
//     try {
//       await deleteTestDataFromCommunitiesDB(db, 'TestCommunity');
//       await mongo.close();
//       await closeMongoDBConnection();
//       return null;
//     } catch (err) {
//       return err;
//     }
//   });

//   test('The status code is 201 and response type', () => {
//     expect(response.status).toBe(201);
//     // expect(response.type).toBe('application/json');
//   });
// });

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
