const insertTestDataToCommunitiesDB = async (db, testData) => {
  const result = await db.collection('communities').insertOne(testData);
  return result.insertedId;
}

const deleteTestDataFromCommunitiesDB = async (db, testData) => {
  try {
    const result = await db.collection('communities').deleteMany({ name: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test student');
    } else {
      console.log('warning', 'test student was not deleted');
    }
    } catch (err) {
      console.log('error', err.message);
    }
}


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



// test user
// define the test user
const testCommunity = {
name: 'testCommunity',
image: 'randomURL',
numMember: '1',
description: 'randomdescription'
};

const isInArray = (arr, val) =>{
let value = false;
arr.map((x) =>{
  if(String(x._id) === String(val)){
    value = true;
  }
});
return value;
}


// export the functions
module.exports = {
  insertTestDataToCommunitiesDB,
  deleteTestDataFromCommunitiesDB,
  testCommunity,
  isInArray,
  testUser,
  insertTestDataToUsersDB,
  deleteTestDataFromUsersDB,
};