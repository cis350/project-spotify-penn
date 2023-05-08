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
  console.log(result);
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
  //check folowee exists
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

  //check if user_likes exists
  if (!obj.following) {
    console.log('following does not exist, adding with followee_id');
    await db.collection('users').updateOne({ _id: follower_id }, { $set: { following: [followee_id] } });
    return { following: true};
  } else if (obj.following.includes(followee_id)) {
    console.log('following exists, removing followee_id')
    await db.collection('users').updateOne({ _id: follower_id }, { $pull: { following: followee_id } });
    return { following: false};
  } else {
    console.log('following exists, adding followee_id')
    await db.collection('users').updateOne({ _id: follower_id }, { $push: { following: followee_id } });
    return { following: true};
  }

};




module.exports = {
  connect,
  close,
  getUsers,
  getUser,
  addUser,
  updateUser,
  getPassword,
  getRankedSongs,
  toggleFollow,
};
