'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const verifyUser = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL)

app.get('/', (request, response) => {
  response.send('test request received')
})

// basic format of using verfication with verifyUser from our auth.js file
/*
verifyUser(req, async (err, user) => {
  if (err) {
    console.error(err);
    res.send('invalid token');
  } else {
    // insert our try try catch logic.
    // BE CAREFUL. check your syntax IMMEDIATELY
  }
})
*/

app.get('/books', handleGetBooks);

async function handleGetBooks(req, res) {

  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {

      try {
        const booksFromDb = await Book.find();
        if (booksFromDb.length > 0) {
          res.status(200).send(booksFromDb);
        } else {
          res.status(404).send('error');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }

    }
  });

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
