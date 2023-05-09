const { getDB } = require('../utils/dbUtils');

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/** get all the communities */
const getCommunities = async (user_id) => {
  const db = await getDB();
  const result = await db.collection('communities').find({}).toArray();

  if (user_id) {
    // add member true/false to each community object
    for (let i = 0; i < result.length; i++) {
      const community = result[i];
      if (community.members && community.members.includes(user_id)) {
        community.member = true;
      } else {
        community.member = false;
      }
    }
  }

  for (let i = 0; i < result.length; i++) {
    const community = result[i];
    if (community.members) {
      community.numMember = community.members.length;
    } else {
      community.numMember = 0;
    }
  }

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
  const cID = new ObjectId(community_id);
  const community = await db.collection('communities').findOne({ _id: cID });

  console.log('community: ', community);

  if (!community) {
    return community;
  }

  //check if user_likes exists
  if (!community.members) {
    await db.collection('communities').updateOne({ _id: cID }, { $set: { members: [user_id] } });
    return { member: true};
  } else if (community.members.includes(user_id)) {
    await db.collection('communities').updateOne({ _id: cID }, { $pull: { members: user_id } });
    return { member: false};
  } else {
    await db.collection('communities').updateOne({ _id: cID }, { $push: { members: user_id } });
    return { member: true};
  }

};

module.exports = {
  getCommunities,
  addCommunity,
  toggleMembership,
};
