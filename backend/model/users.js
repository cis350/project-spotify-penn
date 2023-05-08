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
const getUsers = async () => {
  const db = await getDB();
  const users = await db.collection('users').find({}).toArray();
  console.log('users', JSON.stringify(users));
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
                  else: { $concat: ['$$value', ', ', '$$this'] }
                }
              }
            }
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
  getRankedArtists,
};
