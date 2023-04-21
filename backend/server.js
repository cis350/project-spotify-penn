const express = require('express');
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
    const students = await db.getStudents();
    // send response
    resp.status(200).json({ data: students });
  } catch (err) {
    // send the error code
    resp.status(400).json({ message: 'There was an eror' });
  }
});

webapp.get('/users/:id', async (req, res) => {
  try {
    // get the data from the db
    const results = await db.getStudent(req.params.id);
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

webapp.get('/communities', async (req, res) => {
  try {
    const results = await db.getCommunities();
    if (results === undefined) {
      res.status(404).json({ error: 'no communities exist'});
      return;
    }
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'error in retrieving communities'});
  }
});

webapp.post('/communities', async (req, res) => {
  try{
    const buffer = await rawBody(req);
    const payload = JSON.parse(buffer.toString());
    const { name, image, numMember, description } = payload;
    const newCommunity = {
        name: name,
        image: image,
        numMember: numMember,
        description: description,
    }
    const result = await db.addCommunity(newCommunity);
    res.status(201).json({data: {id: result}});

  }catch(err){
    res.status(400).json({message: 'There was an error'});
  }
});

module.exports = webapp;
