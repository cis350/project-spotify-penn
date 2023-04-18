/* eslint-disable no-console */
/**
 * this file contains all the CRUD operations from swaggerHub.
 */

const { mongoClient } = require('mongodb');

const uri = 'mongodb+srv://abhijay:abhijayagarwal@spotifypenn.kfju1o3.mongodb.net/?retryWrites=true&w=majority';

let mongoConnection;

const connect = async () => {
  try {
    mongoConnection = await mongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    console.log('connected to DB', mongoConnection.db().databaseName);
    return mongoConnection;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const close = async () => {
  try {
    await mongoConnection.close();
    console.log('closed connection to DB');
    return null;
  } catch (err) {
    console.log(err);
    return err;
  }
};

connect();

// eslint-disable-next-line no-undef
modules.exports = {
  connect,
  close,
};
