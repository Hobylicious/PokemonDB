const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemonModel.js');
const app = express();

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

router.get('/game', (req, res) => {
    Pokemon
        .find({ game: { $ne: null } })
        .then(pokemons => res.render('game', { pokemons }))
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
            pokeType: req.body.pokeType,
            game: req.body.game
        },
        { new: true }
    )
        .then((pokemons) => {
            res.render('show', pokemons);
        })
        .catch(console.error);
});

router.post('/', (req, res) => {
    Pokemon.create(req.body)
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