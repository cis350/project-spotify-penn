/* eslint-disable no-console */
/**
 * this file contains all the CRUD operations from swaggerHub.
 */

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dzung:dzungthan@spotifypenn.kfju1o3.mongodb.net/test';
let mongoConnection;
const mongoClient = new MongoClient(uri)

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
  console.log(mongoConnection);
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
  const result = await db.collection('users').insertOne(newUser);
  return result.insertedId;
};

/** get all the communities */
const getCommunities = async () => {
  const db = await getDB();
  const result = await db.collection('communities').find({}).toArray();
  console.log('communities', JSON.stringify(result));
  return result;
}

const addCommunity = async (newCommunity) => {
  const db = await getDB();
  const result = await db.collection('communities').insertOne(newCommunity);
  return result.insertedId;
}

module.exports = {
  connect,
  close,
  getAllUsers,
  addUser,
  getCommunities,
  addCommunity,
};
