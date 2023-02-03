import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios';
import './pokemon.css'

export default function Pokemon({pokemon, setPokemon}) {
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

    <>
      <div className="pokemonOne">
        <div className='pokeDetail'>
          <div>
            <p><h3><b>{pokemon.name.english}</b></h3></p>
            <p><b>Pokemon type:</b> {pokemon.type}</p>
            <p><b>Pokemon HP:</b> {pokemon.base.HP}</p>
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon.base.HP} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.HP}%`}}>
              </div>
            </div>
            <p><b>Pokemon Attack:</b> {pokemon.base.Attack}</p>
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.Attack}%`}}>
              </div>
            </div>
            <p><b>Pokemon Defense:</b> {pokemon.base.Defense}</p>
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.Defense}%`}}>
              </div>
            </div>
            <p><b>Pokemon Speed:</b> {pokemon.base.Speed}</p>
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon.base.Speed} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.Speed}%`}}>
              </div>
            </div>
            <img src={pokemon.url} style={{height: 200}}/>
          </div>

          <div className='pokeDescription'>
            <p><b>Description</b></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet, voluptatibus aperiam beatae reiciendis distinctio ullam. Sapiente sunt, esse, repudiandae consectetur fugiat eligendi blanditiis recusandae nesciunt aliquam nisi sit repellendus.</p>
          </div>
        </div>
      </div>
        <br />
      <div>
        <button className='btn btn-outline-primary' onClick={()=> navigate(-1)} >Go back</button>
      </div>
    </>
  )
}