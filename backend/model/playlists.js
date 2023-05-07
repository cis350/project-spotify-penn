const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://stela:stelarosa@spotifypenn.kfju1o3.mongodb.net/test';
let mongoConnection;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect();
    console.log('connected to DB - playlists', mongoConnection.db().databaseName);
    return mongoConnection;
  } catch (err) {
    return err;
  }
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
  getPlaylists,
};
