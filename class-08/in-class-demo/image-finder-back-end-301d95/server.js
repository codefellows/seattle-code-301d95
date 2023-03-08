'use strict';

// REQUIRE
// required from npm
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// instantiate express server by calling express
const app = express();

// USE
app.use(cors());

// define port and proof that env works
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Hello there!')
});

app.get('/photos', async (req, res, next) => {
  let topic = req.query.searchQuery;
  let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${topic}`;
  console.log(url);
  let resultsFromAPI = await axios.get(url);
  let dataToSend = resultsFromAPI.data.results.map(photo => new Photo(photo));
  console.log(dataToSend);
  res.send(dataToSend);
});

app.get('*', (req, res) => {
  res.status(404).send('These are not the droids you are looking for...')
});


// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});

// LISTEN
// need to listen to keep server running
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
