const request = require('supertest');
const { close, connect } = require('../model/communities');
const webapp = require('../server');

const { testCommunity, insertTestDataToCommunitiesDB, deleteTestDataFromCommunitiesDB } = require('../utils/testUtils');

let mongo;

describe('GET communities integration test', () => {
  let db;
  let testCommunity;

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    // add test user to mongodb
    testCommunity = await insertTestDataToCommunitiesDB(db, testCommunity);
    console.log('testCommunity', testCommunity);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    await deleteTestDataFromCommunitiesDB(db, 'teststudent');
    try {
      await mongo.close();
      await close(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });
});

describe('GET communities integration test', () => {
  let db;

  /**
       * Make sure that the data is in the DB before running
       * any test
       * connect to the DB
       */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    // add test user to mongodb
    response = await request(webapp).post('http://localhost:8000/communities', testCommunity);
  });

  /**
   * Delete all test data from the DB
   * Close all open connections
   */
  afterAll(async () => {
    try {
      await deleteTestDataFromCommunitiesDB(db, 'testCommunity');
      await mongo.close();
      await close(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  test('the new student is in the returned data', () => {
    // expect the id of the new student to not be undefined
    console.log('returned data id', JSON.parse(response.text).data.id);
    expect(JSON.parse(response.text).data.id).not.toBe(undefined);
  });

  test('The new student is in the database', async () => {
    const insertedUser = await db.collection('students').findOne({ name: 'testCommunity' });
    expect(insertedUser.name).toEqual('testCommunity');
  });
});
