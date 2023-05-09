/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const { getDB } = require('../utils/dbUtils');
const { toggleLikeObject, checkLikeObject } = require('../utils/toggleLikeUtil');

async function postNewArtistPlaylist(name, email, playlist, url, desc) {
  const db = await getDB();
  const result = await db.collection('newArtists').insertOne({
    artistName: name,
    email,
    spotifyURL: url,
    playlistName: playlist,
    description: desc,
    likes: false,
    userLikes: [email],
  });
  console.log(`Uploaded playlist: ${result.insertedId}`);
  return result.insertedId;
}

async function getNewArtistPlaylists(userId) {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('newArtists').find({}).toArray();

    // add like true/false to each playlist object
    for (let i = 0; i < result.length; i += 1) {
      const newArtist = result[i];
      if (checkLikeObject(newArtist, userId)) {
        newArtist.likes = true;
      } else {
        newArtist.likes = false;
      }
    }

    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
}

async function toggleNewArtistLikes(itemId, userId) {
  return toggleLikeObject(itemId, userId, 'newArtists');
}

module.exports = {
  getNewArtistPlaylists,
  postNewArtistPlaylist,
  toggleNewArtistLikes,
};
