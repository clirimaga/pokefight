const express = require('express');
const app = express();
const cors = require('cors');
let jsonData = require('./pokemons.json');
const { json } = require('express');
app.use(express.json());
app.use(cors());


app.get('/pokemon', (req,res) => {
    res.json(jsonData);
})

app.get('/pokemon/:id', (req,res) => {
    const {id} = req.params;
    console.log(id);
    if(id > jsonData.length) {
        res.status(404).send('pokemon not found')
    } else {
        res.json(jsonData[id - 1]);
    }
})

app.get('/pokemon/selectedpokemon/:name',(req,res)=>{
    const {name}= req.params;
    const selectedName = jsonData.find(pokemon => pokemon.name.english === name);
    res.status(200).json(selectedName);
})


const PORT = 4001;
app.listen(PORT, () => console.log(`Running on port ${PORT}`))