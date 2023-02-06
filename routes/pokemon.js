const express = require("express");
const pokemonRouter = express.Router();
const {
  getPokemon,
  getPokemons,
  createPokemon,
  getPokemonByName,
} = require("../controller/pokemons");

// pokemonRouter.get("/", getPokemon);
// pokemonRouter.post("/", createPokemon);
// pokemonRouter.get("/:id", getPokemons);

pokemonRouter.route("/").post(createPokemon).get(getPokemons);
pokemonRouter.route("/:id").get(getPokemon);
pokemonRouter.route("/selectedpokemon/:name").get(getPokemonByName);

module.exports = {
  pokemonRouter,
};
