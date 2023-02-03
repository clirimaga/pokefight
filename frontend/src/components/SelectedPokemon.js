import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './pokemon.css'

export default function SelectedPokemon({pokemon, setPokemon}) {

  const [pokemons, setPokemons] = useState([])

    const {name} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:4001/pokemon/selectedpokemon/${name}`)
        .then((res) => {
          res.data.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`;
          setPokemon(res.data)
        })
        .catch((err) => {
          console.error(`Error fetching pokemon data: ${err}`);
        });
    }, [name]);

    useEffect(()=>{
      axios
      .get('http://localhost:4001/pokemon')
      .then((res)=>{
        res.data.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`;
        setPokemons(res.data)
      })
      .catch(err=> console.log(err))
    },[])

    const pokemonRandom = pokemons[Math.floor(Math.random()*pokemons.length)]
    console.log(pokemonRandom)

  return (
    <>
      <div className='pokemonFightPage'>
        <div className='fightingPokemon'>
          <div className="fightingPokeCard">
            {pokemon ? (
              <div>
                <p><b>Your Pokemon</b></p>
                <p>{pokemon.name.english}</p>
                <p>Pokemon life</p>
                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" aria-valuenow={pokemon.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.Attack}%`}}></div>
                </div>
                <img src={pokemon.url} style={{height: 200}}/>
              </div>
            ) : (
              <p>Loading...</p>
              )}
          </div>

          <div className='fightScore'>
            <h5>Your score</h5>
            <input type='text' placeholder='score'></input>
            <br/>
            <br/>
            <input type='text' placeholder='speed'></input>
            <br/>
            <br/>
            <input type='text' placeholder='Attack'></input>
            <br/>
            <br/>
            <input type='text' placeholder='Defense'></input>
          </div>

          <div className='fightScore'>
            <h5>Computer score</h5>
            <input type='text' placeholder='score'></input>
            <br/>
            <br/>
            <input type='text' placeholder='speed'></input>
            <br/>
            <br/>
            <input type='text' placeholder='Attack'></input>
            <br/>
            <br/>
            <input type='text' placeholder='Defense'></input>
          </div>


          <div className="fightingPokeCard">
            {pokemonRandom ? (
              <div>
                <p><b>Computer Pokemon</b></p>
                <p>{pokemonRandom.name.english}</p>
                <p>Pokemon life</p>
                <div class="progress">
                  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow={pokemonRandom.base.Attack} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemonRandom.base.Attack}%`}}></div>
                </div>
                <img src={pokemonRandom.url} style={{height: 200}}/>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <button className='btn btn-outline-primary'>Fight</button>
        <div className='winnerCard'>
          <h4>The winner is: </h4>
        </div>
      </div>
      <br />
      <div>
        <button className='btn btn-outline-primary' onClick={()=> navigate(-1)} >Play again</button>
      </div>
    </>
  )
}

