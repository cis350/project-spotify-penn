// import mongoClient
const { MongoClient } = require('mongodb');

// import functions to be tested
const { connect, close, getAllUsers, addUser } = require('./../model/users');

// connection string
const uri = 'mongodb+srv://maggie:maggieschwierking@spotifypenn.kfju1o3.mongodb.net/test';

describe('User Operations', () => {
  let mongoConnection;

  // connect to the database before running any test
  beforeAll(async () => {
    mongoConnection = await connect();
  });

  // close database connection after running all tests
  afterAll(async () => {
    await mongoConnection.close();
  });

  describe('connect()', () => {
    test('connects to the database', async () => {
      const result = await connect();

      expect(result).toBeTruthy();
      expect(mongoConnection.isConnected()).toBe(true);
    });
  });

  describe('close()', () => {
    test('closes the database connection', async () => {
      await close();

      expect(mongoConnection.isConnected()).toBe(false);
    });
  });

  describe('getAllUsers()', () => {
    // add test data to the database before running each test
    beforeEach(async () => {
      await mongoConnection.db('spotify').collection('users').insertMany([
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          age: 25,
        },
        {
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          age: 30,
        },
      ]);
    });

    // clear database after running each test
    afterEach(async () => {
      await mongoConnection.db('spotify').collection('users').deleteMany({});
    });

    test('returns all users from the database', async () => {
      const result = await getAllUsers();

      expect(result.length).toBe(2);
    });
  });

  describe('addUser()', () => {
    // clear database after running each test
    afterEach(async () => {
      await mongoConnection.db('spotify').collection('students').deleteMany({});
    });

    test('adds a new user to the database', async () => {
      const newUser = {
        name: 'Sarah Lee',
        email: 'sarahlee@example.com',
        age: 35,
      };

      const result = await addUser(newUser);

      expect(result).toBeTruthy();
    });
  });
});
