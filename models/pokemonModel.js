const mongoose = require('../db/connection')

const pokeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        number: {
            type: Number,
        },
        image: {
            type: String,
        },

        pokeType1: {
            type: String
        },
        pokeType2: {
            type: String
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        
    },
    { timesstamps: true }
);

const Pokemon = mongoose.model('Pokemon', pokeSchema)
module.exports = Pokemon;