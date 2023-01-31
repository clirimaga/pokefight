import {useState,useEffect} from 'react'
import axios from 'axios';



export default function Pokemons({pokemonsFrontPage, setPokemonsFrontPage}) {


useEffect(()=>{
  axios
  .get('http://localhost:4001/pokemon')
  .then((res)=>{
    console.log(res.data)
    setPokemonsFrontPage(res.data)
  })
  .catch(err=> console.log(err))
},[])
  return (
    <div>
       {pokemonsFrontPage.map(pokemon=> {
        return <h1>{pokemon.name.english}</h1>
       })}
        </div>
  )
}
