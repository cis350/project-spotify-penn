/* eslint-disable no-console */
/**
 * this file contains all the CRUD operations from swaggerHub.
 */

const { mongoClient } = require('mongodb');

const uri = 'mongodb+srv://abhijay:abhijayagarwal@spotifypenn.kfju1o3.mongodb.net/?retryWrites=true&w=majority';

let mongoConnection;

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    console.log('connected to DB', mongoConnection.db().databaseName);
    return mongoConnection;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const close = async () => {
  await mongoConnection.close();
};

// connect to mongoDb and return the database

const getDB = async () => {
  // test if already connected
  if (!mongoConnection) {
    await connect();
  }
  return mongoConnection.db('spotify');
};

/* get all the users */
const getAllUsers = async () => {
  const db = await getDB();
  const users = await db.collection('users').find({}).toArray();
  console.log('users', JSON.stringify(users));
  return users;
};

const addUser = async (newUser) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('students').insertOne(newUser);
  return result.insertedId;
};

module.exports = {
  connect,
  close,
  getAllUsers,
  addUser,
};
