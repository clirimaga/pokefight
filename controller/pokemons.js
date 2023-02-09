const Pokemon = require("../model/pokemon");

const getPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.json(pokemons);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

// by id
const getPokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findOne({ id });
    res.json(pokemon);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const createPokemon = async (req, res) => {
  const { id, name, type, base } = req.body;

  try {
    const pokemon = await Pokemon.create({ id, name, type, base });
    res.status(201).json(pokemon);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};
const getPokemonByName = async (req, res) => {
  const { name } = req.params;
  try {
    const pokemon = await Pokemon.findOne({ "name.english": name });
    res.json(pokemon);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

module.exports = {
  getPokemon,
  getPokemons,
  createPokemon,
  getPokemonByName,
};
