const mongoose = require('../db/connection')

const gameSchemaDefault = (name) => {
    return {
        name,
        caught: false,
        seen: false,
        onTeam: false
    };
};
const gameSchema = new mongoose.Schema({
    caught: {
        type: Boolean,
        default: false
    },
    seen: {
        type: Boolean,
        default: false
    },
    onTeam: {
        type: Boolean,
        default: false
    },
    name: { type: String },
}, { _id: false })

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
    },
    { timesstamps: true }
);

const Pokemon = mongoose.model('Pokemon', pokeSchema)
module.exports = Pokemon;