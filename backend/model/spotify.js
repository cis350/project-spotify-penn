/* eslint-disable no-console */
const { getDB } = require('../utils/dbUtils');

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
