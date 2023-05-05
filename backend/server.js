const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const rawBody = require('raw-body');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

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
  console.log("received POST /communities");
  try {
    const newCommunity = {
      name: req.body.name,
      image: req.body.image,
      numMember: req.body.numMember,
      description: req.body.description,
    };
    console.log("POST /communities received:");
    console.log(newCommunity);
    const result = await dbCommunities.addCommunity(newCommunity);
    res.status(201).json({ data: { id: result } });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/newartistplaylists', async (req, res) => {
  console.log("hit GET /newartistplaylists");
  try {
    const results = await dbNewArtist.getNewArtistPlaylists();
    console.log("Results:");
    console.log(results);
    if (results === undefined) {
      res.status(404).json({ error: 'no new artists' });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
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
    user_id = req.headers.authorization;
    item_id = req.params.id;
    const results = await dbNewArtist.toggleNewArtistLikes(item_id, user_id);
    if (results === undefined) {
      res.status(404).json({ error: 'Playlist not found'} );
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
})

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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
    res.status(404).json({ message: errmsg });
  }
});

module.exports = webapp;
