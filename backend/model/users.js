/* eslint-disable no-console */
/**
 * this file contains all the CRUD operations from swaggerHub.
 */

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://maggie:maggieschwierking@spotifypenn.kfju1o3.mongodb.net/test';

let mongoConnection;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect();
    console.log('connected to DB - users', mongoConnection.db().databaseName);
    return mongoConnection;
  } catch (err) {
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
const getUsers = async (user_id) => {
  const db = await getDB();
  const users = await db.collection('users').find({}).toArray();

  if (user_id) {
    console.log('getUsers includes user_id: ', user_id);
    // add following true/false to each playlist object

    const follower = await db.collection('users').findOne({ _id: user_id });

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (checkFollow(follower, user._id)) {
        console.log('user', user._id, ' follows: true');
        user.follows = true;
      } else {
        console.log('user', user._id, ' follows: false');
        user.follows = false;
      }
    }
  }
  // console.log('users', JSON.stringify(users));
  return users;
};

/* get a user by email */
const getUser = async (email) => {
  const db = await getDB();
  const user = await db.collection('users').findOne({ _id: email });
  return user;
};

/* add a new user */
const addUser = async (newUser) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('users').insertOne(newUser);
  return result.insertedId;
};

const getPassword = async (id) => {
  const db = await getDB();
  const user = await db.collection('users').findOne({ _id: id });
  return user.password;
};

const updateUser = async (id) => {
  const db = await getDB();

  try {
    const result = await db.collection('users').updateOne(
      { _id: id },
      { $set: { new: false } },
    );

    if (result.matchedCount === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    console.log(`Successfully updated user with ID ${id}`);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error.message);
  }
};

async function getRankedSongs(page, pageSize) {
  try {
    const db = await getDB();
    const offset = (page - 1) * pageSize;
    let rankedSongs = await db.collection('users').aggregate([
      { $unwind: '$songs' },
      { $group: { _id: '$songs.id', count: { $sum: 1 }, song: { $first: '$songs' } } },
      { $sort: { count: -1, 'song.songName': 1 } },
      {
        $project: {
          title: '$song.songName',
          album: '$song.albumName',
          count: 1,
        },
      },
      { $skip: offset },
      { $limit: pageSize },

    ]).toArray();

    rankedSongs = rankedSongs.map((song, index) => ({
      ...song,
      rank: offset + index + 1,
    }));

    return rankedSongs;
  } catch (err) {
    return null;
  }
}

const checkFollow = (user, followee_id) => {
  console.log('adding user follow to object', user._id, ' for ', followee_id, ' result: ', user.following && user.following.includes(followee_id));
  return user.following && user.following.includes(followee_id);
};

const toggleFollow = async (follower_id, followee_id) => {
  const db = await getDB();
  // check folowee exists
  const followee = await db.collection('users').findOne({ _id: followee_id });

  if (!followee) {
    console.log('followee does not exist');
    return undefined;
  }

  const obj = await db.collection('users').findOne({ _id: follower_id });

  if (!obj) {
    console.log('follower does not exist');
    return undefined;
  }

  // check if user_likes exists
  if (!obj.following) {
    console.log('following does not exist, adding with followee_id');
    await db.collection('users').updateOne({ _id: follower_id }, { $set: { following: [followee_id] } });
    return { following: true };
  } if (obj.following.includes(followee_id)) {
    console.log('following exists, removing followee_id');
    await db.collection('users').updateOne({ _id: follower_id }, { $pull: { following: followee_id } });
    return { following: false };
  }
  console.log('following exists, adding followee_id');
  await db.collection('users').updateOne({ _id: follower_id }, { $push: { following: followee_id } });
  return { following: true };
};

const getPlaylists = async (id) => {
  const db = await getDB();
  try {
    const userData = await db.collection('users').findOne({ _id: id });
    console.log(`User Playlists: ${JSON.stringify(userData.playlists)}`);
    return userData.playlists;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const postPlaylists = async (id, playlistid, name, desc) => {
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ _id: id });

    if (!user) {
      console.log(`User not found: ${id}`);
      return null;
    }

    const updatedPlaylists = user.playlists;
    const newPlaylist = {
      playlistid,
      name,
      desc,
    };
    updatedPlaylists.push(newPlaylist);
    const res = await db.collection('users').updateOne(
      { _id: id },
      { $set: { playlists: updatedPlaylists } },
    );

    console.log(`Uploaded playlist: ${newPlaylist}`);

    if (res.matchedCount === 0) {
      console.log(`No matching document found for user id: ${id}`);
      return null;
    } if (res.modifiedCount === 0) {
      console.log(`User document not modified for user id: ${id}`);
      return null;
    }
    console.log(`Uploaded playlist: ${newPlaylist}`);
    return res.matchedCount;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const getFriends = async (id) => {
  const db = await getDB();
  try {
    const user = await db.collection('users').findOne({ _id: id });

    if (!user) {
      console.log(`User not found: ${id}`);
      return null;
    }

    const { friends } = user;
    console.log(`User Friends: ${JSON.stringify(friends)}`);
    return friends;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const getCommmunities = async (id) => {
  const db = await getDB();
  try {
    const user = await db.collection('users').findOne({ _id: id });
    console.log(user.communities);
    if (!user) {
      console.log(`User not found: ${id}`);
      return null;
    }

    const { communities } = user;
    console.log(id);
    console.log(`User Communities: ${JSON.stringify(communities)}`);
    return communities;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

async function getRankedArtists(page, pageSize) {
  try {
    const db = await getDB();
    const offset = (page - 1) * pageSize;
    let rankedArtists = await db.collection('users').aggregate([
      { $unwind: '$artists' },
      { $group: { _id: '$artists.artistName', count: { $sum: 1 }, artist: { $first: '$artists' } } },
      { $sort: { count: -1, 'artist.artistName': 1 } },
      {
        $project: {
          artist: '$artist.artistName',
          genre: {
            $reduce: {
              input: '$artist.genres',
              initialValue: '',
              in: {
                $cond: {
                  if: { $eq: ['', '$$value'] },
                  then: '$$this',
                  else: { $concat: ['$$value', ', ', '$$this'] },
                },
              },
            },
          },
          count: 1,
        },
      },
      { $skip: offset },
      { $limit: pageSize },

    ]).toArray();

    rankedArtists = rankedArtists.map((artist, index) => ({
      ...artist,
      rank: offset + index + 1,
    }));

    return rankedArtists;
  } catch (err) {
    return null;
  }
}

module.exports = {
  connect,
  close,
  getUsers,
  getUser,
  addUser,
  updateUser,
  getPassword,
  getRankedSongs,
  getPlaylists,
  postPlaylists,
  getFriends,
  getCommmunities,
  toggleFollow,
  getRankedArtists,
};
