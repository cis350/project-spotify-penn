const express = require('express');

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
  resp.json({ messge: 'hello CIS3500 friends!!! You have dreamy eyes' });
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
