import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios';
function SelectedPokemon({pokemon2,pokemon, setPokemon}) {
    const {name} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:4001/pokemon/selectedpokemon/${name}`)
        .then((res) => {
            // console.log(res.status, res.data);
            //   if (res.status === 200) {
                //    axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.name.english.toLowerCase()}`).then((img) => {
                    //    console.log(img.data.sprites.front_default)
                    res.data.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`;
                    setPokemon(res.data)
                    
        //     })
        
        //   } else {
        //     console.error(`Failed to fetch pokemon data: ${res.status}`);
        //   }
        })
        .catch((err) => {
          console.error(`Error fetching pokemon data: ${err}`);
        });
    }, [name]);



  return (
    <>
<div className="recipes">
    <div>
      <button className='btn btn-outline-primary' onClick={()=> navigate(-1)} >Go back</button>
    </div>
{pokemon ? (
    <div>
          <p>Pokemon name: {pokemon.name.english}</p>
          <p>Pokemon type: {pokemon.type}</p>
          <p>Pokemon Attack: {pokemon.base.Attack}</p>
          <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.Attack}%`}}></div>
</div>

          <img src={pokemon.url}/>
        </div>
      ) : (
          <p>Loading...</p>
          )}
</div>
<div>
<p>Pokemon name: {pokemon2.name.english}</p>
          <p>Pokemon type: {pokemon2.type}</p>
          <p>Pokemon Attack: {pokemon2.base.Attack}</p>
          <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon?.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon?.base.Attack}%`}}></div>
</div>

          <img src={pokemon2.url}/>
</div>
          </>
  )
}

export default SelectedPokemon;
