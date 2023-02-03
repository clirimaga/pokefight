import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './pokemon.css'

export default function SelectedPokemon() {
  const [pokemon, setPokemon] = useState();
  const [pokemons, setPokemons] = useState([])
  const [pokemonRandom, setPokemonRandom] = useState()

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
        const random = res.data[Math.floor(Math.random()*res.data.length)];
        random.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random.id}.png`;
        setPokemonRandom(random)
        // console.log(random)
      })
      .catch(err=> console.log(err))
    },[])

//  const pokemonRandom = pokemons[Math.floor(Math.random()*pokemons.length)]
//    console.log(pokemonRandom)

    const handleAttack = () => {
      const attackPokemon = pokemon.base.Attack;
      const defensePokemon = pokemon.base.Defense;
      const healthPokemon = pokemon.base.HP;

      const attackPokemonRandom = pokemonRandom.base.Attack;
      const defensePokemonRandom = pokemonRandom.base.Defense;
      const healthPokemonRandom = pokemonRandom.base.HP;

      const damagePokemon = attackPokemon; // Math.max()-Math.min
      const damagePokemonRandom = attackPokemonRandom;

      // console.log(damagePokemon)
      setPokemon({
        ...pokemon,
        // healthPokemonRandom: prevState.health - damagePokemonRandom
        base: { ...pokemon.base, 
          HP: pokemon.base.HP - damagePokemonRandom
        }
      })
        // console.log(prevState.health)
        setPokemonRandom({
          ...pokemonRandom,
          // healthPokemonRandom: prevState.health - damagePokemonRandom
          base: { ...pokemonRandom.base, 
            HP: pokemonRandom.base.HP - damagePokemon
          }
        })
        // setPokemonRandom((prevState) => ({
        //   ...prevState,
        //   // healthPokemonRandom: prevState.health - damagePokemonRandom
        //   base: { ...prevState.base, 
        //     HP: prevState.base.HP - damagePokemonRandom
        //   }
        // })); 
        // console.log(pokemon)
        console.log(pokemonRandom)
        console.log(pokemon)
    }



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
                  { pokemon.base.HP <= 0 ? (
                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow={pokemon.base.HP} aria-valuemin="0" aria-valuemax="100" style={{width: "0%"}}></div>
                  ) : (
                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow={pokemon.base.HP} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon.base.HP}%`}}></div>
                  )}
                </div>
                <img src={pokemon.url} style={{height: 200}} alt='pokemon user'/>
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
                <p>{pokemonRandom.name?.english}</p>
                <p>Pokemon life</p>
                <div class="progress">
                { pokemonRandom.base.HP <= 0 ? (
                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow={pokemonRandom.base.HP} aria-valuemin="0" aria-valuemax="100" style={{width: "0%"}}></div>
                  ) : (
                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow={pokemonRandom.base.HP} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemonRandom.base.HP}%`}}></div>
                  )}
                  </div>
                <img src={pokemonRandom.url} style={{height: 200}} alt='pokemon random'/>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <button onClick={handleAttack} className='btn btn-outline-primary'>Fight</button>
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

