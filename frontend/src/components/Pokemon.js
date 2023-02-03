import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios';
function Pokemon({pokemon, setPokemon}) {
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get(`http://localhost:4001/pokemon/${id}`)
        .then((res) => {
          console.log(res.status, res.data);
          if (res.status === 200) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.name.english.toLowerCase()}`).then((img) => {
           console.log(img.data.sprites.front_default)
           res.data.url = img.data.sprites.front_default
           setPokemon(res.data)
            })
        
          } else {
            console.error(`Failed to fetch pokemon data: ${res.status}`);
          }
        })
        .catch((err) => {
          console.error(`Error fetching pokemon data: ${err}`);
        });
    }, []);

  return (
<div className="recipes">
{pokemon ? (
        <div>
          <p>Pokemon name: {pokemon.name.english}</p>
          <p>Pokemon type: {pokemon.type}</p>
          <p>Pokemon Attack: {pokemon.base.Attack}</p>
          <p>Pokemon Defense: {pokemon.base.Defense}</p>
          <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.Attack}%`}}></div>
</div>

          <img src={pokemon.url}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    <div>
      <button className='btn btn-outline-primary' onClick={()=> navigate(-1)} >Go back</button>
    </div>
</div>
  )
}

export default Pokemon
