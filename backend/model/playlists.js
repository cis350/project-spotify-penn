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

const getPlaylists = async (user_id) => {
  // get the db
  const db = await getDB();
  const playlists = await db.collection('playlists').find({}).toArray();

  // add like true/false to each playlist object
  for (let i = 0; i < playlists.length; i++) {
    const playlist = playlists[i];
    if (checkLikeObject(playlist, user_id)) {
      playlist.likes = true;
    } else {
      playlist.likes = false;
    }
  }

  return playlists;
};

const toggleLikeObject = async (obj_id, user_id, collection) => {
  const db = await getDB();
  const obj = await db.collection(collection).findOne({ id: obj_id });

  if (!obj) {
    return undefined;
  }

  //check if user_likes exists
  if (!obj.user_likes) {
    await db.collection(collection).updateOne({ id: obj_id }, { $set: { user_likes: [user_id] } });
    return { likes: true};
  } else if (obj.user_likes.includes(user_id)) {
    await db.collection(collection).updateOne({ id: obj_id }, { $pull: { user_likes: user_id } });
    return { likes: false};
  } else {
    await db.collection(collection).updateOne({ id: obj_id }, { $push: { user_likes: user_id } });
    return { likes: true};
  }
}

const toggleLikePlaylist = async (playlist_id, user_id) => {
  return await toggleLikeObject(playlist_id, user_id, 'playlists');
}

const checkLikeObjectFromDB = async (obj_id, user_id, collection) => {
  const db = await getDB();
  const obj = await db.collection(collection).findOne({ id: obj_id });

  return (checkLikeObject(obj, user_id));
}

const checkLikeObject = (obj, user_id) => {
  console.log('adding user like to object', obj, ' for ', user_id, ' result: ', obj.user_likes && obj.user_likes.includes(user_id));
  return (obj.user_likes && obj.user_likes.includes(user_id));
}

const checkLikePlaylist = async (playlist_id, user_id) => {
  return await checkLikeObjectFromDB(playlist_id, user_id, 'playlists');
}


module.exports = {
  getPlaylists,
  toggleLikePlaylist,
  checkLikePlaylist,
};
