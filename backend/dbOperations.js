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
  if (!mongoConnection) {
    await connect();
  }
  return mongoConnection.db('spotify');
};

const getPlaylists = async () => {
  // get the db
  const db = await getDB();
  const playlists = await db.collection('playlists').find({}).toArray();
  return playlists;
};


module.exports = {
  connect,
  close,
  getDB,
  getPlaylists,
};
