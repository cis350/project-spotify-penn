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
    users_likes: [currentUserId],
  });
  console.log(`Uploaded playlist: ${result.insertedId}`);
  return result.insertedId;
}

async function getNewArtistPlaylists() {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('newArtists').find({}).toArray();
    // print the result
    console.log(`New Artist Playlists: ${JSON.stringify(result.playlistName)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
}

async function toggleNewArtistLikes(item_id, user_id) {
  try {
    // currentUserId needs to defined using the sessions
    const db = await getDB();
    const playlist = await db.collection('newArtists').findOne({_id: item_id});
    const users = playlist.users_likes;
    const found = users.some(user => user.equals(user_id));

    // add user from the userlist if not found
    if (!found) {
      users.push(user_id);
      const res = await db.collection('newArtists').updateOne(
        { _id: item._id },
        { $set: { users_likes: users } }
      );
      return res.data;
    } else {
      // remove user otherwise
      const res = await db.collection('newArtists').updateOne(
        { _id: item._id },
        { $pull: { users_likes: user_id } }
      );
      return res.data;

    }
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

module.exports = {
  getNewArtistPlaylists,
  postNewArtistPlaylist,
  toggleNewArtistLikes
};
