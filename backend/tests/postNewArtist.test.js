// Import required modules and files
const request = require('supertest');
const { connect, closeMongoDBConnection } = require('../model/newArtist');
const { deleteTestDataFromNewArtistsDB } = require('../utils/testUtils');

const webapp = require('../server');

// Connection to the DB
let mongo;

describe('New artists playlist endpoint tests', () => {
  let db;
  let response;

  beforeAll(async () => {
    // Connect to the DB
    mongo = await connect();
    db = mongo.db();

    // Send a request to the API and collect the response
    response = await request(webapp).post('/newartists')
      .send('name=TestArtist&email=test@example.com&playlist=TestPlaylist&url=https://test.com&desc=TestDescription');
  });

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
    expect(response.type).toBe('application/json');
  });

  test('The new artist playlist is in the returned data', () => {
    console.log('Returned data id', JSON.parse(response.text).data.id);
    expect(JSON.parse(response.text).data.id).not.toBe(undefined);
  });

  test('The new artist playlist is in the database', async () => {
    const insertedPlaylist = await db.collection('newArtists').findOne({ artistName: 'TestArtist' });
    expect(insertedPlaylist.artistName).toEqual('TestArtist');
  });

  test('Missing a field (email) 404', async () => {
    const res = await request(webapp).post('/newartists')
      .send('name=TestArtist&playlist=TestPlaylist&url=https://test.com&desc=TestDescription');
    expect(res.status).toEqual(404);
  });
});
