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

// // by field
// // const getBlog = async (req, res) => {
// //     const { name } = req.params;
// //     try {
// //       const blog = await Blog.findOne({username: name});
// //       res.json(blog);
// //     } catch (error) {
// //       res.status(500).send(error.messages);
// //     }
// //   };

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
    const pokemon = await Pokemon.findOne({name: {$elemMatch: "english": name}});
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

// app.get('/pokemon', (req,res) => {
//     res.json(jsonData);
// })

// app.get('/pokemon/:id', (req,res) => {
//     const {id} = req.params;
//     console.log(id);
//     if(id > jsonData.length) {
//         res.status(404).send('pokemon not found')
//     } else {
//         res.json(jsonData[id - 1]);
//     }
// })

// app.get('/pokemon/selectedpokemon/:name',(req,res)=>{
//     const {name}= req.params;
//     const selectedName = jsonData.find(pokemon => pokemon.name.english === name);
//     res.status(200).json(selectedName);
// })
