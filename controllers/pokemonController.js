const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemonModel.js');
const app = express();
const cors = require('cors');
const { on } = require('../models/pokemonModel.js');
const User = require('../models/usersModel')
const Pokedex = require('../models/pokedexModel')

app.use(cors())

router.post('/api/auth-create', async (req, res) => {
    const pokedex = { pokemon: [] };
    const savedPokedex = await Pokedex.create(pokedex);
    const keys = Object.keys(req.body);
    const authUser = JSON.parse(keys[0])
    const user = { auth0id: authUser.id, userDex: savedPokedex._id };
    console.log(keys[0])
    // console.log(req.body);
    const saveUser = await User.create(user);
    res.json(saveUser)
})

router.get('/api/pokedex/:userID', async (req, res) => {
    try {
        console.log(`userid: ${req.params.userID}`)
        const user = await User.findOne({ auth0id: req.params.userID })
        console.log(user)
        const pokedex = await Pokedex.findOne({ _id: user.userDex })
        res.json(pokedex)
    }
    catch (e) {
        res.error(e)
    }
})

router.put('/api/pokedex/:id', async (req, res) => {
    console.log(`updating pokemon w/ id: ${req.params.id}`)
    console.log(`JSON Stringy: ${JSON.stringify(req.body, null, 2)}`)
    const pokedex = await Pokedex.findOneAndUpdate({ _id: req.params.id }, req.body)

    res.json(pokedex)
})

router.get('/', (req, res) => {
    Pokemon.find({}).then(pokemons => res.render('index', { pokemons }))
        .catch(console.error);
});

router.get('/api/all', (req, res) => {
    Pokemon.find({}).then(pokemons => res.json({ pokemons }))
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

router.get('/api/game/:game', (req, res) => {
    Pokemon
        .find({ "games": { $elemMatch: { name: req.params.game, seen: true } } })
        .then(pokemons => res.json({ pokemons }))
        .catch(console.error)
})

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

router.get('/api/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.findById(id)
        .then((pokemons) => {
            res.json(pokemons)
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

router.get('/api/edit/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.findById(id)
        .then((pokemons) => {
            res.json(pokemons);
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



router.put('/api/edit/:id', (req, res) => {
    console.log(req.params, req.body);
    const id = req.params.id;

    Pokemon.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    )
        .then((pokemons) => {
            res.json(pokemons);
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