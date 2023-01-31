import React from 'react'
import { useParams } from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios';

function Pokemon({pokemon, setPokemon}) {
    const {id} = useParams

    useEffect(()=>{
        axios
        .get(`http://localhost:4001/pokemon/${id}`)
        .then((res)=>{
          console.log(res.data)
          setPokemon(res.data)
        })
        .catch(err=> console.log(err))
      },[])

  return (
<div className="recipes">
    {pokemon.id}
</div>
  )
}

export default Pokemon
