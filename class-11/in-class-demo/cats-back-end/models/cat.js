'use strict'


// each cat in our database shhould look something like this
/*
let aCat = {
  name: 'Mr. Mistoffelees',
  color: 'black and white',
  spayNeuter: false,
  location: 'London'
}


*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

// this schema
// this is the rules for what is allowed in our database
const catSchema = new Schema({
  name: {type: String, required: true},
  color:  {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location:  {type: String, required: true},
});

// define our model
// this is the functionalitty of how we interact with out database
const CatModel = mongoose.model('Cat', catSchema);

// the server.js will have access to the functionality of our database
module.exports = CatModel;
