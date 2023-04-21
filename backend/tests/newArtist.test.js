// import MongoClient
const { MongoClient } = require('mongodb');

// import functions to be tested
const { addNewArtistPlaylist, getAllNewArtistPlaylist } = require('./../model/newArtist');

// connection string
const uri = 'mongodb+srv://abhijay:abhijayagarwal@spotifypenn.kfju1o3.mongodb.net/?retryWrites=true&w=majority';

describe('Database Operations', () => {
  let mongoConnection;

  // connect to the database before running any test
  beforeAll(async () => {
    mongoConnection = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // close database connection after running all tests
  afterAll(async () => {
    await mongoConnection.close();
  });

  describe('addNewArtistPlaylist()', () => {
    // clear database before running each test
    beforeEach(async () => {
      await mongoConnection.db('spotify').collection('newArtists').deleteMany({});
    });

    test('adds new artist playlist to the database', async () => {
      const playlist = {
        _id: 500,
        artistName: 'John Doe',
        spotifyURL: 'https://open.spotify.com/playlist/123',
        playlistName: 'New Music',
        description: 'Some new music',
        likes: false,
      };
    
      // add new artist playlist to the database
      await addNewArtistPlaylist(playlist._id, playlist.artistName, playlist.spotifyURL, playlist.playlistName, playlist.description, playlist.likes);
    
      // get the newly added artist playlist
      const result = await mongoConnection.db('spotify').collection('newArtists').findOne({ _id: playlist._id });
    
      // check that the artist playlist was added correctly
      expect(result).toEqual(playlist);
    });
    afterAll(async () => {
      // we need to clear the DB
      try {
        await deleteTestDataFromDB(db, '_id: 500');;
        await mongo.close(); // the test  file connection
        await closeMongoDBConnection(); // the express connection
      } catch (err) {
        return err;
      }
    });
  });

  describe('getAllNewArtistPlaylist()', () => {
    // add test data to the database before running each test
    beforeEach(async () => {
      await mongoConnection.db('spotify').collection('newArtists').insertMany([
        {
          _id: 700,
          artistName: 'Jane Smith',
          spotifyURL: 'https://open.spotify.com/playlist/456',
          playlistName: 'Cool Music',
          description: 'Some cool music',
          likes: true,
        },
      ]);
    });

    test('returns all new artist playlists from the database', async () => {
      // get all new artist playlists from the database
      const result = await getAllNewArtistPlaylist();

      // check that all artist playlists were returned
      expect(result.length).toBe(1);
    });
  });

  afterAll(async () => {
    // we need to clear the DB
    try {
      await deleteTestDataFromDB(db, '_id: 700');;
      await mongo.close(); // the test  file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
  });
});
