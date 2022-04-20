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
        img: {
            type: String,
        },
        caught: {
            type: Boolean,
            default: false
        },
        seen: {
            type: Boolean,
            default: true
        },
        pokeType: {
            type: String
        },
        game: {
            type: String
        }
    },
    { timesstamps: true }
);

const Pokemon = mongoose.model('Pokemon', pokeSchema)
module.exports = Pokemon;