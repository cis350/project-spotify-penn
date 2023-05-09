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
      console.log('info', 'Successfully deleted test student');
    } else {
      console.log('warning', 'test student was not deleted');
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
  description: 'randomdescription',
};

const isInArray = (arr, val) => {
  let value = false;
  arr.map((x) => {
    if (String(x._id) === String(val)) {
      value = true;
    }
  });
  return value;
};

const deleteTestDataFromNewArtistsDB = async (db, testData) => {
  try {
    const result = await db.collection('newArtists').deleteMany({ name: testData });
    const { deletedCount } = result;
    if (deletedCount >= 1) {
      console.log('info', 'Successfully deleted test student');
    } else {
      console.log('warning', 'test student was not deleted');
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
  isInArray,
  deleteTestDataFromNewArtistsDB,
};
