/* eslint-disable no-console */
/**
 * this file contains all the CRUD operations from swaggerHub.
 */

const { mongoClient } = require('mongodb');

const uri = 'mongodb+srv://maggie:maggieschwierking@spotifypenn.kfju1o3.mongodb.net/test';

let mongoConnection;

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    console.log('connected to DB - users', mongoConnection.db().databaseName);
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
const getUsers = async () => {
  const db = await getDB();
  const users = await db.collection('users').find({}).toArray();
  console.log('users', JSON.stringify(users));
  return users;
};

/* get a user by email */
const getUser = async (email) => {
  const db = await getDB();
  const user = await db.collection('users').findOne({ id: email });
  return user;
};

/* add a new user */
const addUser = async (newUser) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('users').insertOne(newUser);
  console.log(result);
  return result.insertedId;
};

const getPassword = async (id) => {
  const db = await getDB();
  const user = await db.collection('users').findOne({ _id: id });
  return user.password;
};

module.exports = {
  connect,
  close,
  getUsers,
  getUser,
  addUser,
  getPassword
};
