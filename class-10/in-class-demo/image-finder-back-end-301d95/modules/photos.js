'use strict';
const axios = require('axios');

// every time the server processes a request from the front end and makes a request to the api, we save the groomed data on this cache.
// if the user serched for kitten our key is kittenData
let cache = {
  // ex:
  // kittenData: <the data I would send to the front end in my response>
};

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

async function getPhotos(req, res, next) {
  try {
    let topic = req.query.searchQuery;
    let key = topic + 'Data';

    let timeToCache = 1000 * 60 * 60 * 24 * 7;
    // let timeToTestCache = 1000 * 20;
    if (cache[key] && Date.now() - cache[key].timestamp < timeToCache) {
      // if the data is already cached and it is recent enough, send the cached data
      console.log('The data is already in the cache');
      res.status(200).send(cache[key].data);
    } else {
      // if the data isn't already in the cache (or the cached data is too old), request the data fromt the API
      console.log('It is not in the cache, so let\'s make the request and then cache the data');
      let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${topic}`;
      console.log(url);
      let resultsFromAPI = await axios.get(url);
      // dataToSend is our groomed data
      let dataToSend = resultsFromAPI.data.results.map(photo => new Photo(photo));
      // console.log(dataToSend);

      // cache the data for next time
      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      }
      res.send(dataToSend).status(200);
    }
  } catch (err) {
    next(err);
  }
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
