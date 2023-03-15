'use strict'

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Cat = require('./models/cat.js');

// bring in mongoose
const mongoose = require('mongoose');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect Mongoose to our MongoDB
mongoose.connect(process.env.DB_URL);


// USE
// implement express
const app = express();

// middleware
app.use(cors());
// we must have this to recieve JSON data from a request
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/cats', getCats);
app.post('/cats', postCats);

// If I have this URL coming in the request:
// http://localhost:3001/cats/637bceabc57c693faee21e8f
// I access the value 637bceabc57c693faee21e8f with
// req.params.id
// 'id' is the variable I declared here:
app.delete('/cats/:id', deleteCats);
app.put('/cats/:id', putCats);

async function getCats(req, res, next) {
  try {
    let results = await Cat.find({});
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

async function postCats(req, res, next) {
  console.log(req.body);
  try {
    // we want to add cats to our database
    let createdCat = await Cat.create(req.body);
    res.status(200).send(createdCat);
  } catch(err) {
    next(err);
  }
}

async function deleteCats(req, res, next) {
  // console.log(req);
  try {
    let id = req.params.id;
    // do not expect anything to be returned by findByIdAndDelete
    await Cat.findByIdAndDelete(id);
    res.status(200).send('Cat deleted');
  } catch(err) {
    next(err);
  }
}

async function putCats(req, res, next) {
  try {
    let id = req.params.id;
    let updatedCat = req.body;

    // findByIdAndUpdate method takes in 3 arguments:
    // - 1. id of the thing in the database to update
    // - 2. Updated data object
    // - 3. options object
    let updatedCatFromDatabase = await Cat.findByIdAndUpdate(id, updatedCat, { new: true, overwrite: true });
    res.status(200).send(updatedCatFromDatabase);
    
  } catch (err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
