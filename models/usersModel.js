const mongoose = require('../db/connection')
const pokedexModel = require('./pokedexModel')

const userSchema = new mongoose.Schema({
    auth0id: { type: String },
    userDex: { type: String }
})

const User = mongoose.model('User', userSchema)
module.exports = User;