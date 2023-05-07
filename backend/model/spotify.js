const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://maggie:maggieschwierking@spotifypenn.kfju1o3.mongodb.net/test';

let mongoConnection;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect();
    console.log('connected to DB - spotify', mongoConnection.db().databaseName);
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

const setUserSongs = async (id, newSongs) => {
  const db = await getDB();
  const result = await db.collection('users').updateOne(
    { _id: id },
    { $set: { songs: newSongs } },
  );
  if (result.matchedCount === 0) {
    throw new Error(`User with ID ${id} not found`);
  } else {
    console.log(`Successfully updated songs for ID ${id}`);
  }
  return result;
};

const setUserAlbums = async (id, newArtists) => {
  const db = await getDB();
  const result = await db.collection('users').updateOne(
    { _id: id },
    { $set: { artists: newArtists } },
  );
  if (result.matchedCount === 0) {
    throw new Error(`User with ID ${id} not found`);
  } else {
    console.log(`Successfully updated albums for ID ${id}`);
  }
  return result;
};

module.exports = {
  connect,
  close,
  setUserSongs,
  setUserAlbums,
};
