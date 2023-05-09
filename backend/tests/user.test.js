const request = require('supertest');
const { connect, closeMongoDBConnection } = require('../utils/dbUtils');
const {
  deleteTestDataFromUsersDB, insertTestDataToUsersDB, testUser,
} = require('../utils/testUtils');

const webapp = require('../server');

let mongo;

describe('POST new user endpoint tests', () => {
  let db;
  let response;

  beforeAll(async () => {
    // Connect to the DB
    mongo = await connect();
    db = mongo.db();

    // Send a request to the API and collect the response
    response = await request(webapp).post('/users')
      .send(testUser);
  });

  afterAll(async () => {
    try {
      await deleteTestDataFromUsersDB(db, 'Test');
      await mongo.close();
      await closeMongoDBConnection();
      return null;
    } catch (err) {
      return err;
    }
  });

  test('The status code is 201 and response type', () => {
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
  });

  test('The new user is in the returned data', () => {
    expect(JSON.parse(response.text)).not.toBe(undefined);
  });

  test('The new user is in the database', async () => {
    const insertedUser = await db.collection('users').findOne({ firstName: 'Test' });
    expect(insertedUser.firstName).toEqual('Test');
  });
});

// test GET users endpoint
describe('GET users endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testUserID;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    // add test user to mongodb
    testUserID = await insertTestDataToUsersDB(db, testUser);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    await deleteTestDataFromUsersDB(db, 'Test');
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
      return null;
    } catch (err) {
      return err;
    }
  });

  // test('Get all new user endpoint status code and data', async () => {
  //   const resp = await request(webapp).get('/newartistplaylists');
  //   expect(resp.status).toEqual(200);
  //   expect(resp.type).toBe('application/json');
  //   // const artistArr = JSON.parse(resp.text);
  //   const testUsers = await db.collection('users').find({ firstName: 'Test' }).toArray();
  //   console.log(testUsers);
  //   // testStudent is in the response
  //   console.log(testUsers.length);
  //   expect(testUsers.length >= 1).toBe(true);
  // });

  // test('Get a new user endpoint status code and data', async () => {
  //   const resp = await request(webapp).get(`/newartistplaylists/${testUserID}`);
  //   expect(resp.status).toEqual(200);
  //   expect(resp.type).toBe('application/json');
  //   const userArr = JSON.parse(resp.text).data;
  //   // testStudent is in the response
  //   expect(userArr).toMatchObject({ _id: testUserID, ...testUser });
  // });

  test('user not in db status code 400', async () => {
    const resp = await request(webapp).get('/users/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});
