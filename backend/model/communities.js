const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dzung:dzungthan@spotifypenn.kfju1o3.mongodb.net/test';
let mongoConnection;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect();
    console.log('connected to DB - communities', mongoConnection.db().databaseName);
    return mongoConnection;
  } catch (err) {
    return err;
  }
};

// connect to mongoDb and return the database

const getDB = async () => {
  // test if already connected
  console.log(mongoConnection);
  if (!mongoConnection) {
    await connect();
  }
  return mongoConnection.db('spotify');
};

/** get all the communities */
const getCommunities = async () => {
  const db = await getDB();
  const result = await db.collection('communities').find({}).toArray();
  console.log('communities', JSON.stringify(result));
  return result;
};

const addCommunity = async (newCommunity) => {
  const db = await getDB();
  const result = await db.collection('communities').insertOne(newCommunity);
  return result.insertedId;
};

const toggleMembership = async (user_id, community_id) => {
  const db = await getDB();
  const community = await db.collection('communities').findOne({ _id: community_id });

  if (!community) {
    return community;
  }

  //check if user_likes exists
  if (!community.members) {
    await db.collection(collection).updateOne({ _id: community_id }, { $set: { members: [user_id] } });
    return { member: true};
  } else if (community.members.includes(user_id)) {
    await db.collection(collection).updateOne({ _id: community_id }, { $pull: { members: user_id } });
    return { member: false};
  } else {
    await db.collection(collection).updateOne({ _id: community_id }, { $push: { members: user_id } });
    return { member: true};
  }

};

const getMembers = async () => {
  const db = await getDB();
  const result = await db.collection('communities').findOne({ id: obj_id }).toArray();
  
  return result;
};

module.exports = {
  getCommunities,
  addCommunity,
  getMembers,
  toggleMembership,
};
