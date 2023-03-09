'use strict';
const axios = require('axios');

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

function getPhotos (req, res, next) {
    let params = {
      client_id: process.env.UNSPLASH_API_KEY,
      query: req.query.searchQuery
    };
    let url = `https://api.unsplash.com/search/photos`;


    axios.get(url, { params })
      .then(resultsFromAPI => resultsFromAPI.data.results.map(photo => new Photo(photo)))
      .then(dataToSend => res.status(200).send(dataToSend))
      .catch(err => console.error(err));
}

module.exports = getPhotos;


/*

async function getPhotos (req, res, next) {
  try {
    let topic = req.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${topic}`;
    console.log(url);
    let resultsFromAPI = await axios.get(url);
    let dataToSend = resultsFromAPI.data.results.map(photo => new Photo(photo));
    console.log(dataToSend);
    res.send(dataToSend);
  } catch (err) {
    next(err);
  }
}

*/


/*

async function getPhotos (req, res, next) {
  try {
    let topic = req.query.searchQuery;
    let params = {
      client_id: process.env.UNSPLASH_API_KEY,
      query: topic
    };
    let url = `https://api.unsplash.com/search/photos`;
    // console.log(url);
    let resultsFromAPI = await axios.get(url, { params });
    let dataToSend = resultsFromAPI.data.results.map(photo => new Photo(photo));
    console.log(dataToSend);
    res.send(dataToSend);
  } catch (err) {
    Promise.resolve() 
      .then(() => {
        throw new Error(err.message);
      }).catch(next);
  }
}


*/
