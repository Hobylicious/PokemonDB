const mongoose = require('../db/connection')
const Pokemon = require('./pokemonModel')

const gameSchemaDefault = (name) => {
    return {
        name,
        caught: false,
        seen: false,
        onTeam: false
    };
};

const pokedexSchema = new mongoose.Schema({
    pokemon: [new mongoose.Schema({
        pokemonId: Pokemon,
        games: {
            type: Array,
            default: [
                gameSchemaDefault('red'),
                gameSchemaDefault('blue'),
                gameSchemaDefault('yellow'),
                gameSchemaDefault('gold'),
                gameSchemaDefault('silver'),
                gameSchemaDefault('crystal'),
            ]
        },
    })],

})


const Pokedex = mongoose.model('Pokedex', pokedexSchema)
module.exports = Pokedex;