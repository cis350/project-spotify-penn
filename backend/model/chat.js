const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://maggie:maggieschwierking@spotifypenn.kfju1o3.mongodb.net/test';

let mongoConnection;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect();
    console.log('connected to DB - chat', mongoConnection.db().databaseName);
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
  getDB,
  newConversation,
  getMessages,
  getSockets,
  updateMessages,
};
