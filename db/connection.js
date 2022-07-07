require('dotenv').config()
const mongoose = require('mongoose');

const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.DB_URL
        : process.env.DEV_DB_URL

console.log(process.env)

mongoose.connect(mongoURI)
    .then(instance => console.log(`Connected to ${instance.connections[0].name}`))
    .catch(error => console.log(`failed connection:`, error));

module.exports = mongoose
