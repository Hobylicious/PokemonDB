require('dotenv').config()
const Pokemon = require('../models/pokemonModel.js');
const seedData = require('./pokemon.json');



Pokemon.deleteMany({})
    .then(() => {
        return Pokemon.insertMany(seedData);
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit();
    });