const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const rawBody = require('raw-body');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();

// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const db = require('./dbOperations');

// root endpoint route
webapp.get('/', (req, resp) => {
  resp.json({ messge: 'This is spotify at Penn' });
});

webapp.get('/users', async (req, resp) => {
  try {
    // get the data from the DB
    const students = await db.getUsers();
    // send response
    resp.status(200).json({ data: students });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/users', async (req, res) => {
  try {
    const userData = req.body;
    const result = await db.addUser(userData);
    res.status(201).json({ message: 'User added successfully', data: result });
  } catch (err) {
    res.status(400).json({ message: 'Error adding user', error: err });
  }
});

webapp.get('/communities', async (req, res) => {
  try {
    const results = await db.getCommunities();
    if (results === undefined) {
      res.status(404).json({ error: 'no communities exist' });
      return;
    }
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'error in retrieving communities' });
  }
});

webapp.post('/communities', async (req, res) => {
  try {
    const buffer = await rawBody(req);
    const payload = JSON.parse(buffer.toString());
    const {
      name, image, numMember, description,
    } = payload;
    const newCommunity = {
      name,
      image,
      numMember,
      description,
    };
    const result = await db.addCommunity(newCommunity);
    res.status(201).json({ data: { id: result } });
  } catch (err) {
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/newartists', async (req, res) => {
  try {
    const results = await db.getAllNewArtistPlaylist();
    if (results === undefined) {
      res.status(404).json({ error: 'no new artists' });
      return;
    }
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});

webapp.post('/newartists', async (req, res) => {
  const {
    id, name, url, playlist, desc,
  } = req.body;

  if (!id || !name || !url || !playlist || !desc) {
    res.status(400).json({ message: 'missing info' });
    return;
  }

  try {
    const results = await db.addNewArtistPlaylist(id, name, url, playlist, desc);
    res.status(201).json({ message: 'new artist playlist added', data: results });
  } catch (err) {
    res.status(409).json({ message: 'error', error: err });
  }
});

webapp.get('/playlists', async (req, res) => {
  try {
    console.log('Called get playlists');
    // get the data from the db
    const results = await db.getPlaylists();
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
    const results = await db.getUser(req.params.id);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown student' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

module.exports = webapp;
