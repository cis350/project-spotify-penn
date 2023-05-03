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
    console.log('connected to DB - new artists', mongoConnection.db().databaseName);
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

async function postNewArtistPlaylist(id, name, url, playlist, desc) {
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

async function getNewArtistPlaylists() {
  try {
    // get the db
    const db = await getDB();
    const newArtistsCollection = await db.collection('newArtists');
    
    // Query the collection to get all documents
    const allDocuments = await newArtistsCollection.find().toArray();

    // Iterate through the documents and print the playlistName
    allDocuments.forEach((doc) => {
      console.log(`New Artist Playlists: ${JSON.stringify(doc.playlistName)}`);
    });

    return allDocuments;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
}

async function updateNewArtistLikes(item) {
  try {
    const db = await getDB();
    const itemlikes = !item.likes;
    const res = await db.collection('newArtists').updateOne({_id: item._id}, {likes: itemlikes });
    return res.data;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

module.exports = {
  getNewArtistPlaylists,
  postNewArtistPlaylist,
  updateNewArtistLikes
};
