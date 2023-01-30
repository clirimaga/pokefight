import {useState,useEffect} from 'react'
import axios from 'axios';



export default function Pokemons() {
const [pokemons,setPokemons]= useState([]);


useEffect(()=>{
  axios
  .get('http://localhost:4001/pokemon')
  .then((res)=>{
    console.log(res.data)
    setPokemons(res.data)
  })
  .catch(err=> console.log(err))
},[])
  return (
    <div>
       {pokemons.map(pokemon=> {
        return <h1>{pokemon.name.english}</h1>
       })}
        </div>
  )
}
