const mongoose = require('mongoose');

const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.DB_URL
        : 'mongodb+srv://hobylicious:test1234@cluster0.bmtdb.mongodb.net/PokemonDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(instance => console.log(`Connected to ${instance.connections[0].name}`))
    .catch(error => console.log(`failed connection:`, error));

module.exports = mongoose
