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
        caught: {
            type: Boolean,
            default: false
        },
        seen: {
            type: Boolean,
            default: true
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

        red: {
            type: Boolean,
            default: false
        },

        blue: {
            type: Boolean,
            default: false
        },

        yellow: {
            type: Boolean,
            default: false
        }

    },
    { timesstamps: true }
);

const Pokemon = mongoose.model('Pokemon', pokeSchema)
module.exports = Pokemon;