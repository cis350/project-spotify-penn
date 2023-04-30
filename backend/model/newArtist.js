const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://maggie:maggieschwierking@spotifypenn.kfju1o3.mongodb.net/test';
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

// connect to mongoDb and return the database
const getDB = async () => {
  // test if already connected
  if (!mongoConnection) {
    await connect();
  }
  return mongoConnection.db('spotify');
};

async function addNewArtistPlaylist(id, name, url, playlist, desc) {
  const db = await getDB();
  const result = await db.collection('newArtists').insertOne({
    _id: id,
    artistName: name,
    spotifyURL: url,
    playlistName: playlist,
    description: desc,
    likes: false,
  });
  console.log(`Uploaded playlist: ${result.insertedId}`);
  return result.insertedId;
}

async function getAllNewArtistPlaylist() {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('newArtists');
    // print the result
    console.log(`New Artist Playlists: ${JSON.stringify(result.playlistName)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
}

module.exports = {
  addNewArtistPlaylist,
  getAllNewArtistPlaylist,
};
