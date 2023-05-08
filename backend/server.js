const express = require('express');

const fs = require('fs');

const formidable = require('formidable');

// eslint-disable-next-line import/no-extraneous-dependencies
// const rawBody = require('raw-body');

// import the cors -cross origin resource sharing- module
const cors = require('cors');
const s3 = require('./s3Operations');

// create a new express app
const webapp = express();

// enable cors
webapp.use(cors());

// enable json body parsing
webapp.use(express.json());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db functions
const dbChat = require('./model/chat');
const dbCommunities = require('./model/communities');
const dbNewArtist = require('./model/newArtist');
const dbPlaylists = require('./model/playlists');
const dbUsers = require('./model/users');
const dbSpotify = require('./model/spotify');
const { default: CommunitiesTable } = require('../client/src/components/CommunitiesTable');

// root endpoint route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'This is spotify at Penn' });
});

webapp.get('/users', async (req, resp) => {
  try {
    // get the data from the DB
    const users = await dbUsers.getUsers();
    resp.status(200).json(users);
    // send response
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/users', async (req, res) => {
  try {
    const userData = req.body;
    const result = await dbUsers.addUser(userData);
    res.status(201).json({ message: 'User added successfully', data: result });
  } catch (err) {
    res.status(400).json({ message: 'Error adding user', error: err });
  }
});

webapp.get('/communities', async (req, res) => {
  try {
    const results = await dbCommunities.getCommunities();
    if (results === undefined) {
      res.status(404).json({ error: 'no communities exist' });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: 'error in retrieving communities' });
  }
});

webapp.post('/communities', async (req, res) => {
  console.log('hit POST /communities');
  try {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
      console.log('form', form);
      console.log('fields:', fields);

      if (err) {
        console.log('error', err.message);
        res.status(404).json({ error: err.message });
      }
      let cacheBuffer = Buffer.alloc(0);

      console.log('files:');
      console.log(files);

      // create a stream from the virtual path of the uploaded file
      const fStream = fs.createReadStream(files.File_0.filepath);

      fStream.on('data', (chunk) => {
        // fill the buffer with data from the uploaded file
        cacheBuffer = Buffer.concat([cacheBuffer, chunk]);
      });

      fStream.on('end', async () => {
        // send buffer to AWS
        console.log('sending to aws');
        const s3URL = await s3.uploadFile(cacheBuffer, files.File_0.newFilename);
        console.log('end', cacheBuffer.length);

        const newCommunity = {
          name: fields.name,
          image: s3URL,
          numMember: fields.numMember,
          description: fields.desc,
        };

        const result = await dbCommunities.addCommunity(newCommunity);
        res.status(201).json({ data: { id: result } });
      });
    });
  } catch (err) {
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/newartistplaylists', async (req, res) => {
  console.log('hit GET /newartistplaylists');
  try {
    const results = await dbNewArtist.getNewArtistPlaylists();
    console.log('results', results);
    if (results === undefined) {
      res.status(404).json({ error: 'no new artists' });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});

webapp.post('/newartistplaylists', async (req, res) => {
  const {
    id, name, url, playlist, desc,
  } = req.body;

  if (!id || !name || !url || !playlist || !desc) {
    res.status(400).json({ message: 'missing info' });
    return;
  }

  try {
    const results = await dbNewArtist.postNewArtistPlaylist(id, name, url, playlist, desc);
    res.status(201).json(results);
  } catch (err) {
    res.status(409).json({ message: 'error', error: err });
  }
});

webapp.put('newartistplaylists/:_id', async (req, res) => {
  try {
    console.log('change likes');
    const results = await dbNewArtist.toggleNewArtistLikes();
    if (results === undefined) {
      res.status(404).json({ error: 'Playlist not found' });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
});

webapp.get('/playlists', async (req, res) => {
  try {
    console.log('Called get playlists');
    // get the data from the db
    const results = await dbPlaylists.getPlaylists();
    if (results === undefined) {
      res.status(404).json({ error: 'No Playlists found' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'there was a server error' });
  }
});

webapp.get('/users/:id', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbUsers.getUser(req.params.id);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown student' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.put('/users/:id', async (req, res) => {
  try {
    const results = await dbUsers.updateUser(req.params.id);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown user' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.put('/sockets/:socket', async (req, res) => {
  try {
    const socketId = parseInt(req.params.socket, 10);
    const document = req.body;
    const result = await dbChat.updateMessages(socketId, document);
    if (result === undefined) {
      res.status(404).json({ error: 'unknown socket' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.get('/sockets/:socket', async (req, res) => {
  try {
    // get the data from the db
    const socketId = parseInt(req.params.socket, 10);
    const results = await dbChat.getMessages(socketId);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown socket' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.get('/sockets', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbChat.getSockets();
    if (results === undefined) {
      res.status(404).json({ error: 'unknown socket' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.post('/sockets', async (req, res) => {
  try {
    const document = req.body;
    console.log(document);
    const result = await dbChat.newConversation(document);
    if (result === undefined) {
      res.status(404).json({ error: 'unknown socket' });
    } else {
      res.status(201).json(result);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.get('/communities', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbCommunities.getCommunities();
    if (results === undefined) {
      res.status(404).json({ error: 'unknown community' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.put('/songs/:id', async (req, res) => {
  try {
    const { songs } = req.body;
    const results = await dbSpotify.setUserSongs(req.params.id, songs);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown song' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.put('/artists/:id', async (req, res) => {
  try {
    const { artists } = req.body;
    const results = await dbSpotify.setUserAlbums(req.params.id, artists);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown album' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    const errmsg = err.message;

    res.status(404).json({ message: errmsg });
  }
});

webapp.get('/songs', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.page_size, 10) || 10000000000;
  try {
    const results = await dbUsers.getRankedSongs(page, pageSize);
    if (results === null) {
      res.status(404).json({ error: 'unknown song' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
});

webapp.get('/artists', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.page_size, 10) || 10000000000;
  try {
    const results = await dbUsers.getRankedArtists(page, pageSize);
    if (results === null) {
      res.status(404).json({ error: 'unknown artist' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
});

webapp.get('/communities/members/:id', async (req, res) => {
  try {
    community_id = req.params.id;
    user_id = req.headers.authorization;
    const results = await dbCommunities.toggleMembership(user_id, community_id);
    if (results === null) {
      res.status(404).json({ error: 'unknown community' });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
});



module.exports = webapp;
