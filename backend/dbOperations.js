/**
 * this file contains all the CRUD operations from swaggerHub.
 */

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://abhijay:abhijayagarwal@spotifypenn.kfju1o3.mongodb.net/test';
let mongoConnection;
const mongoClient = new MongoClient(uri);

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
const getPlaylists = async () => {
  // get the db
  const db = await getDB();
  const playlists = await db.collection('playlists').find({}).toArray();
  return playlists;
};

// (async () => {
//   try {
//     const connection = await connect();
//     return connection;
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     return null;
//   }
// })();

/** get all the communities */
const getCommunities = async () => {
  const db = await getDB();
  const result = await db.collection('communities').find({}).toArray();
  console.log('communities', JSON.stringify(result));
  return result;
};

const addCommunity = async (newCommunity) => {
  const db = await getDB();
  const result = await db.collection('communities').insertOne(newCommunity);
  return result.insertedId;
};

const newConversation = async (document) => {
  const db = await getDB();
  const result = await db.collection('sockets').insertOne(document);
  return result.insertedId;
};

const getMessages = async (socket) => {
  const db = await getDB();
  const result = await db.collection('sockets').findOne({ _id: socket });
  return result.messages;
};

const getSockets = async () => {
  const db = await getDB();
  // console.log('Hello');
  const sockets = await db.collection('sockets').find({}).toArray();
  return sockets;
};

const updateMessages = async (socket, updatedSocket) => {
  const db = await getDB();
  const result = await db.collection('sockets').updateOne(
    { _id: socket },
    { $set: { messages: updatedSocket.messages } },
  );
  return result;
};

module.exports = {
  connect,
  close,
  getUsers,
  getMessages,
  getUser,
  getSockets,
  updateMessages,
  addUser,
  getCommunities,
  addCommunity,
  getPassword,
  newConversation,
  getDB,
  getPlaylists,
};
