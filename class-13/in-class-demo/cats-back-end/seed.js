'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat.js');

async function seed() {
  // add cats to our database
  // follow the same structure as our Cat Schema
  /*
    const catSchema = new Schema({
      name: {type: String, required: true},
      color:  {type: String, required: true},
      spayNeuter: {type: Boolean, required: true},
      location:  {type: String, required: true},
    });
  */

  await Cat.create({
    name: 'Marshmellow',
    color: 'white',
    spayNeuter: true,
    location: 'Seattle',
  });
  console.log('Marshmellow was added')

  await Cat.create({
    name: 'Pixel',
    color: 'black',
    spayNeuter: true,
    location: 'Everett',
  });
  console.log('Pixel was added');
  mongoose.disconnect();
}

seed();
