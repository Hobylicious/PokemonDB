const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemonModel.js');
const app = express();
const cors = require('cors')

app.use(cors())

router.get('/', (req, res) => {
    Pokemon.find({}).then(pokemons => res.render('index', { pokemons }))
        .catch(console.error);
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.get('/gamelist', (req, res) => {
    Pokemon
        .find({ game: { $ne: null } })
        // .then(Pokemon.game.split(","))
        .then(pokemons => res.render('gamelist', { pokemons }))
        .catch(console.error);
});

router.get('/red', (req, res) => {
    Pokemon
        .find({ red: { $eq: true } })
        .then(pokemons => res.render('red', { pokemons }))
        .catch(console.error);
});

router.get('/blue', (req, res) => {
    Pokemon
        .find({ blue: { $eq: true } })
        .then(pokemons => res.render('blue', { pokemons }))
        .catch(console.error);
});

router.get('/yellow', (req, res) => {
    Pokemon
        .find({ yellow: { $eq: true } })
        .then(pokemons => res.render('yellow', { pokemons }))
        .catch(console.error);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.findById(id)
        .then((pokemons) => {
            res.render('show', pokemons)
        })
        .catch(console.error)
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Pokemon.findById(id)
        .then((pokemons) => {
            res.render('edit', pokemons);
        })
        .catch(console.error);
});

router.put('/:id', (req, res) => {
    console.log(req.params, req.body);
    const id = req.params.id;
    Pokemon.findOneAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            caught: req.body.caught === 'on',
            seen: req.body.seen === 'on',
            number: req.body.number,
            img: req.body.img,
            pokeType: req.body.pokeType,
            red: req.body.red === 'on',
            blue: req.body.blue === 'on',
            yellow: req.body.yellow === 'on'
        },
        { new: true }
    )
        .then((pokemons) => {
            res.render('show', pokemons);
        })
        .catch(console.error);
});

router.put('/', (req, res) => {
    Pokemon.create(
        {
            name: req.body.name,
            caught: req.body.caught === 'on',
            seen: req.body.seen === 'on',
            number: req.body.number,
            img: req.body.img,
            pokeType: req.body.pokeType,
            red: req.body.red === 'on',
            blue: req.body.blue === 'on',
            yellow: req.body.yellow === 'on'
        })
        .then((pokemons) => {
            res.redirect('/pokemon');
        })
        .catch(console.error);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.findOneAndRemove({ _id: id })
        .then(() => {
            res.redirect('/pokemon');
        })
        .catch(console.error);
});



module.exports = router