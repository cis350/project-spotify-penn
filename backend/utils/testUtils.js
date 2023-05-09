/* eslint-disable no-underscore-dangle */
const insertTestDataToCommunitiesDB = async (db, testData) => {
  const result = await db.collection('communities').insertOne(testData);
  return result.insertedId;
};

const deleteTestDataFromCommunitiesDB = async (db, testData) => {
  try {
    const result = await db.collection('communities').deleteMany({ name: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test community');
    } else {
      console.log('warning', 'test community was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

const testCommunity = {
  name: 'testCommunity',
  image: 'randomURL',
  numMember: '1',
  description: 'randomdescription',
};

const testNewArtist = {
  artistName: 'TestArtist',
  email: 'test@example.com',
  spotifyURL: 'testtest',
  playlistName: 'TestPlaylist',
  description: 'TestDescription',
  likes: false,
  userLikes: [],
};

/**
 * utility functions for testing
 */

/**
 * Adds a test student to the DB
 * @param {*} testData - the test data
 * @param {*} db - the database
 * @returns the id of the data
 */
const insertTestDataToNewArtistsDB = async (db, testData) => {
  const result = await db.collection('newArtists').insertOne(testData);
  return result.insertedId;
};
/**
*
* @param {*} db
* @param {*} testData
* @returns
*/
const deleteTestDataFromNewArtistsDB = async (db, testDataName) => {
  try {
    const result = await db.collection('newArtists').deleteMany({ artistName: testDataName });
    const { deletedCount } = result;
    if (deletedCount >= 1) {
      console.log('info', 'Successfully deleted test new artist');
    } else {
      console.log('warning', 'test new artist was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
* utility function to test if the id
* of the test student is in the response (array)
*
* @param {*} arr
* @param {*} val
* @returns
*/
const isInArrayNewArtist = (arr, val) => {
  let value = false;
  // eslint-disable-next-line array-callback-return
  arr.map((x) => {
    if (String(x.artistName) === String(val)) {
      value = true;
    }
  });
  return value;
};

// user test functions
const testUser = {
  firstName: 'Test',
  lastName: 'Test',
  password: 'password',
  songs: [],
  artists: [],
  communities: [],
  friends: [],
  playlists: [],
  following: [],
};

/**
 * utility functions for testing
 */

/**
 * Adds a test student to the DB
 * @param {*} testData - the test data
 * @param {*} db - the database
 * @returns the id of the data
 */
const insertTestDataToUsersDB = async (db, testData) => {
  const result = await db.collection('users').insertOne(testData);
  return result.insertedId;
};
/**
*
* @param {*} db
* @param {*} testData
* @returns
*/
const deleteTestDataFromUsersDB = async (db, testDataName) => {
  try {
    const result = await db.collection('users').deleteMany({ artistName: testDataName });
    const { deletedCount } = result;
    if (deletedCount >= 1) {
      console.log('info', 'Successfully deleted test user');
    } else {
      console.log('warning', 'test user was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

// export the functions
module.exports = {
  insertTestDataToCommunitiesDB,
  deleteTestDataFromCommunitiesDB,
  testCommunity,
  testNewArtist,
  isInArrayNewArtist,
  deleteTestDataFromNewArtistsDB,
  insertTestDataToNewArtistsDB,
  testUser,
  deleteTestDataFromUsersDB,
  insertTestDataToUsersDB,
};
