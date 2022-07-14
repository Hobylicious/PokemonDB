require('dotenv').config()
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const pokemonControllers = require('./controllers/pokemonController')
const cors = require('cors')

app.use(cors())

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('Images'))
app.use('/pokemon', pokemonControllers);


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express MVC app is running on port ${port}`);
});